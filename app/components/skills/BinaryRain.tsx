"use client";
import { useEffect, useRef, ReactNode, useState } from "react";
import { useInView } from "framer-motion";

interface BinaryRainProps {
  children: ReactNode;
}

export default function BinaryRain({ children }: BinaryRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -30% 0px", // Trigger slightly before center
  });

  useEffect(() => {
    if (!isInView) return;

    setShouldAnimate(true);
  }, [isInView]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !container) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const binary = ["0", "1"];
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(120,208,226,0.6)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    let animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [shouldAnimate]);

  return (
    <div ref={containerRef} className="relative z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[-1] pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
