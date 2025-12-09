"use client";

import { useEffect, useRef } from 'react';

export default function MatrixRain({ theme = 'classic' }: { theme?: 'classic' | 'white' | 'cyberpunk' }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const themes = {
        classic: { bg: 'rgba(0, 0, 0, 0.05)', text: '#0F0' },
        white: { bg: 'rgba(255, 255, 255, 0.1)', text: '#003300' },
        cyberpunk: { bg: 'rgba(0, 0, 0, 0.05)', text: '#0FF' }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const columns = Math.floor(width / 20);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const draw = () => {
            // Semi-transparent background to create fade effect
            ctx.fillStyle = themes[theme].bg;
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = themes[theme].text;
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
        />
    );
}
