import { useState } from "react";

export function useGlowEffect() {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;

    setGlowPos({ x: (percentX + 0.5) * 100, y: (percentY + 0.5) * 100 });
  };

  const glowStyle = {
    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(56,189,248,0.15), transparent 60%)`,
  };

  return { handleMove, glowStyle };
}

