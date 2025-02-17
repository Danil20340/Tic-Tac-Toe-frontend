import React, { useEffect, useState } from 'react'
import { Modal } from '../modal-template'
import { Text } from '../text'
import { Button } from '../button'
import { Container } from '../container'
import game from '../../assets/game.svg'
import { useModal } from '../../components/modal-context';
import { useLazyGetPlayerByIdQuery } from '../../app/services/playerApi'
import { useSocket } from '../../features/socket'
import { selectCurrent } from '../../features/player/playerSlice'
import { useSelector } from 'react-redux'
import { removeThirdWord } from '../../utils/remove-third-word'

export const InviteGameModal = () => {
    const { isModalOpen, closeModal, getModalData } = useModal();
    const current = useSelector(selectCurrent);
    const [fetchPlayer, { data: player }] = useLazyGetPlayerByIdQuery();
    const { socket, isConnected } = useSocket();
    const fromPlayerId = getModalData('inviteModal')?.fromPlayerId;

    React.useEffect(() => {
        if (isModalOpen('inviteModal') && fromPlayerId) {
            fetchPlayer({ id: fromPlayerId });
        }
    }, [isModalOpen, fromPlayerId, fetchPlayer]);

    const handleAccept = () => {
        closeModal('inviteModal');
        if (socket && isConnected) {

            socket.emit("accept", { fromPlayerId: current?.id, toPlayerId: player?.id });

            return () => {
                socket.off("accept");
            };
        }
    };

    const handleDecline = () => {
        closeModal('inviteModal');
        if (socket && isConnected) {

            socket.emit("decline", { fromPlayerId: current?.id, toPlayerId: player?.id });

            return () => {
                socket.off("decline");
            };
        }
    };

    return (
        <Modal name='inviteModal'>
            <Container>
                <img style={{ width: '80%' }} src={game} alt="Game" />
            </Container>
            <Container style={{ flexDirection: 'column', gap: '20px' }}>
                <Text style={{ fontWeight: 700, fontSize: '24px' }}>
                    Игрок {removeThirdWord(player?.fullName)} приглашает вас в игру!
                </Text>
                <Container style={{ flexDirection: 'column', gap: '12px' }}>
                    <Button onClick={handleAccept}>Принять</Button>
                    <Button onClick={handleDecline} backgroundColor="#F7F7F7">
                        Отклонить
                    </Button>
                </Container>
            </Container>
        </Modal>
    );
};
