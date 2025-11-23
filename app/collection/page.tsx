"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";
import { NotesFilter } from "@/components/ui/notes-filter";
import { PERFUMES } from "@/data/perfumes";

export default function CollectionPage() {
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    const filteredPerfumes = selectedNote
        ? PERFUMES.filter((p) => p.notes.includes(selectedNote))
        : PERFUMES;

    const allNotes = Array.from(new Set(PERFUMES.flatMap((p) => p.notes))).sort();

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">The Collection</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our full range of artisanal fragrances, each crafted to tell a unique story.
                    </p>
                </div>

                <div className="mb-12">
                    <NotesFilter
                        notes={allNotes}
                        selectedNote={selectedNote}
                        onSelectNote={setSelectedNote}
                    />
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {filteredPerfumes.map((perfume) => (
                        <ProductCard key={perfume.id} perfume={perfume} />
                    ))}
                </motion.div>

                {filteredPerfumes.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-muted-foreground text-lg">No perfumes found with this note.</p>
                        <button
                            onClick={() => setSelectedNote(null)}
                            className="text-primary hover:underline mt-4"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
