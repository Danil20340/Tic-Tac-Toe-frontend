import React, { useEffect, useState } from 'react'
import { Modal } from '../modal-template'
import { Text } from '../text'
import { Button } from '../button'
import { Container } from '../container'
import bigCup from '../../assets/bigCup.svg'
import handsShake from '../../assets/handsShake.svg'
import { useModal } from '../../components/modal-context';
import { useLazyGetCurrentPlayerQuery, useLazyGetPlayerByIdQuery } from '../../app/services/playerApi'
import { removeThirdWord } from '../../utils/remove-third-word'
import { useNavigate } from 'react-router-dom'

export const EndGameModal = () => {
    const [triggerGetCurrentPlayer] = useLazyGetCurrentPlayerQuery();
    const { isModalOpen, closeModal, getModalData } = useModal();
    const [fetchPlayer, { data: player }] = useLazyGetPlayerByIdQuery();
    const gameData = getModalData('endGameModal');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isModalOpen('endGameModal') && gameData?.winnerId) {
            fetchPlayer({ id: gameData.winnerId });
        }
    }, [isModalOpen, gameData, fetchPlayer]);

    const handleClose = () => {
        closeModal('endGameModal');
        triggerGetCurrentPlayer();
        navigate('/');
    };

    return (
        <Modal style={{ height: 'auto' }} name='endGameModal'>
            <Container style={{ marginBottom: '20px' }}>
                {gameData?.status === 'FINISHED' ? <img style={{ width: '132px', marginBottom: '20px' }} src={bigCup} alt="" /> : <img style={{ width: '80%' }} src={handsShake} alt="" />}
            </Container>
            <Container style={{ flexDirection: 'column', gap: '20px' }}>
                <Text style={{ fontWeight: 700, fontSize: '24px' }}>
                    {gameData?.status === 'FINISHED' ? `${removeThirdWord(player?.fullName)} победил!` : 'Ходы закончились, ничья!'}
                </Text>

                <Button onClick={handleClose}>В меню</Button>

            </Container>
        </Modal>
    );
};
