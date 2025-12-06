"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, Sun, Moon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useNavigation } from "@/components/providers/navigation-provider";


export function Header() {
    const pathname = usePathname();
    const { startNavigation } = useNavigation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Handle navigation with loader
    const handleNavigation = (href: string) => {
        if (href !== pathname) {
            startNavigation();
        }
    };

    // Header is transparent (white text) only on Home page when not scrolled
    const isHome = pathname === "/";
    const isTransparent = isHome && !isScrolled;

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/collection", label: "Collections" },
        { href: "/collection", label: "Shop All" },
        { href: "/about", label: "Our Story" },
    ];

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    !isTransparent
                        ? "py-3 glass border-b border-border/50"
                        : "bg-transparent py-5 border-b border-transparent"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        className={cn(
                            "lg:hidden transition-colors duration-300",
                            !isTransparent ? "text-foreground hover:text-primary" : "text-white hover:text-primary"
                        )}
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" onClick={() => handleNavigation("/")} className="group flex items-center gap-2">
                        <motion.span
                            className="text-2xl md:text-3xl font-serif font-bold tracking-[0.15em]"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <span className="text-primary">L&apos;</span>
                            <span className={cn(
                                "transition-colors duration-500",
                                !isTransparent ? "text-foreground group-hover:text-primary" : "text-white group-hover:text-primary"
                            )}>OBSCUR</span>
                        </motion.span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => handleNavigation(link.href)}
                                className={cn(
                                    "relative text-sm uppercase tracking-[0.2em] transition-colors duration-300 underline-reveal py-1 drop-shadow-sm",
                                    !isTransparent
                                        ? "text-foreground/80 hover:text-foreground"
                                        : "text-white/90 hover:text-white"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Theme Toggle */}
                        {mounted && (
                            <motion.button
                                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors duration-300"
                                aria-label="Toggle Theme"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={resolvedTheme}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        {resolvedTheme === "dark" ? (
                                            <Sun className="w-5 h-5 text-primary" />
                                        ) : (
                                            <Moon className={cn(
                                                "w-5 h-5 transition-colors duration-300",
                                                !isTransparent ? "text-foreground" : "text-white"
                                            )} />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        )}

                        {/* Search Button */}
                        <motion.button
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors duration-300",
                                !isTransparent ? "text-foreground" : "text-white"
                            )}
                            onClick={() => setIsSearchOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </motion.button>

                        {/* Cart */}
                        <Link href="/cart" onClick={() => handleNavigation("/cart")}>
                            <motion.div
                                className={cn(
                                    "relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors duration-300",
                                    !isTransparent ? "text-foreground" : "text-white"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <motion.span
                                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                >
                                    2
                                </motion.span>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col"
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header Row */}
                        <div className="flex justify-between items-center p-4 border-b border-border/30">
                            <button
                                className="text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X className="w-7 h-7" />
                            </button>
                            <Link
                                href="/"
                                className="text-2xl font-serif font-bold tracking-[0.15em] text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                L&apos;OBSCUR
                            </Link>
                            <div className="w-7" /> {/* Spacer for alignment */}
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 flex flex-col justify-center items-center gap-8 py-12">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-3xl md:text-4xl font-serif tracking-wider text-foreground hover:text-primary transition-colors duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer */}
                        <div className="p-8 text-center border-t border-border/30">
                            <p className="text-muted-foreground text-sm mb-4">Find your signature scent</p>
                            <Link
                                href="/collection"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span className="uppercase tracking-[0.2em] text-sm font-medium">Shop Now</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-border/30">
                            <div className="w-10" />
                            <span className="text-overline text-muted-foreground">Search</span>
                            <button
                                className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center px-4">
                            <motion.div
                                className="w-full max-w-2xl"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            >
                                <div className="relative">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search fragrances, notes, moods..."
                                        className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-4 pl-10 pr-4 text-2xl md:text-3xl font-serif placeholder:text-muted-foreground/50 transition-colors duration-300"
                                        autoFocus
                                    />
                                </div>

                                {/* Quick Links */}
                                <div className="mt-12">
                                    <p className="text-overline text-muted-foreground mb-6">Popular Searches</p>
                                    <div className="flex flex-wrap gap-3">
                                        {["Oud", "Rose", "Vanilla", "Midnight Collection", "Gift Sets"].map((term) => (
                                            <button
                                                key={term}
                                                className="px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary text-sm transition-colors duration-300"
                                                onClick={() => setIsSearchOpen(false)}
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Collections */}
                                <div className="mt-12">
                                    <p className="text-overline text-muted-foreground mb-6">Browse by Collection</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {[
                                            { name: "L'Obscur", desc: "Dark & mysterious" },
                                            { name: "Lumière", desc: "Light & fresh" },
                                            { name: "Limited", desc: "Exclusive releases" },
                                        ].map((collection) => (
                                            <button
                                                key={collection.name}
                                                className="text-left p-4 border border-border hover:border-primary rounded-lg transition-colors duration-300 group"
                                                onClick={() => setIsSearchOpen(false)}
                                            >
                                                <span className="block font-serif text-lg group-hover:text-primary transition-colors">{collection.name}</span>
                                                <span className="text-xs text-muted-foreground">{collection.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
