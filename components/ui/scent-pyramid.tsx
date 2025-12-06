"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Html, Sparkles } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { Hand } from "lucide-react";

// Note icon mapping
const noteIcons: Record<string, string> = {
    "rose": "🌹", "jasmine": "🌸", "violet": "💜", "iris": "💠", "tuberose": "🌺",
    "lily": "🪷", "peony": "🌷", "magnolia": "🌼", "orchid": "🌺", "ylang-ylang": "🌺",
    "sandalwood": "🪵", "cedar": "🌲", "oud": "🪵", "vetiver": "🌿", "patchouli": "🍂",
    "birch": "🌳", "cypress": "🌲", "pine": "🌲",
    "saffron": "🧡", "cinnamon": "🟤", "cardamom": "🫛", "pepper": "⚫",
    "clove": "🟤", "nutmeg": "🥜", "ginger": "🫚",
    "bergamot": "🍋", "lemon": "🍋", "orange": "🍊", "grapefruit": "🍊",
    "mandarin": "🍊", "lime": "🍋",
    "vanilla": "🍦", "chocolate": "🍫", "honey": "🍯", "caramel": "🍮",
    "coffee": "☕", "cocoa": "🍫", "praline": "🥜",
    "amber": "💛", "benzoin": "✨", "frankincense": "✨", "myrrh": "🟤",
    "labdanum": "🟤", "incense": "🕯️",
    "musk": "💎", "white musk": "🤍",
    "apple": "🍎", "peach": "🍑", "pear": "🍐", "plum": "🟣", "fig": "🟤",
    "raspberry": "🔴", "blackcurrant": "🫐", "cherry": "🍒",
    "leather": "🟫", "tobacco": "🍂", "smoke": "💨", "sea salt": "🧂",
    "marine": "🌊", "moss": "🌿", "grass": "🌱", "tea": "🍵",
    "mint": "🌿", "lavender": "💜", "geranium": "🌸",
};

const getNoteIcon = (note: string): string => noteIcons[note.toLowerCase()] || "✨";

// Elegant easing function
const smoothStep = (t: number) => t * t * (3 - 2 * t);

// Premium Glowing Pyramid
function GlowingPyramid({
    activeLevel,
    setActiveLevel,
    hoveredNote,
    setHoveredNote
}: {
    activeLevel: number | null;
    setActiveLevel: (level: number | null) => void;
    hoveredNote: string | null;
    setHoveredNote: (note: string | null) => void;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const pyramidRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const [rotationSpeed, setRotationSpeed] = useState(0.002);

    useFrame((state) => {
        if (groupRef.current) {
            // Smooth, elegant rotation with easing
            groupRef.current.rotation.y += rotationSpeed;
        }
        if (pyramidRef.current) {
            // Subtle breathing animation
            const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + 1;
            pyramidRef.current.scale.setScalar(breathe);
        }
        if (glowRef.current) {
            // Pulsing glow
            const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 + 0.7;
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.15;
        }
    });

    const levelColors = ["#F59E0B", "#EC4899", "#8B5CF6"];
    const levelPositions = [1.2, 0, -1.2];
    const levelNames = ["Top Notes", "Heart Notes", "Base Notes"];

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setRotationSpeed(0.001)}
            onPointerOut={() => setRotationSpeed(0.002)}
        >
            {/* Main Pyramid - Premium Golden Crystal */}
            <mesh ref={pyramidRef} position={[0, 0, 0]}>
                <coneGeometry args={[2.2, 4, 4]} />
                <meshPhysicalMaterial
                    color="#D4AF37"
                    metalness={0.95}
                    roughness={0.05}
                    transparent
                    opacity={0.85}
                    envMapIntensity={2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {/* Inner Glow Core */}
            <mesh ref={glowRef} position={[0, 0, 0]} scale={1.1}>
                <coneGeometry args={[2.2, 4, 4]} />
                <meshBasicMaterial
                    color="#FFD700"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Outer Aura */}
            <mesh position={[0, 0, 0]} scale={1.3}>
                <coneGeometry args={[2.2, 4, 4]} />
                <meshBasicMaterial
                    color="#D4AF37"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Level Rings with Labels */}
            {levelPositions.map((y, index) => (
                <group key={index}>
                    {/* Main Ring */}
                    <mesh
                        position={[0, y, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                        onPointerOver={() => setActiveLevel(index)}
                        onPointerOut={() => setActiveLevel(null)}
                    >
                        <torusGeometry args={[2 + index * 0.5, 0.08, 16, 64]} />
                        <meshStandardMaterial
                            color={levelColors[index]}
                            emissive={levelColors[index]}
                            emissiveIntensity={activeLevel === index ? 2 : 0.5}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>

                    {/* Glow Ring */}
                    <mesh
                        position={[0, y, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <torusGeometry args={[2 + index * 0.5, 0.25, 16, 64]} />
                        <meshBasicMaterial
                            color={levelColors[index]}
                            transparent
                            opacity={activeLevel === index ? 0.4 : 0.15}
                        />
                    </mesh>

                    {/* Level Label - Fixed Position */}
                    <Html
                        position={[3.5 + index * 0.3, y, 0]}
                        center
                        style={{ pointerEvents: 'none' }}
                        distanceFactor={8}
                    >
                        <div className={cn(
                            "px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-500",
                            "bg-background/95 backdrop-blur-md shadow-xl",
                            "border-2",
                            activeLevel === index
                                ? "opacity-100 scale-110"
                                : "opacity-70 scale-100"
                        )}
                            style={{
                                borderColor: levelColors[index],
                                boxShadow: activeLevel === index
                                    ? `0 0 30px ${levelColors[index]}40`
                                    : 'none'
                            }}>
                            <span
                                className="text-sm font-bold uppercase tracking-wider"
                                style={{ color: levelColors[index] }}
                            >
                                {levelNames[index]}
                            </span>
                        </div>
                    </Html>
                </group>
            ))}

            {/* Sparkles for premium effect */}
            <Sparkles
                count={50}
                scale={8}
                size={3}
                speed={0.3}
                opacity={0.5}
                color="#D4AF37"
            />
        </group>
    );
}

// Orbiting Note with enhanced visuals
function OrbitingNote({
    note,
    radius,
    speed,
    offset,
    yPosition,
    isActive,
    color,
    onHover,
    isHovered
}: {
    note: string;
    radius: number;
    speed: number;
    offset: number;
    yPosition: number;
    isActive: boolean;
    color: string;
    onHover: (note: string | null) => void;
    isHovered: boolean;
}) {
    const ref = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime() * speed + offset;
            // Smooth circular motion
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
            ref.current.position.y = yPosition + Math.sin(t * 1.5) * 0.15;
        }
        if (meshRef.current && (isActive || isHovered)) {
            // Pulsing effect when active
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
            meshRef.current.scale.setScalar(pulse * 1.2);
        }
    });

    const scale = isHovered ? 1.5 : isActive ? 1.2 : 1;

    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <group
                ref={ref}
                onPointerOver={() => onHover(note)}
                onPointerOut={() => onHover(null)}
            >
                {/* Note sphere */}
                <mesh ref={meshRef} scale={scale}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshPhysicalMaterial
                        color={isActive || isHovered ? color : "#888888"}
                        emissive={isActive || isHovered ? color : "#444444"}
                        emissiveIntensity={isActive || isHovered ? 1.2 : 0.2}
                        metalness={0.8}
                        roughness={0.2}
                        clearcoat={1}
                    />
                </mesh>

                {/* Glow sphere */}
                {(isActive || isHovered) && (
                    <mesh scale={scale * 1.8}>
                        <sphereGeometry args={[0.18, 16, 16]} />
                        <meshBasicMaterial
                            color={color}
                            transparent
                            opacity={0.25}
                        />
                    </mesh>
                )}

                {/* Enhanced HTML Label - Always readable */}
                <Html
                    position={[0, 0.5, 0]}
                    center
                    style={{ pointerEvents: 'none' }}
                    distanceFactor={6}
                >
                    <div className={cn(
                        "px-3 py-1.5 rounded-lg transition-all duration-300",
                        "bg-background/95 backdrop-blur-md shadow-lg",
                        "border whitespace-nowrap",
                        isActive || isHovered
                            ? "opacity-100 scale-110"
                            : "opacity-80 scale-100"
                    )}
                        style={{
                            borderColor: isActive || isHovered ? color : 'rgba(255,255,255,0.2)',
                            boxShadow: isActive || isHovered
                                ? `0 0 20px ${color}30`
                                : 'none'
                        }}>
                        <span className="text-lg mr-1.5">{getNoteIcon(note)}</span>
                        <span className={cn(
                            "text-sm font-semibold",
                            isActive || isHovered ? "text-foreground" : "text-muted-foreground"
                        )}>
                            {note}
                        </span>
                    </div>
                </Html>
            </group>
        </Float>
    );
}

// Enhanced Scene with better lighting
function Scene({
    topNotes,
    heartNotes,
    baseNotes,
    activeLevel,
    setActiveLevel,
    hoveredNote,
    setHoveredNote
}: {
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
    activeLevel: number | null;
    setActiveLevel: (level: number | null) => void;
    hoveredNote: string | null;
    setHoveredNote: (note: string | null) => void;
}) {
    const levelColors = ["#F59E0B", "#EC4899", "#8B5CF6"];

    return (
        <>
            {/* Premium Lighting Setup */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, 5, -10]} intensity={1.5} color="#D4AF37" />
            <pointLight position={[0, -10, 0]} intensity={0.8} color="#8B5CF6" />
            <spotLight
                position={[0, 15, 5]}
                angle={0.4}
                penumbra={1}
                intensity={2}
                color="#FFF8E7"
                castShadow
            />
            {/* Rim lights for dramatic effect */}
            <pointLight position={[5, 0, -5]} intensity={0.5} color="#EC4899" />
            <pointLight position={[-5, 0, 5]} intensity={0.5} color="#F59E0B" />

            <GlowingPyramid
                activeLevel={activeLevel}
                setActiveLevel={setActiveLevel}
                hoveredNote={hoveredNote}
                setHoveredNote={setHoveredNote}
            />

            {/* Top Notes Orbit - Outer ring */}
            {topNotes.map((note, i) => (
                <OrbitingNote
                    key={`top-${note}`}
                    note={note}
                    radius={4}
                    speed={0.15}
                    offset={(i / topNotes.length) * Math.PI * 2}
                    yPosition={1.2}
                    isActive={activeLevel === 0}
                    color={levelColors[0]}
                    onHover={setHoveredNote}
                    isHovered={hoveredNote === note}
                />
            ))}

            {/* Heart Notes Orbit - Middle ring */}
            {heartNotes.map((note, i) => (
                <OrbitingNote
                    key={`heart-${note}`}
                    note={note}
                    radius={4.5}
                    speed={0.12}
                    offset={(i / heartNotes.length) * Math.PI * 2}
                    yPosition={0}
                    isActive={activeLevel === 1}
                    color={levelColors[1]}
                    onHover={setHoveredNote}
                    isHovered={hoveredNote === note}
                />
            ))}

            {/* Base Notes Orbit - Inner ring */}
            {baseNotes.map((note, i) => (
                <OrbitingNote
                    key={`base-${note}`}
                    note={note}
                    radius={5}
                    speed={0.1}
                    offset={(i / baseNotes.length) * Math.PI * 2}
                    yPosition={-1.2}
                    isActive={activeLevel === 2}
                    color={levelColors[2]}
                    onHover={setHoveredNote}
                    isHovered={hoveredNote === note}
                />
            ))}

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.2}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI / 1.8}
                dampingFactor={0.05}
                enableDamping
            />
        </>
    );
}

// Loading placeholder with premium animation
function LoadingPlaceholder() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <motion.div
                className="w-20 h-20 border-2 border-primary/30 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm text-muted-foreground animate-pulse">Loading 3D Experience...</p>
        </div>
    );
}

// Main Component
interface ScentPyramid3DProps {
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
    className?: string;
}

export function ScentPyramid3D({
    topNotes,
    heartNotes,
    baseNotes,
    className,
}: ScentPyramid3DProps) {
    const [activeLevel, setActiveLevel] = useState<number | null>(null);
    const [hoveredNote, setHoveredNote] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const levels = [
        { label: "Top Notes", description: "First impression • 15-30 min", color: "#F59E0B", notes: topNotes },
        { label: "Heart Notes", description: "The soul • 2-4 hours", color: "#EC4899", notes: heartNotes },
        { label: "Base Notes", description: "The foundation • 6+ hours", color: "#8B5CF6", notes: baseNotes },
    ];

    return (
        <div className={cn("relative", className)}>
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <span className="text-overline text-primary mb-2 block">The Composition</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                    Scent Architecture
                </h2>
                <p className="text-muted-foreground text-base max-w-lg mx-auto">
                    An olfactory journey through three harmonious layers.
                    Explore each tier to discover the notes within.
                </p>
            </motion.div>

            {/* LARGE 3D Canvas - Full Width Focal Point */}
            <motion.div
                className="relative w-full h-[550px] md:h-[650px] lg:h-[700px] rounded-3xl overflow-hidden hover:cursor-grab border-2 border-primary/10 dark:border-primary/20 bg-muted/30 dark:bg-transparent shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Gradient Background - Enhanced for light mode */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-muted/20 to-background/80" />
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-3xl border border-primary/20 shadow-2xl shadow-primary/10" />

                {isClient ? (
                    <Suspense fallback={<LoadingPlaceholder />}>
                        <Canvas
                            camera={{ position: [0, 3, 12], fov: 40 }}
                            style={{ background: "transparent" }}
                            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                            dpr={[1, 2]}
                        >
                            <Scene
                                topNotes={topNotes}
                                heartNotes={heartNotes}
                                baseNotes={baseNotes}
                                activeLevel={activeLevel}
                                setActiveLevel={setActiveLevel}
                                hoveredNote={hoveredNote}
                                setHoveredNote={setHoveredNote}
                            />
                        </Canvas>
                    </Suspense>
                ) : (
                    <LoadingPlaceholder />
                )}

                {/* Interaction hint */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="text-xl">
                        <Hand className="w-5 h-5" />
                    </span>
                    <span className="text-sm text-muted-foreground">Drag to rotate • Hover to explore</span>
                </motion.div>
            </motion.div>

            {/* Bottom Legend - Clean horizontal layout */}
            <motion.div
                className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                {levels.map((level, index) => (
                    <motion.div
                        key={level.label}
                        className={cn(
                            "flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer",
                            "bg-card/50 backdrop-blur-sm hover:bg-card/80",
                            activeLevel === index
                                ? "shadow-lg scale-105"
                                : "hover:scale-102"
                        )}
                        style={{
                            borderColor: activeLevel === index ? level.color : 'transparent',
                            boxShadow: activeLevel === index ? `0 0 25px ${level.color}30` : 'none'
                        }}
                        onMouseEnter={() => setActiveLevel(index)}
                        onMouseLeave={() => setActiveLevel(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div
                            className="w-4 h-4 rounded-full shadow-inner"
                            style={{
                                backgroundColor: level.color,
                                boxShadow: `0 0 10px ${level.color}60`
                            }}
                        />
                        <div>
                            <p className="text-sm font-bold text-foreground">{level.label}</p>
                            <p className="text-xs text-muted-foreground">{level.description}</p>
                        </div>
                        <div className="flex -space-x-1 ml-2">
                            {level.notes.slice(0, 3).map((note, i) => (
                                <span
                                    key={note}
                                    className="text-base bg-background rounded-full w-7 h-7 flex items-center justify-center border border-border/50 shadow-sm"
                                    title={note}
                                >
                                    {getNoteIcon(note)}
                                </span>
                            ))}
                            {level.notes.length > 3 && (
                                <span className="text-xs bg-muted text-muted-foreground rounded-full w-7 h-7 flex items-center justify-center border border-border/50">
                                    +{level.notes.length - 3}
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

// Alias for backwards compatibility
export { ScentPyramid3D as ScentPyramid };

// Compact version for cards
interface ScentNotesCompactProps {
    notes: string[];
    className?: string;
}

export function ScentNotesCompact({ notes, className }: ScentNotesCompactProps) {
    return (
        <div className={cn("flex items-center gap-1.5", className)}>
            {notes.slice(0, 4).map((note) => (
                <span key={note} className="text-sm" title={note}>
                    {getNoteIcon(note)}
                </span>
            ))}
            {notes.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">+{notes.length - 4}</span>
            )}
        </div>
    );
}
