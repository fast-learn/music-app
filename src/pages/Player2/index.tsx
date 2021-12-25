import PlayerBackground from './components/PlayerBackground';
import PlayerHeader from './components/PlayerHeader';
import PlayerLyric from './components/PlayerLyric';
import PlayerBottom from './components/PlayerBottom';
import usePlay from './hooks/usePlayer';

import './index.scss';

export default function Player() {
  const playHooks = usePlay();
  return (
    <PlayerBackground>
      <PlayerHeader {...playHooks} />
      <PlayerLyric {...playHooks} />
      <PlayerBottom {...playHooks} />
    </PlayerBackground>
  );
}
