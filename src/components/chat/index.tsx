import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../input'
import './index.css'
import { Button } from '../button'
import send from '../../assets/send.svg'
import { useSelector } from 'react-redux';
import { Container } from '../container'
import { Socket } from 'socket.io-client'
import { selectCurrent } from '../../features/player/playerSlice'
import { removeThirdWord } from '../../utils/remove-third-word'
import { useGetGameMessagesQuery } from '../../app/services/gameApi'

type props = {
    socket: Socket | null;
    isConnected: boolean;
    currentGameID: string | null;
    playerName: Message['sender'];
}
type Message = {
    id: string; // Добавляем уникальный ID для каждого сообщения
    sender: string;
    message: string;
    timestamp: string;
}

export const Chat: React.FC<props> = ({ playerName, socket, isConnected, currentGameID }) => {
    const { data } = useGetGameMessagesQuery({ id: currentGameID ?? '' });
    const userName = useSelector(selectCurrent);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isScrollable, setIsScrollable] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const formatTime = (utcString: string) => {
        return new Date(utcString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSendMessage = () => {
        if (!socket || !isConnected || isButtonDisabled) return;
        if (message.trim()) {
            const newMessage = {
                sender: userName?.fullName,
                message,
                timestamp: new Date().toISOString(),
            };

            // Отправляем сообщение в комнату с ID игры
            socket.emit('sendMessage', { gameId: currentGameID, sender: newMessage.sender, message: newMessage.message, timestamp: newMessage.timestamp });
            setMessage('');

            // Блокируем кнопку на 2 секунды
            setIsButtonDisabled(true);
            setTimeout(() => {
                setIsButtonDisabled(false);
            }, 2000);
        }
    };

    useEffect(() => {
        if (data) {
            // Получаем старые сообщения из базы данных и добавляем их в список
            const formattedMessages = data.map((msg: any) => ({
                id: msg.id, // Преобразуем в уникальные идентификаторы
                sender: msg.sender.fullName,
                message: msg.message,
                timestamp: formatTime(msg.timestamp),
            }));

            setMessages(formattedMessages);
        }
    }, [data]);

    useEffect(() => {
        if (!socket || !isConnected) return;

        // Слушаем входящие сообщения через сокет
        socket.on('receiveMessage', (msg) => {
            const newMessage = {
                id: msg.id, // Убедитесь, что сообщение имеет уникальный id
                sender: msg.sender,
                message: msg.message,
                timestamp: formatTime(msg.timestamp),
            };

            // Добавляем новое сообщение в конец списка
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [socket, isConnected]);

    useEffect(() => {
        if (chatRef.current) {
            if (window.innerWidth <= 768) {
                // 📱 На мобильных прокручиваем вверх
                chatRef.current.scrollTop = 0;
            } else {
                // 💻 На десктопах прокручиваем вниз
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }
    }, [messages]);

    const handleScroll = () => {
        if (!chatRef.current) return;

        const element = chatRef.current;
        const isScrollable = element.scrollHeight > element.clientHeight;

        setIsScrollable(isScrollable);

        const atTop = element.scrollTop === 0;
        const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

        if (atTop) {
            element.classList.add('no-fade-top');
            element.classList.remove('no-fade-bottom');
        } else if (atBottom) {
            element.classList.add('no-fade-bottom');
            element.classList.remove('no-fade-top');
        } else {
            element.classList.remove('no-fade-top', 'no-fade-bottom');
        }
    };


    useEffect(() => {
        if (chatRef.current) {
            const element = chatRef.current;

            handleScroll(); // Запускаем на старте чтобы сразу корректно применились классы
            element.addEventListener('scroll', handleScroll);

            return () => {
                element.removeEventListener('scroll', handleScroll);
            };
        }
    }, [messages]);

    // Запускаем, когда изменяются сообщения
    const orderedMessages = window.innerWidth <= 768 ? [...messages].reverse() : messages;
    return (
        <div id="all_chat">
            <Container ref={chatRef} className={`chat-container scrollbar ${isScrollable ? 'scrollable' : ''}`}>
                {orderedMessages.length === 0
                    ? <div style={{ textAlign: 'center', fontWeight: 500 }}>Нет сообщений, начните общение</div>
                    : orderedMessages.map((msg, index) => (
                        <div key={index}
                            style={msg.sender === userName?.fullName ? { alignSelf: 'flex-end', borderRadius: "16px 16px 0px 16px" } : {}}
                            className="interlocutor">
                            <Container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={msg.sender === playerName ? { color: '#E38BAC' } : { color: '#60C2AA' }}
                                    className="player-text">
                                    {removeThirdWord(msg.sender)}
                                </div>
                                <div className="micro-text">{msg.timestamp}</div>
                            </Container>
                            <div className="special-text">{msg.message}</div>
                        </div>
                    ))
                }
            </Container >
            <Container style={{ gap: '12px', alignItems: 'center', backgroundColor: '#f6f6f6' }}>
                <Input
                    placeholder="Сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <Button className='send-button' style={{ width: '48px' }} onClick={handleSendMessage} disabled={isButtonDisabled}>
                    <img src={send} alt="" />
                </Button>
            </Container>
        </div>
    );
};
