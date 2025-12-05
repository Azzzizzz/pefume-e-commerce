"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";
import { NotesFilter } from "@/components/ui/notes-filter";
import { PERFUMES } from "@/data/perfumes";
import { SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";

export default function CollectionPage() {
    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

    const filteredPerfumes = selectedNote
        ? PERFUMES.filter((p) => p.notes.includes(selectedNote))
        : PERFUMES;

    const allNotes = Array.from(new Set(PERFUMES.flatMap((p) => p.notes))).sort();

    // Separate featured and regular products
    const featuredProducts = filteredPerfumes.filter((p) => p.badge);
    const regularProducts = filteredPerfumes.filter((p) => !p.badge);

    return (
        <div className="min-h-screen bg-background">
            {/* ═══════════════════════════════════════════════════════════
                HERO BANNER
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background" />
                <div className="absolute inset-0 bg-gradient-hero opacity-60" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4"
                >
                    <span className="text-overline text-primary mb-4 block">Explore</span>
                    <h1 className="mb-4">The Collection</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                        {filteredPerfumes.length} artisanal fragrances, each crafted to tell a unique story.
                    </p>
                </motion.div>
            </section>

            <div className="container mx-auto px-4 pb-24">
                {/* ═══════════════════════════════════════════════════════════
                    FILTER BAR
                ═══════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="sticky top-20 z-40 py-4 -mx-4 px-4 bg-background/80 backdrop-blur-lg border-b border-border/30"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Notes Filter */}
                        <NotesFilter
                            notes={allNotes}
                            selectedNote={selectedNote}
                            onSelectNote={setSelectedNote}
                        />

                        {/* View Toggle & Count */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                {filteredPerfumes.length} scents
                            </span>

                            <div className="flex items-center gap-1 border border-border/50 rounded-full p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-full transition-colors ${viewMode === "grid"
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("compact")}
                                    className={`p-2 rounded-full transition-colors ${viewMode === "compact"
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════
                    FEATURED PRODUCTS (if any)
                ═══════════════════════════════════════════════════════════ */}
                {featuredProducts.length > 0 && !selectedNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="font-serif text-2xl">Featured</h3>
                            <div className="flex-1 h-px bg-border/30" />
                        </div>

                        <div className={`grid gap-6 md:gap-8 ${viewMode === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                            }`}>
                            {featuredProducts.map((perfume, index) => (
                                <motion.div
                                    key={perfume.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <ProductCard perfume={perfume} featured />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    ALL PRODUCTS
                ═══════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12"
                >
                    {!selectedNote && featuredProducts.length > 0 && (
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="font-serif text-2xl">All Scents</h3>
                            <div className="flex-1 h-px bg-border/30" />
                        </div>
                    )}

                    <motion.div
                        layout
                        className={`grid gap-6 md:gap-8 ${viewMode === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                            }`}
                    >
                        {(selectedNote ? filteredPerfumes : regularProducts).map((perfume, index) => (
                            <motion.div
                                key={perfume.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.4 }}
                            >
                                <ProductCard perfume={perfume} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Empty State */}
                {filteredPerfumes.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <p className="text-muted-foreground text-lg mb-4">
                            No perfumes found with this note.
                        </p>
                        <button
                            onClick={() => setSelectedNote(null)}
                            className="text-primary hover:text-primary/80 underline-reveal"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
