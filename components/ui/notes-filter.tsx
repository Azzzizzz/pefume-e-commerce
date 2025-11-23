"use client";

import { cn } from "@/lib/utils";


interface NotesFilterProps {
    notes: string[];
    selectedNote: string | null;
    onSelectNote: (note: string | null) => void;
}

export function NotesFilter({ notes, selectedNote, onSelectNote }: NotesFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            <button
                onClick={() => onSelectNote(null)}
                className={cn(
                    "px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border",
                    selectedNote === null
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                )}
            >
                All
            </button>
            {notes.map((note) => (
                <button
                    key={note}
                    onClick={() => onSelectNote(note === selectedNote ? null : note)}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border",
                        selectedNote === note
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                    )}
                >
                    {note}
                </button>
            ))}
        </div>
    );
}
