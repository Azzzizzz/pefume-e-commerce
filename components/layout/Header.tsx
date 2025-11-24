"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Search, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-border py-4"
                        : "bg-transparent py-6"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-foreground"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-primary">
                        L&apos;OBSCUR
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/collection" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">
                            Collections
                        </Link>
                        <Link href="/collection" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">
                            Shop All
                        </Link>
                        <Link href="/about" className="text-sm uppercase tracking-widest hover:text-primary transition-colors">
                            Our Story
                        </Link>
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        {mounted && (
                            <button
                                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                className="text-foreground hover:text-primary transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {resolvedTheme === "dark" ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>
                        )}
                        <button className="text-foreground hover:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/cart" className="text-foreground hover:text-primary transition-colors relative">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                                2
                            </span>
                        </Link>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-background flex flex-col justify-center items-center gap-8"
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <button
                            className="absolute top-6 left-4 text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <Link
                            href="/"
                            className="text-3xl font-serif text-primary mb-8"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            L&apos;OBSCUR
                        </Link>

                        <nav className="flex flex-col items-center gap-6">
                            <Link
                                href="/collection"
                                className="text-xl uppercase tracking-widest hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Collections
                            </Link>
                            <Link
                                href="/collection"
                                className="text-xl uppercase tracking-widest hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Shop All
                            </Link>
                            <Link
                                href="/about"
                                className="text-xl uppercase tracking-widest hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Our Story
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
