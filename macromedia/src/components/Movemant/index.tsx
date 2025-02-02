import { useState } from 'react';

const Movemant: React.FC = () => {
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });
  const [movimentos, setMovimentos] = useState<{ x: number; y: number }[]>([]);
  const [gravando, setGravando] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gravando) {
      setMovimentos([...movimentos, { x: e.clientX, y: e.clientY }]);
    }
    setPosicao({ x: e.clientX - 50, y: e.clientY - 50 });
  };

  const toggleGravacao = () => {
    setGravando(!gravando);
  };

  const repetirMovimentos = () => {
    if (movimentos.length === 0) return;
    movimentos.forEach((movimento, index) => {
      setTimeout(() => {
        setPosicao({ x: movimento.x - 50, y: movimento.y - 50 });
      }, index * 100);
    });
  };

  return (
    <div>
      <h1>Grave e Repita Movimentos no Quadrado</h1>
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          position: 'absolute',
          left: `${posicao.x}px`,
          top: `${posicao.y}px`,
          cursor: 'pointer',
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={toggleGravacao}
      />
      <button onClick={toggleGravacao}>
        {gravando ? 'Parar Gravação' : 'Começar Gravação'}
      </button>
      <button onClick={repetirMovimentos}>Repetir Movimentos</button>
      <p>Movimentos gravados: {movimentos.length}</p>
    </div>
  );
};

export default Movemant;