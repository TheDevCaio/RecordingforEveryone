import { useState } from 'react';

const Movimentacao: React.FC = () => {
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

  return (
    <div>
      <h1>Grave os Movimentos do Quadrado</h1>
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
      <p>Movimentos gravados: {movimentos.length}</p>
    </div>
  );
};

export default Movimentacao;