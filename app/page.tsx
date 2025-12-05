"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants, useInView } from "framer-motion";
import { ArrowRight, Star, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { NotesFilter } from "@/components/ui/notes-filter";
import { PERFUMES } from "@/data/perfumes";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Filter perfumes based on selected note
  const filteredPerfumes = selectedNote
    ? PERFUMES.filter((p) => p.notes.includes(selectedNote))
    : PERFUMES;

  // Get unique notes for the filter
  const allNotes = Array.from(new Set(PERFUMES.flatMap((p) => p.notes))).slice(0, 10);

  // Get featured perfumes (with badges)
  const featuredPerfumes = PERFUMES.filter((p) => p.badge);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic & Immersive
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Parallax Background Images */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          {/* Dark Mode Image */}
          <div className="hidden dark:block absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1592914637125-28479601c75a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?fm=jpg&q=80&w=3000&ixlib=rb-4.1.0"
              // src="https://images.unsplash.com/photo-1666182951901-0b99915e189d?fm=jpg&q=80&w=3000&ixlib=rb-4.1.0"
              alt="Luxury Perfume Dark"
              fill
              style={{ transform: "scaleX(-1)" }}
              className="object-cover"
              priority
            />
            {/* Luxurious gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
            {/* Gold ambient glow */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-60" />
          </div>

          {/* Light Mode Image */}
          <div className="block dark:hidden absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1584111703185-efa00bd475f6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2500&auto=format&fit=crop"
              // src="https://images.unsplash.com/photo-1712995518741-dafb700b602f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2500&auto=format&fit=crop"
              // src="https://images.unsplash.com/photo-1543422018-9a1c40cf955d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2500&auto=format&fit=crop"
              // src="https://images.unsplash.com/photo-1611066527948-893f0aecdb79?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2500&auto=format&fit=crop"
              // src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2500&auto=format&fit=crop"
              alt="Luxury Perfume Light"
              fill
              className="object-cover"
              priority
            />
            {/* Elegant light overlays - reduced intensity for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F1]/60 via-[#FAF8F3]/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-transparent to-transparent opacity-10" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="container mx-auto px-4 relative z-10 pt-24 pb-12"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            {/* Overline */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8 drop-shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-overline text-primary font-semibold">
                Est. 2024 • Artisanal Parfumerie
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeInUp} className="mb-8 drop-shadow-md">
              <span className="block text-foreground font-medium">Where Scent</span>
              <span className="block text-foreground font-medium">Becomes{" "}
                <span className="text-primary italic font-light">Art</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-foreground/80 mb-12 max-w-xl leading-relaxed drop-shadow-sm font-medium"
            >
              Discover rare, artisanal fragrances crafted for those who
              embrace the mysteries of midnight and the clarity of dawn.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/collection">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 rounded-full shadow-gold hover:shadow-lg transition-all duration-500 group"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background text-base px-8 py-6 rounded-full backdrop-blur-sm bg-background/5 transition-all duration-500"
              >
                Discover Your Scent
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          COLLECTIONS SECTION - Magazine Style Grid
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-overline text-primary mb-4 block">Curated For You</span>
            <h2 className="mb-6">Our Collections</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three distinct journeys through the world of fragrance, each telling its own story.
            </p>
          </motion.div>

          {/* Magazine-style asymmetric grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {[
              {
                title: "Oud & Amber",
                subtitle: "Deep, resinous, eternal",
                image: "https://images.unsplash.com/photo-1737920459846-2d0318700658?fm=jpg&q=60&w=800",
                span: "col-span-12 md:col-span-7 row-span-2",
                height: "h-[400px] md:h-[600px]",
              },
              {
                title: "Floral Noir",
                subtitle: "Blooms in shadows",
                image: "https://images.unsplash.com/photo-1759794108525-94ff060da692?fm=jpg&q=60&w=800",
                span: "col-span-12 md:col-span-5",
                height: "h-[280px]",
              },
              {
                title: "Spiced Woods",
                subtitle: "Warmth and mystery",
                image: "https://images.unsplash.com/photo-1759793499938-904b23d7ddae?fm=jpg&q=60&w=800",
                span: "col-span-12 md:col-span-5",
                height: "h-[280px]",
              },
            ].map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`${collection.span} ${collection.height} group relative overflow-hidden rounded-2xl cursor-pointer border-luxury-hover`}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-overline text-primary/80 mb-2 group-hover:text-primary transition-colors">
                    {collection.subtitle}
                  </span>
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:-translate-y-1 transition-transform duration-500">
                      {collection.title}
                    </h3>
                    <motion.div
                      className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS - Horizontal Scroll
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-overline text-primary mb-4 block">Handpicked</span>
              <h2>Featured Scents</h2>
            </div>
            <Link
              href="/collection"
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group underline-reveal"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredPerfumes.slice(0, 4).map((perfume, index) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard perfume={perfume} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EXPLORE BY NOTE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-overline text-primary mb-4 block">Your Preferences</span>
            <h2>Explore by Note</h2>
            <p className="text-muted-foreground mt-2">Filter our collection by your favorite scents.</p>
          </div>
          <Link
            href="/collection"
            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group underline-reveal"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="mb-12">
          <NotesFilter
            notes={allNotes}
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {filteredPerfumes.slice(0, 8).map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BRAND STORY - Editorial Style
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-card/30 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] md:h-[700px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1761329842950-f3551938e4da?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?fm=jpg&q=60&w=1000"
                  alt="Perfume Craftsmanship"
                  fill
                  className="object-cover rounded-2xl"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
              </div>

              {/* Floating quote card */}
              <motion.div
                className="absolute -bottom-8 -right-4 md:-right-12 w-64 md:w-80 p-6 bg-card border border-border rounded-xl shadow-luxury"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="font-serif text-lg italic text-foreground leading-relaxed mb-4">
                  &ldquo;Scent is the brother of breath.&rdquo;
                </p>
                <span className="text-overline text-muted-foreground">— Ancient Proverb</span>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-overline text-primary mb-6 block">Our Philosophy</span>
              <h2 className="mb-8">
                Crafted for the{" "}
                <span className="italic text-muted-foreground font-light">Nocturnal Soul</span>
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  L&apos;Obscur was born from a desire to capture the fleeting magic of the night.
                  We believe that perfume is not just an accessory, but a narrative—a silent
                  story told on the skin.
                </p>
                <p>
                  Our ingredients are sourced from the most remote corners of the world,
                  blended by master perfumers who understand that true luxury lies in the
                  details that remain unseen.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-8">
                {[
                  { value: "28", label: "Artisanal Scents" },
                  { value: "12", label: "Countries Sourced" },
                  { value: "100%", label: "Natural Essences" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="block text-4xl font-serif font-bold text-primary mb-1">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button
                  variant="outline"
                  className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background rounded-full px-8 py-6 transition-all duration-500"
                >
                  Read Our Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS - Premium Cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-overline text-primary mb-4 block">Voices</span>
          <h2>Whispers from our Patrons</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              text: "A fragrance that stops time. Absolutely mesmerizing. The way it unfolds on the skin is nothing short of poetic.",
              author: "Elena R.",
              role: "Fragrance Collector",
            },
            {
              text: "The depth of the oud in Midnight Saffron is unlike anything I've ever experienced. Pure olfactory art.",
              author: "Marcus T.",
              role: "Fashion Editor",
            },
            {
              text: "Finally, a perfume house that understands the art of subtlety and power. Each bottle tells a story.",
              author: "Sarah L.",
              role: "Creative Director",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group bg-card p-8 md:p-10 border border-border/30 rounded-2xl hover:border-primary/30 transition-all duration-500 hover:shadow-luxury"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-primary fill-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg font-serif italic text-foreground/90 mb-8 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div>
                <span className="block font-medium text-foreground">{testimonial.author}</span>
                <span className="text-sm text-muted-foreground">{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NEWSLETTER CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-6" />
            <h2 className="text-background mb-6">Join the Inner Circle</h2>
            <p className="text-background/70 mb-10 text-lg">
              Be the first to discover new releases, exclusive collections, and the stories behind our scents.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-primary transition-colors"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
