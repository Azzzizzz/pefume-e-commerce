"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ui/product-card";
import { PERFUMES } from "@/data/perfumes";
import { useState } from "react";

export default function CartPage() {
    // Mock cart state
    const [cartItems, setCartItems] = useState([
        { product: PERFUMES[0], quantity: 1 },
        { product: PERFUMES[2], quantity: 2 },
    ]);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + shipping;

    const updateQuantity = (index: number, delta: number) => {
        const newItems = [...cartItems];
        newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
        setCartItems(newItems);
    };

    const removeItem = (index: number) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    // Recommendations
    const recommendations = PERFUMES.filter(
        (p) => !cartItems.some((item) => item.product.id === p.id)
    ).slice(0, 4);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-16 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-muted/30 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
                    <p className="text-muted-foreground mb-8 max-w-md">
                        Looks like you haven&apos;t found your signature scent yet. Let us help you discover something extraordinary.
                    </p>
                    <Link href="/collection">
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Explore Collection
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="text-overline text-primary mb-4 block">Shopping</span>
                    <h1>Your Cart</h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* ═══════════════════════════════════════════════════════════
                        CART ITEMS
                    ═══════════════════════════════════════════════════════════ */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.product.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="flex gap-6 p-6 bg-card border border-border/30 rounded-2xl hover:border-border/50 transition-colors"
                                >
                                    {/* Image */}
                                    <Link href={`/product/${item.product.slug}`}>
                                        <div className="relative w-28 h-36 rounded-xl overflow-hidden flex-shrink-0 bg-muted/20">
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                                                    {item.product.brand}
                                                </span>
                                                <Link href={`/product/${item.product.slug}`}>
                                                    <h3 className="font-serif text-xl hover:text-primary transition-colors">
                                                        {item.product.name}
                                                    </h3>
                                                </Link>
                                                <span className="text-sm text-muted-foreground">Eau de Parfum • 100ml</span>
                                            </div>
                                            <p className="font-serif text-xl font-bold text-primary">
                                                ${item.product.price}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-end mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-1 border border-border/50 rounded-full">
                                                <button
                                                    onClick={() => updateQuantity(index, -1)}
                                                    className="p-2 hover:text-primary transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(index, 1)}
                                                    className="p-2 hover:text-primary transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* ═══════════════════════════════════════════════════════════
                        ORDER SUMMARY
                    ═══════════════════════════════════════════════════════════ */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="bg-card border border-border/30 rounded-2xl p-8 sticky top-24"
                        >
                            <h3 className="font-serif text-2xl mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium">
                                        {shipping === 0 ? (
                                            <span className="text-primary">Free</span>
                                        ) : (
                                            `$${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Free shipping on orders over $200
                                    </p>
                                )}
                            </div>

                            <Separator className="mb-6 bg-border/50" />

                            <div className="flex justify-between mb-8">
                                <span className="font-serif text-xl">Total</span>
                                <span className="font-serif text-2xl font-bold text-primary">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <Button
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg rounded-full group"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            {/* Trust badges */}
                            <div className="mt-8 pt-6 border-t border-border/30">
                                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Secure
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Authentic
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    RECOMMENDATIONS
                ═══════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24 pt-16 border-t border-border/30"
                >
                    <div className="text-center mb-12">
                        <span className="text-overline text-primary mb-4 block">Complete Your Collection</span>
                        <h2>You Might Also Like</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {recommendations.map((perfume, index) => (
                            <motion.div
                                key={perfume.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <ProductCard perfume={perfume} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
