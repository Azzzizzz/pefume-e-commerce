import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-card border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-widest text-primary block mb-6">
                            L&apos;OBSCUR
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Crafting olfactory masterpieces for the nocturnal soul.
                            Inspired by the mysteries of the night bazaar.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-foreground font-serif tracking-widest mb-6">Explore</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    All Perfumes
                                </Link>
                            </li>
                            <li>
                                <Link href="/collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/journal" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Journal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-foreground font-serif tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-foreground font-serif tracking-widest mb-6">Newsletter</h4>
                        <p className="text-muted-foreground text-sm mb-4">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-background border-border focus:border-primary"
                            />
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-xs">
                        © {new Date().getFullYear()} L&apos;Obscur Parfums. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
