import { usePlayer, useSong } from '@/hooks';
import PlayerBackground from './components/PlayerBackground';
import PlayerHeader from './components/PlayerHeader';
import PlayerLyric from './components/PlayerLyric';
import PlayerBottom from './components/PlayerBottom';

import './index.scss';

export default function Player() {
  const playSong = useSong();
  const playHooks = usePlayer(playSong);
  return (
    <PlayerBackground>
      <PlayerHeader {...playHooks} {...playSong} />
      <PlayerLyric {...playHooks} {...playSong} />
      <PlayerBottom {...playHooks} {...playSong} />
    </PlayerBackground>
  );
}
