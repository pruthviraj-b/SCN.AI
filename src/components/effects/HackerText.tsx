"use client";

import { useState, useEffect } from 'react';

interface HackerTextProps {
    text: string;
    className?: string;
}

export default function HackerText({ text, className = "" }: HackerTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

    const scramble = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text.split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        scramble();
    }, []);

    return (
        <span
            className={`${className} font-mono cursor-default`}
            onMouseEnter={scramble}
        >
            {displayText}
        </span>
    );
}
