import { Game, Player } from '../../app/types';
import cross from '../../assets/cross.svg'
import zero from '../../assets/zero.svg'
import { removeThirdWord } from '../../utils/remove-third-word';
import './index.css'
type Props = {
    nowMove: 'X' | 'O'| undefined;
    player: Player;
  };
export const Step: React.FC<Props> = ({ nowMove, player }) => {
    return (
        <div className="whose_move">
            Ходит<img src={nowMove === 'X' ? cross : zero} alt="" />{removeThirdWord(player.fullName)}
        </div>)
}
