"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, Sparkles, Clock, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ui/product-card";
import { ScentPyramid } from "@/components/ui/scent-pyramid";
import { PERFUMES } from "@/data/perfumes";
import { useState } from "react";

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = PERFUMES.find((p) => p.slug === slug);
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
                    <Link href="/" className="text-primary hover:underline">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const relatedProducts = PERFUMES.filter((p) => p.id !== product.id).slice(0, 4);

    // Mood/occasion tags based on intensity and notes
    const getMoodTags = () => {
        const tags = [];
        if (product.intensity === "strong") tags.push("Evening Wear", "Date Night");
        if (product.intensity === "soft") tags.push("Daily Elegance", "Office Ready");
        if (product.intensity === "moderate") tags.push("Versatile", "Day to Night");
        if (product.notes.some(n => n.includes("Rose") || n.includes("Jasmine"))) tags.push("Romantic");
        if (product.notes.some(n => n.includes("Oud") || n.includes("Leather"))) tags.push("Sophisticated");
        return tags.slice(0, 3);
    };

    // Split notes for pyramid (simplified - in real app this would be in data)
    const topNotes = product.notes.slice(0, Math.ceil(product.notes.length / 3));
    const heartNotes = product.notes.slice(Math.ceil(product.notes.length / 3), Math.ceil(product.notes.length * 2 / 3));
    const baseNotes = product.notes.slice(Math.ceil(product.notes.length * 2 / 3));

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        setTimeout(() => setIsAddingToCart(false), 1000);
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/collection"
                        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group underline-reveal"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Collection
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
                    {/* ═══════════════════════════════════════════════════════════
                        PRODUCT GALLERY
                    ═══════════════════════════════════════════════════════════ */}
                    <div className="relative">
                        {/* Animated Background Glow */}
                        <motion.div
                            className="absolute -inset-10 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        <div className="relative flex flex-col gap-4">
                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="relative aspect-[3/4] bg-card rounded-2xl overflow-hidden border border-border/30"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={product.images[selectedImageIndex]}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-primary text-primary-foreground border-none px-4 py-1.5">
                                            {product.badge}
                                        </Badge>
                                    </div>
                                )}
                            </motion.div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === idx
                                                ? "border-primary shadow-gold"
                                                : "border-border/30 opacity-60 hover:opacity-100"
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ═══════════════════════════════════════════════════════════
                        PRODUCT DETAILS
                    ═══════════════════════════════════════════════════════════ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        {/* Brand */}
                        <span className="text-overline text-primary mb-4">
                            {product.brand}
                        </span>

                        {/* Name */}
                        <h1 className="mb-6">{product.name}</h1>

                        {/* Price & Concentration */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-serif font-bold text-primary">
                                ${product.price}
                            </span>
                            <Badge variant="outline" className="border-border text-muted-foreground">
                                Eau de Parfum
                            </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Mood Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {getMoodTags().map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-muted/50 text-muted-foreground border border-border/50 px-4 py-1.5 rounded-full text-xs"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Performance Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
                                <Clock className="w-5 h-5 mx-auto mb-2 text-primary" />
                                <span className="block text-2xl font-serif font-bold text-foreground mb-1">
                                    {product.longevity * 2}h+
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Longevity
                                </span>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
                                <Wind className="w-5 h-5 mx-auto mb-2 text-primary" />
                                <span className="block text-2xl font-serif font-bold text-foreground mb-1">
                                    {product.sillage}/5
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Sillage
                                </span>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-muted/30 border border-border/30">
                                <Droplets className="w-5 h-5 mx-auto mb-2 text-primary" />
                                <span className="block text-2xl font-serif font-bold text-foreground mb-1 capitalize">
                                    {product.intensity}
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Intensity
                                </span>
                            </div>
                        </div>

                        <Separator className="mb-8 bg-border/50" />

                        {/* Add to Cart Section */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-border/50 rounded-full overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <motion.div className="flex-1 relative">
                                <Button
                                    size="lg"
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg rounded-full relative overflow-hidden"
                                    onClick={handleAddToCart}
                                >
                                    <AnimatePresence mode="wait">
                                        {isAddingToCart ? (
                                            <motion.span
                                                key="adding"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="flex items-center gap-2"
                                            >
                                                <Sparkles className="w-5 h-5" />
                                                Added!
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="add"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                            >
                                                Add to Cart — ${(product.price * quantity).toFixed(2)}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Button>

                                {/* Ripple Effect */}
                                <AnimatePresence>
                                    {isAddingToCart && (
                                        <motion.div
                                            className="absolute inset-0 bg-primary/30 rounded-full"
                                            initial={{ scale: 0.5, opacity: 1 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Wishlist Button */}
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-14 w-14 border-border/50 hover:border-primary hover:text-primary rounded-full"
                            >
                                <Heart className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    SCENT PYRAMID
                ═══════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <div className="text-center mb-12">
                        <span className="text-overline text-primary mb-4 block">The Composition</span>
                        <h2>Olfactory Journey</h2>
                    </div>

                    <ScentPyramid
                        topNotes={topNotes.length > 0 ? topNotes : product.notes.slice(0, 1)}
                        heartNotes={heartNotes.length > 0 ? heartNotes : product.notes.slice(1, 2)}
                        baseNotes={baseNotes.length > 0 ? baseNotes : product.notes.slice(2)}
                        className="max-w-2xl mx-auto"
                    />
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════
                    RELATED PRODUCTS
                ═══════════════════════════════════════════════════════════ */}
                <div className="border-t border-border/30 pt-24">
                    <div className="text-center mb-12">
                        <span className="text-overline text-primary mb-4 block">Discover More</span>
                        <h2>You May Also Like</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {relatedProducts.map((p, index) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <ProductCard perfume={p} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
