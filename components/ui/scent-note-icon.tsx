"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Map of scent notes to their emoji/symbol representations
const noteIcons: Record<string, string> = {
    // Florals
    "Rose": "🌹",
    "Jasmine": "🌸",
    "Jasmine Sambac": "🌸",
    "Damask Rose": "🌹",
    "Black Rose": "🥀",
    "Tuberose": "🌷",
    "Ylang Ylang": "🌺",
    "Peony": "🌸",
    "Orange Blossom": "🌼",
    "Magnolia": "🌸",
    "Cherry Blossom": "🌸",
    "Lily of the Valley": "🌷",
    "Iris": "💜",
    "Orchid": "🌺",
    "Mimosa": "🌼",
    "Freesia": "🌸",
    "Cotton Flower": "🌸",
    "White Rose": "🤍",
    "Water Lotus": "🪷",

    // Woods & Resins
    "Oud": "🪵",
    "Agarwood": "🪵",
    "Sandalwood": "🪵",
    "Cedarwood": "🌲",
    "Cedar": "🌲",
    "Rosewood": "🪵",
    "Ebony Wood": "🪵",
    "Driftwood": "🪵",
    "Pine": "🌲",
    "Incense": "🔥",
    "Myrrh": "✨",
    "Benzoin": "✨",
    "Labdanum": "✨",
    "Resin": "💧",
    "Oakmoss": "🌿",
    "Patchouli": "🌿",

    // Spices
    "Saffron": "🧡",
    "Cardamom": "🫚",
    "Cinnamon": "🫚",
    "Black Pepper": "⚫",
    "Clove": "🫚",
    "Ginger": "🫚",

    // Citrus
    "Bergamot": "🍋",
    "Neroli": "🍊",
    "Mandarin": "🍊",
    "Lemon": "🍋",
    "Grapefruit": "🍊",

    // Gourmand
    "Vanilla": "🍦",
    "Vanilla Bean": "🍦",
    "Vanilla Absolute": "🍦",
    "Tonka Bean": "☕",
    "Cacao": "🍫",
    "Honey": "🍯",
    "Coconut": "🥥",
    "Coconut Milk": "🥥",

    // Amber & Musk
    "Amber": "💛",
    "White Amber": "🤍",
    "Musk": "🤍",
    "White Musk": "🤍",

    // Fresh & Green
    "Green Tea": "🍵",
    "White Tea": "🍵",
    "Tea": "🍵",
    "Cucumber": "🥒",
    "Mint": "🌿",
    "Fig Leaf": "🍃",
    "Fig Milk": "🍃",
    "Sage": "🌿",
    "Lavender": "💜",

    // Fruits
    "Pear": "🍐",
    "Red Apple": "🍎",
    "Apricot": "🍑",
    "Dried Fruits": "🍇",

    // Leather & Tobacco
    "Leather": "🟤",
    "Tobacco": "🍂",
    "Tobacco Leaf": "🍂",

    // Other
    "Aldehydes": "✨",
    "Cotton": "☁️",
    "Sea Salt": "🌊",
    "Soil": "🟤",
    "Red Wine": "🍷",
    "Suede": "🟫",
    "Osmanthus": "🌼",
};

interface ScentNoteIconProps {
    note: string;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
    animated?: boolean;
    className?: string;
}

export function ScentNoteIcon({
    note,
    size = "md",
    showLabel = true,
    animated = true,
    className
}: ScentNoteIconProps) {
    const icon = noteIcons[note] || "✨";

    const sizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl",
    };

    const containerSizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <motion.div
            className={cn(
                "inline-flex items-center gap-2 group",
                className
            )}
            whileHover={animated ? { scale: 1.05 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <motion.span
                className={cn(
                    "flex items-center justify-center rounded-full bg-muted/50 border border-border/50",
                    containerSizes[size],
                    "group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors duration-300"
                )}
                whileHover={animated ? { rotate: [0, -10, 10, 0] } : undefined}
                transition={{ duration: 0.5 }}
            >
                <span className={sizeClasses[size]}>{icon}</span>
            </motion.span>
            {showLabel && (
                <span className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {note}
                </span>
            )}
        </motion.div>
    );
}

interface ScentNotesGridProps {
    notes: string[];
    size?: "sm" | "md" | "lg";
    showLabels?: boolean;
    className?: string;
}

export function ScentNotesGrid({
    notes,
    size = "md",
    showLabels = true,
    className
}: ScentNotesGridProps) {
    return (
        <div className={cn("flex flex-wrap gap-3", className)}>
            {notes.map((note, index) => (
                <motion.div
                    key={note}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                    <ScentNoteIcon note={note} size={size} showLabel={showLabels} />
                </motion.div>
            ))}
        </div>
    );
}
