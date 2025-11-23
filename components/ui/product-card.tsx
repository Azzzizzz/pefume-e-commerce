"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Perfume } from "@/data/perfumes";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
    perfume: Perfume;
}

export function ProductCard({ perfume }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group"
        >
            <Link href={`/product/${perfume.slug}`}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden h-full flex flex-col relative shadow-none hover:shadow-[0_0_30px_-5px_rgba(224,182,129,0.15)] hover:border-primary/50 transition-all duration-500 group-hover:-translate-y-1">
                    {perfume.badge && (
                        <Badge className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground hover:bg-primary/90 font-serif tracking-wider">
                            {perfume.badge}
                        </Badge>
                    )}

                    <div className="relative aspect-[3/4] overflow-hidden bg-muted/20">
                        <Image
                            src={perfume.image}
                            alt={perfume.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                            <span className="text-xs uppercase tracking-widest text-primary border-b border-primary pb-1">View Details</span>
                        </div>
                    </div>

                    <CardContent className="pt-6 flex-grow flex flex-col items-center text-center relative z-10">
                        <span className="text-[10px] text-primary/80 uppercase tracking-[0.2em] mb-2 font-medium">
                            {perfume.brand}
                        </span>
                        <h3 className="text-xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                            {perfume.name}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                            {perfume.notes.slice(0, 3).map((note) => (
                                <span key={note} className="text-[10px] text-muted-foreground uppercase tracking-wider px-2 py-1 border border-border/50 rounded-sm bg-background/20">
                                    {note}
                                </span>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className="pb-6 flex justify-center relative z-10">
                        <span className="text-lg font-medium text-foreground font-serif">
                            ${perfume.price}
                        </span>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
}
