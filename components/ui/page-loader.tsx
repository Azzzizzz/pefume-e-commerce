"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageLoaderProps {
    isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
                >
                    {/* Perfume Droplet Animation */}
                    <div className="relative">
                        {/* Outer ring - pulsing */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary/30"
                            style={{ width: 120, height: 120, margin: -30 }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.1, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Inner ring - rotating */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-primary/50"
                            style={{ width: 80, height: 80, margin: -10 }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        {/* Central droplet */}
                        <motion.div
                            className="relative w-[60px] h-[60px]"
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Droplet shape using SVG */}
                            <svg
                                viewBox="0 0 60 80"
                                className="w-full h-full"
                                fill="none"
                            >
                                <defs>
                                    <linearGradient
                                        id="dropletGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                                        <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
                                    </linearGradient>
                                    <filter id="dropletGlow">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <motion.path
                                    d="M30 0 C30 0, 60 35, 60 50 C60 66, 47 75, 30 75 C13 75, 0 66, 0 50 C0 35, 30 0, 30 0 Z"
                                    fill="url(#dropletGradient)"
                                    filter="url(#dropletGlow)"
                                    animate={{
                                        d: [
                                            "M30 0 C30 0, 60 35, 60 50 C60 66, 47 75, 30 75 C13 75, 0 66, 0 50 C0 35, 30 0, 30 0 Z",
                                            "M30 5 C30 5, 55 38, 55 52 C55 65, 45 72, 30 72 C15 72, 5 65, 5 52 C5 38, 30 5, 30 5 Z",
                                            "M30 0 C30 0, 60 35, 60 50 C60 66, 47 75, 30 75 C13 75, 0 66, 0 50 C0 35, 30 0, 30 0 Z",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                                {/* Shimmer highlight */}
                                <motion.ellipse
                                    cx="20"
                                    cy="40"
                                    rx="8"
                                    ry="12"
                                    fill="white"
                                    opacity="0.3"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                        rx: [8, 10, 8],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </svg>
                        </motion.div>

                        {/* Floating particles */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
                                style={{
                                    left: 30 + Math.cos((i * 60 * Math.PI) / 180) * 50,
                                    top: 30 + Math.sin((i * 60 * Math.PI) / 180) * 50,
                                }}
                                animate={{
                                    y: [-10, 10, -10],
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Brand text */}
                    <motion.div
                        className="absolute bottom-1/3 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.p
                            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Crafting Your Experience
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook to use with Next.js navigation
export function usePageLoader() {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return { isLoading, startLoading, stopLoading };
}
