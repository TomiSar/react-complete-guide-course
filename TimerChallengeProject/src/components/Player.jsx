import { useRef, useState } from 'react';

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  const handleClick = () => {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = '';
  };

  return (
    <section id='player'>
      <h2>Welcome {enteredPlayerName ?? 'Unknown player'}</h2>
      <p>
        <input type='text' ref={playerName} />
        <button onClick={handleClick}> Set Name</button>
      </p>
    </section>
  );
}
