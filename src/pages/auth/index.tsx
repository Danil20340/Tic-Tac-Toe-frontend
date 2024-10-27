import React, { useState } from 'react';
import './index.css';
import dog from '../../assets/dog.svg';
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Container } from '../../components/container';
import { Text } from '../../components/text';

export const Auth = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const isButtonDisabled = login === '' || password === '';

    return (
        <Container className='authorization-field'>
            <Container><img src={dog} alt="Dog" /></Container>
            <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px', marginTop: '20px' }}>Войдите в игру</Text>
            <Input
                style={{ marginBottom: '12px', marginTop: '20px' }}
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <Input
                style={{ marginBottom: '20px' }}
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={isButtonDisabled}>
                Войти
            </Button>
        </Container>
    );
};