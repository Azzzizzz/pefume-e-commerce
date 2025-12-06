"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Perfume } from "@/data/perfumes";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Wind } from "lucide-react";
import { useState, useRef } from "react";

interface ProductCardProps {
    perfume: Perfume;
    featured?: boolean;
}

export function ProductCard({ perfume, featured = false }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D Tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    // Get intensity badge color
    const getIntensityColor = () => {
        switch (perfume.intensity) {
            case "soft": return "bg-green-500/10 text-green-600 dark:text-green-400";
            case "moderate": return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
            case "strong": return "bg-red-500/10 text-red-600 dark:text-red-400";
        }
    };

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="group h-full perspective-1000"
        >
            <Link href={`/product/${perfume.slug}`} className="block h-full">
                <motion.div
                    className={`
                        relative bg-card h-full flex flex-col overflow-hidden
                        border border-border/30 hover:border-primary/30
                        transition-all duration-500
                        ${featured ? 'rounded-2xl' : 'rounded-xl'}
                    `}
                    whileHover={{
                        boxShadow: "0 25px 50px -12px rgba(201, 162, 39, 0.15)",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/20">
                        {/* Primary Image */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Image
                                src={perfume.images[0]}
                                alt={perfume.name}
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                        {/* Badge */}
                        {perfume.badge && (
                            <motion.div
                                className="absolute top-3 left-3 z-10"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-none px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider shadow-lg">
                                    {perfume.badge}
                                </Badge>
                            </motion.div>
                        )}

                        {/* Wishlist Button */}
                        <motion.button
                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:border-primary hover:bg-background transition-all duration-300 group/heart"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle wishlist
                            }}
                        >
                            <Heart className="w-3.5 h-3.5 text-muted-foreground group-hover/heart:text-primary group-hover/heart:fill-primary/20 transition-all duration-300" />
                        </motion.button>

                        {/* Bottom Info Overlay - Shows on hover */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 p-3 z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Scent Notes */}
                            <div className="flex flex-wrap gap-1 mb-2">
                                {perfume.notes.slice(0, 3).map((note) => (
                                    <span
                                        key={note}
                                        className="px-1.5 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-[9px] text-foreground border border-border/50"
                                    >
                                        {note}
                                    </span>
                                ))}
                                {perfume.notes.length > 3 && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-primary/80 backdrop-blur-sm text-[9px] text-primary-foreground">
                                        +{perfume.notes.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Quick Stats */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[9px] text-white/80">
                                    <Clock className="w-3 h-3" />
                                    <span>{perfume.longevity * 2}h</span>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] text-white/80">
                                    <Wind className="w-3 h-3" />
                                    <span>{["Light", "Moderate", "Strong"][Math.min(perfume.sillage - 1, 2)]}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-3 gap-2">
                        {/* Brand & Intensity */}
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                                {perfume.brand}
                            </span>
                            <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${getIntensityColor()}`}>
                                {perfume.intensity}
                            </span>
                        </div>

                        {/* Name */}
                        <h3 className="text-base font-serif font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-1">
                            {perfume.name}
                        </h3>

                        {/* Description - Truncated */}
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                            {perfume.description}
                        </p>

                        {/* Price & CTA */}
                        <div className="mt-auto pt-2 flex items-end justify-between border-t border-border/30">
                            <div>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5">Price</span>
                                <span className="text-xl font-serif font-bold text-foreground">
                                    ${perfume.price}
                                </span>
                            </div>
                            <motion.button
                                className="px-4 py-2 bg-foreground text-background rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary transition-colors duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Handle quick add
                                }}
                            >
                                Add
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
