import React from 'react'
import woman from '../../assets/woman.svg'
import man from '../../assets/man.svg'
import './index.css'
import { Button } from '../button'
import { Input } from '../input'
import { Text } from '../text'



export const AddPlayerModal = () => {
    return (
        <>
            <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Добавьте игрока</Text>

            <Text style={{ fontWeight: 500, marginBottom: '-28px', display: 'flex', justifyContent: 'start' }}>ФИО</Text>
            <Input placeholder="Иванов Иван Иванович" />

            <div className="modal-row">
                <div className="input-set">
                    <Text style={{ fontWeight: 500, display: 'flex', justifyContent: 'start' }}>Возраст</Text>
                    <Input type='number' style={{ width: '85px' }} placeholder="0" />
                </div>
                <div className="input-set">
                    <Text style={{ fontWeight: 500, display: 'flex', justifyContent: 'start' }}>Пол</Text>
                    <div className="radio-form">
                        <label className="radio-control">
                            <input type="radio" name="gender" value="usd" />
                            <span className="radio-input">
                                <img src={woman} alt="" />
                            </span>
                        </label>
                        <label className="radio-control">
                            <input type="radio" name="gender" value="eur" />
                            <span className="radio-input">
                                <img src={man} alt="" />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <Button>Добавить</Button>
        </>
    );
}
