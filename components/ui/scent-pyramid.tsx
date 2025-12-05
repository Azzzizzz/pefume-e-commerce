"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScentNoteIcon } from "./scent-note-icon";

interface ScentPyramidProps {
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
    className?: string;
}

export function ScentPyramid({
    topNotes,
    heartNotes,
    baseNotes,
    className,
}: ScentPyramidProps) {
    const pyramidLevels = [
        { label: "Top Notes", notes: topNotes, description: "First impression • 15-30 min" },
        { label: "Heart Notes", notes: heartNotes, description: "The soul • 2-4 hours" },
        { label: "Base Notes", notes: baseNotes, description: "The foundation • 6+ hours" },
    ];

    return (
        <div className={cn("relative", className)}>
            {/* Decorative pyramid outline */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <svg viewBox="0 0 200 180" className="w-full h-full max-w-[300px]">
                    <polygon
                        points="100,10 190,170 10,170"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                </svg>
            </div>

            <div className="relative z-10 space-y-8">
                {pyramidLevels.map((level, index) => (
                    <motion.div
                        key={level.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className={cn(
                            "text-center",
                            index === 0 && "max-w-[60%] mx-auto",
                            index === 1 && "max-w-[80%] mx-auto",
                            index === 2 && "max-w-full"
                        )}
                    >
                        {/* Level Header */}
                        <div className="mb-4">
                            <h4 className="text-overline text-primary mb-1">{level.label}</h4>
                            <p className="text-caption text-xs">{level.description}</p>
                        </div>

                        {/* Notes Container */}
                        <motion.div
                            className={cn(
                                "flex flex-wrap justify-center gap-3 p-4 rounded-2xl",
                                "bg-gradient-to-b from-muted/30 to-transparent",
                                "border border-border/30"
                            )}
                            whileHover={{
                                borderColor: "var(--primary)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            {level.notes.map((note, noteIndex) => (
                                <motion.div
                                    key={note}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.2 + noteIndex * 0.1,
                                        duration: 0.4,
                                        type: "spring"
                                    }}
                                >
                                    <ScentNoteIcon note={note} size="md" showLabel={true} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Connecting Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent -translate-x-1/2 pointer-events-none" />
        </div>
    );
}

// Simplified version for product cards
interface ScentNotesCompactProps {
    notes: string[];
    className?: string;
}

export function ScentNotesCompact({ notes, className }: ScentNotesCompactProps) {
    const displayNotes = notes.slice(0, 4);
    const remaining = notes.length - 4;

    return (
        <div className={cn("flex items-center gap-1.5", className)}>
            {displayNotes.map((note) => (
                <ScentNoteIcon
                    key={note}
                    note={note}
                    size="sm"
                    showLabel={false}
                />
            ))}
            {remaining > 0 && (
                <span className="text-xs text-muted-foreground ml-1">+{remaining}</span>
            )}
        </div>
    );
}
