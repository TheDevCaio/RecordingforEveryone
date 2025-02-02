import { useState } from 'react';

const Movimentacao: React.FC = () => {
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosicao({ x: e.clientX - 50, y: e.clientY - 50 });
  };

  return (
    <div>
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
      />
    </div>
  );
};

export default Movimentacao;