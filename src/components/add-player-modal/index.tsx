import React, { useEffect, useState } from 'react'
import woman from '../../assets/woman.svg'
import man from '../../assets/man.svg'
import './index.css'
import { Button } from '../button'
import { Text } from '../text'
import { AuthInput } from '../auth-input'
import { useForm } from 'react-hook-form'
import { useGetPlayerByIdQuery, useRegisterMutation, useUpdatePlayerMutation } from '../../app/services/playerApi'
import { hasErrorField } from '../../utils/has-error-field'
import RadioGroup from '../radio-group'
import { useModal } from '../modal-context'
import { Modal } from '../modal-template'
import close from '../../assets/close.svg'

type AddPlayerModalProps = {
    fullname: string,
    age: number,
    gender: string,
    login: string,
    password: string
}
type Props = {
    modalState: 'ADD' | 'EDIT';
    selectPlayer: string | '';
    onPlayerAdded: () => void;
};

export const AddPlayerModal: React.FC<Props> = ({ onPlayerAdded, modalState, selectPlayer }) => {
    const { data: player } = useGetPlayerByIdQuery({ id: selectPlayer }, { skip: !selectPlayer || modalState === 'ADD' });
    const {
        handleSubmit,
        control,
        formState: { isValid, errors },
        reset,
        setValue
    } = useForm<AddPlayerModalProps>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            login: '',
            password: '',
            fullname: '',
            age: 1,
            gender: '',
        }
    });

    useEffect(() => {
        if (modalState === 'EDIT' && player) {
            reset({
                login: '',
                password: '',
                fullname: player.fullName || '',
                age: player.age || 0,
                gender: player.gender || '',
            });
        } else if (modalState === 'ADD') {
            reset({
                login: '',
                password: '',
                fullname: '',
                age: 1,
                gender: '',
            });
        }
    }, [modalState, player]);
    // Динамически обновляем правила валидации при изменении режима
    useEffect(() => {
        if (modalState === 'ADD') {
            setValue('login', '', { shouldValidate: true });
            setValue('password', '', { shouldValidate: true });
        }
    }, [modalState, setValue]);
    const [register, { isLoading }] = useRegisterMutation();
    const [update, { isLoading: updateLoading }] = useUpdatePlayerMutation();
    const [error, setError] = useState('');
    const onSubmit = async (data: AddPlayerModalProps) => {
        try {
            if (modalState === 'EDIT' && selectPlayer) {
                await update({ id: selectPlayer, ...data }).unwrap();
            } else {
                await register(data).unwrap();
            }
            closeModal("playerModal");
            onPlayerAdded();
            reset();
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.error)
            }
        }
    }
    const { closeModal } = useModal();
    return (
        <Modal name='playerModal'>
            <div className="btn-close" style={{ display: 'flex', justifyContent: 'end' }} onClick={() => closeModal("playerModal")}><img src={close} alt="" /></div>
            <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>{modalState === 'EDIT' ? "Редактируйте игрока" : "Добавьте игрока"}</Text>
            <Text style={{ fontWeight: 500, marginBottom: '-28px', display: 'flex', justifyContent: 'start' }}>Логин</Text>
            <AuthInput
                control={control}
                name="login"
                type="login"
                rules={{ required: modalState === 'ADD' ? 'Обязательное поле' : undefined }}
                placeholder="Логин"
                style={errors.login || error ? { border: '1px solid red' } : {}}
                onFieldChange={() => setError('')}
            />
            <Text style={{ fontWeight: 500, marginBottom: '-28px', display: 'flex', justifyContent: 'start' }}>Пароль</Text>
            <AuthInput
                control={control}
                name="password"
                type="password"
                rules={{ required: modalState === 'ADD' ? 'Обязательное поле' : undefined }}
                placeholder="Пароль"
                style={errors.password || error ? { border: '1px solid red' } : {}}
                errorMessage={error}
                onFieldChange={() => setError('')}
            />
            <Text style={{ fontWeight: 500, marginBottom: '-28px', display: 'flex', justifyContent: 'start' }}>ФИО</Text>
            <AuthInput name="fullname" type="text" rules={{ required: modalState === 'ADD' ? 'Обязательное поле' : undefined }} control={control} placeholder="Иванов Иван Иванович" />

            <div style={{ display: 'flex', gap: '40px', alignSelf: 'flex-start' }}>
                <div className="input-set">
                    <Text style={{ fontWeight: 500, display: 'flex', justifyContent: 'start' }}>Возраст</Text>
                    <AuthInput name="age" type='number' rules={{ required: modalState === 'ADD' ? 'Обязательное поле' : undefined }} control={control} style={{ width: '85px' }} placeholder="0" />
                </div>
                <div className="input-set">
                    <Text style={{ fontWeight: 500, display: 'flex', justifyContent: 'start' }}>Пол</Text>
                    <RadioGroup
                        name="gender"
                        control={control}
                        options={[
                            { value: "FEMALE", label: "Женщина", icon: woman },
                            { value: "MALE", label: "Мужчина", icon: man },
                        ]}
                        rules={{ required: "Выберите пол" }}
                        error={errors.gender?.message}
                    />
                </div>
            </div>
            <Button disabled={isLoading || !isValid || updateLoading} onClick={handleSubmit(onSubmit)}> {modalState === 'EDIT' ? "Редактировать" : "Добавить"}</Button >
        </Modal >
    );
}
