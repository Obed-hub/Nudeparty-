import React from 'react';

interface QRCodePassProps {
  text: string;
  size?: number;
  color?: string;
  bgColor?: string;
}

export const QRCodePass: React.FC<QRCodePassProps> = ({
  text,
  size = 140,
  color = '#0f172a',
  bgColor = '#ffffff'
}) => {
  // Deterministic pattern generator based on input text hash
  const hash = text.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000007, 42);
  const matrixSize = 21;
  const matrix: boolean[][] = Array(matrixSize).fill(false).map(() => Array(matrixSize).fill(false));

  // Helper for position detection patterns (corners)
  const drawCorner = (startRow: number, startCol: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startRow + r][startCol + c] = true;
        }
      }
    }
  };

  drawCorner(0, 0); // Top-left
  drawCorner(0, matrixSize - 7); // Top-right
  drawCorner(matrixSize - 7, 0); // Bottom-left

  // Timing patterns
  for (let i = 8; i < matrixSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Populate data-like pseudo-random modules from hash & chars
  let currentSeed = hash;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Don't overwrite corners
      const isTopLeft = r < 8 && c < 8;
      const isTopRight = r < 8 && c >= matrixSize - 8;
      const isBottomLeft = r >= matrixSize - 8 && c < 8;
      if (!isTopLeft && !isTopRight && !isBottomLeft) {
        currentSeed = (currentSeed * 1103515245 + 12345) % 2147483648;
        matrix[r][c] = (currentSeed % 100) > 46;
      }
    }
  }

  const cellSize = size / matrixSize;

  return (
    <div 
      id="qr-code-wrapper"
      className="p-3 border border-zinc-700 bg-white shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill={bgColor} />
        {matrix.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            if (!cell) return null;
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx * cellSize}
                y={rIdx * cellSize}
                width={cellSize * 0.94}
                height={cellSize * 0.94}
                fill={color}
              />
            );
          })
        )}
      </svg>
      <div className="mt-1.5 text-[9px] font-mono tracking-widest text-zinc-950 font-black uppercase">
        AUTHENTICATED 18+
      </div>
    </div>
  );
};

export const BarcodeGenerator: React.FC<{ code: string }> = ({ code }) => {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const charCode = code.charCodeAt(i % code.length) || 45;
    const isThick = (charCode + i) % 3 === 0;
    const isExtraThick = (charCode * i) % 7 === 0;
    const width = isExtraThick ? 3 : isThick ? 2 : 1;
    return { width, space: (i % 2 === 0) ? 1 : 2 };
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-end h-8 gap-0.5">
        {bars.map((bar, idx) => (
          <span
            key={idx}
            className="bg-slate-900 dark:bg-slate-100 rounded-xs"
            style={{
              width: `${bar.width}px`,
              height: `${24 + ((idx * 7) % 10)}px`,
              marginRight: `${bar.space}px`
            }}
          />
        ))}
      </div>
      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 mt-1">
        {code}
      </span>
    </div>
  );
};
