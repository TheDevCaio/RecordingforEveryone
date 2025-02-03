import { useState, useRef } from 'react';

const Movement: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [movements, setMovements] = useState<{ x: number; y: number; clicked: boolean }[]>([]);
  const [recording, setRecording] = useState(false);
  const [currentlyRecording, setCurrentlyRecording] = useState(false);
  const squareRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (currentlyRecording) {

      setMovements((prevMovements) => [
        ...prevMovements,
        { x: e.clientX, y: e.clientY, clicked: false }
      ]);
    }
    setPosition({ x: e.clientX - 50, y: e.clientY - 50 });
  };

  const handleMouseDown = () => {
    if (recording) {

      setCurrentlyRecording(true);
    }
  };

  const handleMouseUp = () => {
    if (recording) {
  
      setCurrentlyRecording(false);
      setMovements((prevMovements) => {
        const updatedMovements = [...prevMovements];
        updatedMovements[updatedMovements.length - 1].clicked = true;
        return updatedMovements;
      });
    }
  };

  const toggleRecording = () => {
    setRecording(!recording);
  };

  const repeatMovements = () => {
    if (movements.length === 0) return;

    movements.forEach((movement, index) => {
      setTimeout(() => {
        setPosition({ x: movement.x - 50, y: movement.y - 50 });
        if (movement.clicked && squareRef.current) {
  
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: movement.x,
            clientY: movement.y,
          });
          squareRef.current.dispatchEvent(clickEvent);
        }
      }, index * 100); 
    });
  };

  return (
    <div>
      <h1>Record and Repeat Movements with Autoclick</h1>
      <div
        ref={squareRef}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: 'pointer',
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      <button onClick={toggleRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={repeatMovements}>Repeat Movements</button>
      <p>Recorded movements: {movements.length}</p>
    </div>
  );
};

export default Movement;
