import React from 'react'
import zero from '../../assets/zero.svg'
import cross from '../../assets/cross.svg'
import { Text } from '../text'
import { Container } from '../container'
import './index.css'

export const Gamers = () => {
    return (
        <div id="players">
            <Text style={{ fontWeight: 700, fontSize: "24px", lineHeight: '36px' }}>Игроки</Text>
            <div className="container">
                <div className="zero_cross">
                    <img style={{ width: '24px' }} src={zero} alt="" />
                    <Text style={{ width: '-webkit-fill-available' }}>Пупкин Владлен Игоревич</Text>
                </div>
                <span className="micro-text">63% побед</span>
            </div>
            <div className="container">
                <div className="zero_cross">
                    <img style={{ width: '24px' }} src={cross} alt="" />
                    <Text style={{ width: '-webkit-fill-available' }}>Плюшкина Екатерина Викторовна</Text>
                </div>
                <span className="micro-text">23% побед</span>
            </div>
        </div>
    )
}
