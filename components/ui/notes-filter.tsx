"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotesFilterProps {
    notes: string[];
    selectedNote: string | null;
    onSelectNote: (note: string | null) => void;
}

export function NotesFilter({ notes, selectedNote, onSelectNote }: NotesFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative z-50" ref={containerRef}>
            <div className="flex items-center gap-3 flex-wrap">
                {/* Main Filter Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border bg-background group",
                        selectedNote
                            ? "border-primary text-primary shadow-gold"
                            : "border-border/50 text-muted-foreground hover:border-primary hover:text-primary"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Sparkles className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    {selectedNote || "Filter by Note"}
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            isOpen && "rotate-180"
                        )}
                    />
                </motion.button>

                {/* Quick Pills for frequently used notes */}
                <div className="hidden md:flex items-center gap-2">
                    {notes.slice(0, 5).map((note) => (
                        <motion.button
                            key={note}
                            onClick={() => onSelectNote(selectedNote === note ? null : note)}
                            className={cn(
                                "px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-all duration-300",
                                selectedNote === note
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {note}
                        </motion.button>
                    ))}
                </div>

                {/* Clear Button */}
                {selectedNote && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => onSelectNote(null)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-destructive/10"
                        aria-label="Clear filter"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-4 h-4" />
                    </motion.button>
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full mt-3 left-0 w-[320px] sm:w-[400px] max-h-[350px] overflow-y-auto bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-luxury p-3"
                    >
                        {/* All Notes Option */}
                        <button
                            onClick={() => {
                                onSelectNote(null);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 flex items-center gap-3",
                                selectedNote === null
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                                ✨
                            </span>
                            All Notes
                        </button>

                        <div className="h-px bg-border/30 my-2" />

                        {/* Notes Grid */}
                        <div className="grid grid-cols-2 gap-1">
                            {notes.map((note) => (
                                <button
                                    key={note}
                                    onClick={() => {
                                        onSelectNote(note);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "px-4 py-2.5 rounded-xl text-left text-sm transition-all duration-200",
                                        selectedNote === note
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    {note}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
