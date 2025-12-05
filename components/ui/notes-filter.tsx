"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
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
        <div className="relative z-50 flex justify-center" ref={containerRef}>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border bg-background",
                        selectedNote
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    )}
                >
                    {selectedNote || "Filter by Note"}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] max-h-[300px] overflow-y-auto bg-card border border-border rounded-xl shadow-xl p-2"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                <button
                                    onClick={() => {
                                        onSelectNote(null);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-left text-sm transition-colors",
                                        selectedNote === null
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    All Notes
                                </button>
                                {notes.map((note) => (
                                    <button
                                        key={note}
                                        onClick={() => {
                                            onSelectNote(note);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-left text-sm transition-colors",
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

            {selectedNote && (
                <button
                    onClick={() => onSelectNote(null)}
                    className="absolute left-[calc(50%+100px)] top-1/2 -translate-y-1/2 ml-4 p-2 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Clear filter"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
