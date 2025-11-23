"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { NotesFilter } from "@/components/ui/notes-filter";
import { PERFUMES } from "@/data/perfumes";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  // Filter perfumes based on selected note
  const filteredPerfumes = selectedNote
    ? PERFUMES.filter((p) => p.notes.includes(selectedNote))
    : PERFUMES;

  // Get unique notes for the filter
  const allNotes = Array.from(new Set(PERFUMES.flatMap((p) => p.notes))).slice(0, 8);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1666182951901-0b99915e189d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwcGVyZnVtZSUyMGdvbGQlMjBwb2RpdW18ZW58MHx8MHx8fDA%3D"
            alt="Luxury Perfume Background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeInUp}
              className="block text-primary uppercase tracking-[0.2em] mb-4 text-sm font-medium"
            >
              Est. 2024 • Night Bazaar Collection
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6 text-foreground drop-shadow-lg"
            >
              Scents of the <br />
              <span className="text-primary italic drop-shadow-md">Unknown</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed drop-shadow-md font-medium"
            >
              Discover a curated selection of rare, artisanal fragrances inspired by the
              mysteries of the night.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-none shadow-[0_0_20px_-5px_rgba(224,182,129,0.3)] hover:shadow-[0_0_30px_-5px_rgba(224,182,129,0.5)] transition-shadow"
              >
                Shop Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 rounded-none backdrop-blur-sm bg-background/10"
              >
                Discover Your Scent
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Curated Collections</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Oud & Amber", image: "https://images.unsplash.com/photo-1737920459846-2d0318700658?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwcGVyZnVtZSUyMGRhcmt8ZW58MHx8MHx8fDA%3D" },
              { title: "Floral Noir", image: "https://images.unsplash.com/photo-1759794108525-94ff060da692?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwcGVyZnVtZSUyMGRhcmt8ZW58MHx8MHx8fDA%3D" },
              { title: "Spiced Woods", image: "https://images.unsplash.com/photo-1759793499938-904b23d7ddae?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww" },
            ].map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group relative h-[400px] overflow-hidden cursor-pointer border border-transparent hover:border-primary/30 transition-colors duration-500"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-8 pb-12">
                  <h3 className="text-3xl font-serif text-white mb-2 translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-lg">
                    {collection.title}
                  </h3>
                  <span className="text-sm uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 font-medium">
                    Explore Collection
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers & Notes Explorer */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-2">Explore by Note</h2>
            <p className="text-muted-foreground">Filter our collection by your favorite scents.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/collection" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group">
              View All Perfumes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredPerfumes.slice(0, 8).map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] w-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1630512873749-85ccf5bb1678?fm=jpg&q=60&w=1000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww"
                alt="Perfume Craftsmanship"
                fill
                className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-background border border-primary p-4 flex items-center justify-center text-center hidden md:flex">
                <span className="font-serif text-xl italic text-primary">
                  &quot;Scent is the brother of breath.&quot;
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary uppercase tracking-widest text-sm font-medium mb-4 block">
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Crafted for the <br />
                <span className="italic text-muted-foreground">Nocturnal Soul</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                L&apos;Obscur was born from a desire to capture the fleeting magic of the night.
                We believe that perfume is not just an accessory, but a narrative—a silent
                story told on the skin.
              </p>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Our ingredients are sourced from the most remote corners of the world,
                blended by master perfumers who understand that true luxury lies in the
                details.
              </p>
              <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none px-8">
                Read Our Story
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-16">Whispers from our Patrons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "A fragrance that stops time. Absolutely mesmerizing.", author: "Elena R." },
            { text: "The depth of the oud in Midnight Saffron is unlike anything I've ever smelled.", author: "Marcus T." },
            { text: "Finally, a perfume house that understands the art of subtlety and power.", author: "Sarah L." },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-card p-8 border border-border/50 hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex justify-center gap-1 text-primary mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg font-serif italic text-muted-foreground mb-6">&quot;{testimonial.text}&quot;</p>
              <span className="text-sm uppercase tracking-widest text-foreground font-medium">— {testimonial.author}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
