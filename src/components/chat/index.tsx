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

    const chatRef = useRef<HTMLDivElement>(null);
    
    const formatTime = (utcString: string) => {
        return new Date(utcString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSendMessage = () => {
        if (!socket || !isConnected) return;
        if (message.trim()) {
            const newMessage = {
                sender: userName?.fullName,
                message,
                timestamp: new Date().toISOString(),
            };

            // Отправляем сообщение в комнату с ID игры
            socket.emit('sendMessage', { gameId: currentGameID, sender: newMessage.sender, message: newMessage.message, timestamp: newMessage.timestamp });
            setMessage('');
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
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]); // Запускаем, когда изменяются сообщения

    return (
        <div id="all_chat">
            <Container ref={chatRef} className='chat-container scrollbar'>
                {
                    messages.length === 0 
                    ? <div style={{ textAlign: 'center', fontWeight: 500 }}>Нет сообщений, начните общение</div> 
                    : messages.map((msg, index) => (
                        <div key={index} style={msg.sender === userName?.fullName ? { alignSelf: 'flex-end', borderRadius: "16px 16px 0px 16px" } : {}} className="interlocutor">
                            <Container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={msg.sender === playerName ? { color: '#E38BAC' } : { color: '#60C2AA' }} className="player-text">{removeThirdWord(msg.sender)}</div>
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
                <Button style={{ width: '48px' }} onClick={handleSendMessage}>
                    <img src={send} alt="" />
                </Button>
            </Container>
        </div>
    );
};
