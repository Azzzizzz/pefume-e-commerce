"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

    const updateQuantity = (index: number, delta: number) => {
        const newItems = [...cartItems];
        newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
        setCartItems(newItems);
    };

    const removeItem = (index: number) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-16 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven&apos;t found your scent yet.</p>
                <Link href="/collection">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-serif mb-12">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {cartItems.map((item, index) => (
                            <div key={item.product.id} className="flex gap-6 p-4 bg-card border border-border/50 rounded-sm">
                                <div className="relative w-24 h-32 bg-muted/20 flex-shrink-0">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-serif text-lg">{item.product.name}</h3>
                                            <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                                        </div>
                                        <p className="font-medium">${item.product.price}</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center border border-border rounded-none h-8">
                                            <button
                                                onClick={() => updateQuantity(index, -1)}
                                                className="px-3 hover:text-primary transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(index, 1)}
                                                className="px-3 hover:text-primary transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border p-6 sticky top-24">
                            <h3 className="font-serif text-xl mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <Separator className="mb-6" />

                            <div className="flex justify-between font-medium text-lg mb-8">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg rounded-none group">
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
