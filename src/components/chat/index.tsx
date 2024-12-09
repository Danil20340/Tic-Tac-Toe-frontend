import React, { useState } from 'react'
import { Input } from '../input'
import './index.css'
import { Button } from '../button'
import send from '../../assets/send.svg'
import { Container } from '../container'

export const Chat = () => {
    const [message, setMessage] = useState('');
    return (
        <div id="all_chat">
            <Container style={{ gap: '12px', flexDirection: 'column', backgroundColor: '#f6f6f6' }} >
                <div className="interlocutor">
                    <Container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#60C2AA' }} className="player-text">Плюшкина Екатерина</div>
                        <div className="micro-text">13:40</div>
                    </Container>
                    <div className="special-text">Ну что, готовься к поражению!!1</div>
                </div>
                <div style={{ alignSelf: 'flex-end' }} className="interlocutor">
                    <Container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#E38BAC' }} className="player-text">Пупкин Владлен</div>
                        <div className="micro-text">13:41</div>
                    </Container>
                    <div className="special-text">Надо было играть за крестики. Розовый — мой не самый счастливый цвет</div>
                </div>
                <div style={{ alignSelf: 'flex-end' }} className="interlocutor">
                    <Container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#E38BAC' }} className="player-text">Пупкин Владлен</div>
                        <div className="micro-text">13:45</div>
                    </Container>
                    <div className="special-text">Я туплю…</div>
                </div>
                <div className="interlocutor">
                    <Container style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#60C2AA' }} className="player-text">Плюшкина Екатерина</div>
                        <div className="micro-text">13:47</div>
                    </Container>
                    <div className="special-text">Отойду пока кофе попить, напиши в тг как сходишь</div>
                </div>
            </Container>
            <Container style={{ gap: '12px', alignItems: 'center', backgroundColor: '#f6f6f6' }}>
                <Input
                    type='textArea'
                    placeholder='Сообщение...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button style={{ width: '48px' }}><img src={send} alt="" /></Button>
            </Container>
        </div>

    )
}
