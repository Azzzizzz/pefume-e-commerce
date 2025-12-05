"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, ArrowRight } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card/50 border-t border-border/50 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-20">
                    {/* Brand Section - Larger */}
                    <div className="md:col-span-5">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-3xl md:text-4xl font-serif font-bold tracking-[0.1em]">
                                <span className="text-primary">L&apos;</span>
                                <span className="text-foreground">OBSCUR</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
                            Crafting olfactory masterpieces for those who dare to embrace the night.
                            Each fragrance is a journey through shadows and light.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://instagram.com"
                                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 group"
                                target="_blank"
                            >
                                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link
                                href="https://twitter.com"
                                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 group"
                                target="_blank"
                            >
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://pinterest.com"
                                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 group"
                                target="_blank"
                            >
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0a12 12 0 0 0-4.373 23.178c-.07-.63-.137-1.613.028-2.31.15-.625.977-4.145.977-4.145s-.249-.5-.249-1.238c0-1.16.673-2.025 1.51-2.025.712 0 1.056.535 1.056 1.177 0 .717-.457 1.79-.692 2.782-.197.833.417 1.512 1.238 1.512 1.485 0 2.627-1.566 2.627-3.827 0-2.001-1.438-3.4-3.491-3.4-2.378 0-3.773 1.784-3.773 3.627 0 .718.276 1.488.621 1.907.068.083.078.155.058.24-.063.267-.204.833-.232.95-.037.153-.122.185-.282.112-1.054-.49-1.713-2.03-1.713-3.267 0-2.66 1.932-5.103 5.57-5.103 2.924 0 5.197 2.083 5.197 4.87 0 2.903-1.83 5.24-4.373 5.24-.854 0-1.656-.444-1.93-.968l-.525 2.003c-.19.731-.703 1.648-1.046 2.206A12 12 0 1 0 12 0z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-2">
                        <h4 className="text-overline text-foreground mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {["All Perfumes", "Collections", "Our Story", "Journal"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={`/${link.toLowerCase().replace(" ", "-")}`}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-overline text-foreground mb-6">Support</h4>
                        <ul className="space-y-4">
                            {["FAQ", "Shipping & Returns", "Contact Us", "Gift Cards"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={`/${link.toLowerCase().replace(/ & /g, "-").replace(" ", "-")}`}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="md:col-span-3">
                        <h4 className="text-overline text-foreground mb-6">Newsletter</h4>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                            Subscribe for exclusive access to new releases, scent stories, and members-only offers.
                        </p>
                        <motion.form
                            className="flex flex-col gap-3"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-background/50 border-border/50 focus:border-primary h-12 pr-12"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full group"
                            >
                                <span>Subscribe</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/30 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-xs tracking-wide">
                        © {currentYear} L&apos;Obscur Parfums. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-muted-foreground">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
