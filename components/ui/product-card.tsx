"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Perfume } from "@/data/perfumes";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface ProductCardProps {
    perfume: Perfume;
}

export function ProductCard({ perfume }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group h-full"
        >
            <Link href={`/product/${perfume.slug}`} className="block h-full">
                <div className="bg-card rounded-[1rem] p-2.5 h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50">

                    {/* Image Area */}
                    <div className="relative aspect-square w-full bg-muted/20 rounded-[1rem] overflow-hidden mb-4 group-hover:bg-muted/30 transition-colors duration-500">

                        <Image
                            src={perfume.image}
                            alt={perfume.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50" />

                        {/* Pagination Dots (Bottom Center) */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col flex-grow px-1 gap-3">

                        {/* Row 1: Badge & Heart */}
                        <div className="flex justify-between items-center">
                            {perfume.badge ? (
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] px-2.5 py-1 font-medium tracking-wide border-none uppercase">
                                    {perfume.badge}
                                </Badge>
                            ) : (
                                <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
                                    Luxury Scent
                                </span>
                            )}
                            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors group/heart">
                                <Heart className="w-4 h-4 text-muted-foreground group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-colors" />
                            </button>
                        </div>

                        {/* Row 2: Name */}
                        <h3 className="text-xl font-serif font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {perfume.name}
                        </h3>

                        {/* Row 3: Price & Button */}
                        <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</span>
                                <span className="text-lg font-bold text-foreground font-serif">
                                    ${perfume.price}
                                </span>
                            </div>
                            <button className="bg-foreground text-background px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-black transition-all duration-300 shadow-lg hover:shadow-primary/25">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
