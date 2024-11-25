import React, { useState } from 'react';
import './index.css';
import dog from '../../assets/dog.svg';
import { Button } from "../../components/button";
import { Container } from '../../components/container';
import { Text } from '../../components/text';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../app/services/playerApi';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../utils/has-error-field';
import { AuthInput } from '../../components/auth-input';
type Login = {
    login: string;
    password: string;
}

export const Auth = () => {
    const {
        handleSubmit,
        control,
        formState: { isValid, errors }
    } = useForm<Login>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            login: '',
            password: ''
        }
    });
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data: Login) => {
        try {
            await login(data).unwrap();
            navigate('/')
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.error)
            }
        }
    }
    return (
        <form className='authorization-field'>
            <Container><img src={dog} alt="Dog" /></Container>
            <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px', marginTop: '20px' }}>Войдите в игру</Text>
            <AuthInput
                control={control}
                name="login"
                type="login"
                required='Обязательное поле'
                placeholder="Логин"
                styleAuth={{ marginBottom: '12px', marginTop: '20px' }}
                style={errors.login || error ? { border: '1px solid red' } : {}}
                onFieldChange={() => setError('')}
            />
            <AuthInput
                control={control}
                name="password"
                type="password"
                required='Обязательное поле'
                placeholder="Пароль"
                styleAuth={{ marginBottom: '20px' }}
                style={errors.password || error ? { border: '1px solid red' } : {}}
                errorMessage={error}
                onFieldChange={() => setError('')}
            />
            <Button type="submit"
                disabled={isLoading || !isValid} onClick={handleSubmit(onSubmit)}
            >
                Войти
            </Button>
        </form>
    );
};