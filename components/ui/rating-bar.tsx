import { cn } from "@/lib/utils";

interface RatingBarProps {
    value: number; // 1-5
    max?: number;
    label?: string;
    className?: string;
}

export function RatingBar({ value, max = 5, label, className }: RatingBarProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            {label && <span className="text-xs uppercase tracking-widest text-muted-foreground w-20">{label}</span>}
            <div className="flex gap-1">
                {Array.from({ length: max }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "h-1.5 w-6 rounded-full transition-all duration-300",
                            i < value ? "bg-primary" : "bg-muted"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
