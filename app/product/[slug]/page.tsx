"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RatingBar } from "@/components/ui/rating-bar";
import { ProductCard } from "@/components/ui/product-card";
import { PERFUMES } from "@/data/perfumes";
import { useState } from "react";

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = PERFUMES.find((p) => p.slug === slug);
    const [quantity, setQuantity] = useState(1);

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

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-4">
                <Link
                    href="/"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative aspect-[3/4] bg-card rounded-sm overflow-hidden"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4">
                            {product.brand}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-medium text-primary">${product.price}</span>
                            {product.badge && (
                                <Badge variant="outline" className="border-primary text-primary px-3 py-1">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="space-y-6 mb-10">
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-foreground mb-3">
                                    Olfactory Notes
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.notes.map((note) => (
                                        <Badge
                                            key={note}
                                            variant="secondary"
                                            className="bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors px-4 py-2 rounded-full text-xs uppercase tracking-wider"
                                        >
                                            {note}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <RatingBar value={product.longevity} label="Longevity" />
                                <RatingBar value={product.sillage} label="Sillage" />
                            </div>
                        </div>

                        <Separator className="mb-8 bg-border" />

                        <div className="flex flex-col sm:flex-row gap-6 mb-8">
                            <div className="flex items-center border border-border rounded-none">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-4 hover:text-primary transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-4 hover:text-primary transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <Button
                                size="lg"
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-auto py-4 text-lg rounded-none"
                            >
                                Add to Cart - ${(product.price * quantity).toFixed(2)}
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-auto w-14 border-border hover:border-primary hover:text-primary rounded-none"
                            >
                                <Heart className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                <div className="border-t border-border pt-16">
                    <h2 className="text-3xl font-serif mb-12 text-center">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.id} perfume={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
