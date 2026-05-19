'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Heart, 
  Palette, 
  Zap, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  Layers,
  Smile,
  CheckCircle2
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-accent/40 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const DividerRule = ({ brand }: { brand: any }) => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    <span className="text-primary font-heading italic text-sm tracking-[0.2em] uppercase whitespace-nowrap opacity-70">
      {brand.name}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
  </div>
);

// --- Content Data ---

const brief = {
  brand: {
    name: "Tee Nailed It",
    tagline: "Flawless Artistry for the Modern Muse",
    description: "Lagos' premier destination for precision acrylics, BIAB, and bespoke press-on designs. We don't just do nails; we craft confidence in every set.",
    industry: "beauty",
    region: "nigeria"
  },
  colors: {
    primary: "#D81B60",
    secondary: "#FFF1F6",
    accent: "#1A1A1A"
  },
  contact: {
    instagram: "tee.nailedit",
    address: "Gbagada & Shomolu, Lagos, Nigeria"
  },
  heroImage: {
    url: "https://images.unsplash.com/photo-1637224230586-efe8e4aef924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  products: [
    { name: "Full Set Acrylics", price: "₦15,000", description: "Expertly sculpted extensions with premium acrylic.", url: "https://images.unsplash.com/photo-1777287216958-84144739db83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { name: "BIAB Strengthening", price: "₦12,500", description: "Builder In A Bottle overlay for natural growth.", url: "https://images.unsplash.com/photo-1647341993366-6cfef02aeb6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { name: "Custom Press-On Kit", price: "₦10,000", description: "Reusable, hand-painted luxury nails tailored for you.", url: "https://images.unsplash.com/photo-1719494206679-24a205905578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { name: "Gel-X Extensions", price: "₦14,500", description: "Soft-gel extension system for a lightweight feel.", url: "https://images.unsplash.com/photo-1630843599725-32ead7671867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
  ],
  features: [
    { title: "Precision Artistry", description: "Clean cuticles and perfect apex placement.", icon: Sparkles },
    { title: "Nail Health First", description: "High-quality products for your nail integrity.", icon: Heart },
    { title: "Bespoke Designs", description: "From minimalist swirls to complex 3D art.", icon: Palette },
    { title: "Fast Turnaround", description: "Efficient luxury for the busy woman.", icon: Zap }
  ],
  testimonials: [
    { name: "Tolu Agbaje", text: "The neatest acrylic set I've ever had in Lagos. My cuticles are obsessed!", role: "Regular Client" },
    { name: "Chinaza Okafor", text: "Her BIAB helped my natural nails grow so long. Best tech in Gbagada.", role: "Fashion Stylist" },
    { name: "Funmi Adeyemi", text: "The custom press-ons look exactly like salon extensions!", role: "Content Creator" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1610977800691-37674b48df03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1669058611053-ff24fb0f1c33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1647341993366-6cfef02aeb6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1564564697030-676227ac3981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ],
  process: [
    { number: "01", title: "Inspiration", description: "Send us your design ideas or mood board." },
    { number: "02", title: "Sizing", description: "Use our simple sizing guide for a perfect fit." },
    { number: "03", title: "Creation", description: "We hand-paint your set with salon-grade products." },
    { number: "04", title: "Delivery", description: "Receive your kit with application tools included." }
  ],
  stats: [
    { number: "500+", label: "Sets Created", icon: Layers },
    { number: "100%", label: "Slay Rate", icon: Smile },
    { number: "2", label: "Lagos Locations", icon: MapPin }
  ]
};

// --- Page Sections ---

export default function Site() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-accent/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-heading font-black text-xl rounded-lg group-hover:rotate-6 transition-transform">
              TN
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block tracking-tighter uppercase">Tee Nailed It</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Gallery', 'Press-Ons'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest text-white/70">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
              Book Your Set
            </a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[110] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-accent p-10 flex flex-col shadow-2xl">
          <button className="self-end text-white mb-10" onClick={() => setMobileMenu(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Services', 'Gallery', 'Press-Ons'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-2xl font-heading font-bold text-white hover:text-primary" onClick={() => setMobileMenu(false)}>
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-white py-4 rounded-xl font-bold text-center mt-10" onClick={() => setMobileMenu(false)}>
              Book Your Set
            </a>
          </div>
          <div className="mt-auto border-t border-white/10 pt-10">
            <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Lagos, Nigeria</p>
            <div className="flex gap-4">
              <Instagram size={24} className="text-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - HR-A Variant */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center bg-accent px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-4xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-2 scale-110">
          <SafeImage src={brief.heroImage.url} alt="Luxury Nail Art" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic animate-slideUp">
            Flawless <br /> <span className="text-primary">Artistry</span>
          </h1>
          <p className="text-white/50 mt-10 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '400ms' }}>
            {brief.brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-14 animate-fadeIn" style={{ animationDelay: '800ms' }}>
            <a href="#contact" className="bg-primary text-white px-12 py-5 font-bold text-lg hover:brightness-110 hover:scale-105 transition-all rounded-full shadow-2xl shadow-primary/20">
              Book Your Set
            </a>
            <a href="#services" className="border border-white/20 text-white px-12 py-5 font-medium text-lg hover:bg-white/5 transition-all rounded-full backdrop-blur-md">
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Features - F-ICON-GRID */}
      <section className="py-28 px-6 bg-accent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brief.features.map((f, i) => (
              <FeatureCard key={i} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      <DividerRule brand={brief.brand} />

      {/* Gallery Section - Masonry/Portfolio */}
      <section id="gallery" className="py-28 px-6 bg-secondary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase leading-none mb-6">
                The <span className="text-primary italic">Portfolio</span>
              </h2>
              <p className="text-white/40 text-lg">Every set is a masterpiece. Recent curation from our Lagos studios.</p>
            </div>
            <a href={`https://instagram.com/${brief.contact.instagram}`} className="text-primary font-bold border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
              Follow @{brief.contact.instagram}
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brief.gallery.map((src, i) => (
              <GalleryItem key={i} src={src} index={i} />
            ))}
          </div>
        </div>
      </section>

      <DividerRule brand={brief.brand} />

      {/* Services Section - P-ASYMMETRIC */}
      <section id="services" className="py-28 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Service Menu</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 group relative rounded-3xl overflow-hidden h-[500px]">
              <SafeImage src={brief.products[0].url} alt={brief.products[0].name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="bg-primary text-white text-xs font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">Best Seller</span>
                <h3 className="font-heading text-4xl font-bold text-white mb-2">{brief.products[0].name}</h3>
                <p className="text-white/60 max-w-sm mb-6">{brief.products[0].description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-primary">{brief.products[0].price}</span>
                  <a href="#contact" className="bg-white text-accent px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">Order</a>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 grid gap-6">
              {brief.products.slice(1, 3).map((p, i) => (
                <div key={i} className="bg-secondary/5 rounded-3xl p-8 border border-white/5 flex flex-col justify-between group hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white group-hover:text-primary transition-colors">{p.name}</h3>
                      <p className="text-white/40 mt-2 text-sm">{p.description}</p>
                    </div>
                    <span className="text-xl font-black text-white/80">{p.price}</span>
                  </div>
                  <a href="#contact" className="mt-8 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                    Book Service <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Bonus */}
      <section id="press-ons" className="py-28 px-6 bg-secondary/5 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">The Process</h2>
            <p className="text-primary font-mono text-sm uppercase tracking-widest">Sharp delivery, nationwide.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {brief.process.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* About & Stats - Horizontal Split */}
      <section className="py-28 px-6 bg-accent border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-none mb-8 uppercase">
              The Artist <br /> <span className="text-primary italic">Behind the Art</span>
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-10">
              Based in Gbagada, Tee Nailed It was born out of a passion for transforming nails into wearable art. We believe every set tells a story, and we're here to make yours unforgettable.
            </p>
            <div className="flex flex-col gap-6">
              {brief.stats.map((s, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <s.icon size={28} />
                  </div>
                  <div>
                    <p className="font-heading text-3xl font-black text-white">{s.number}</p>
                    <p className="text-white/40 uppercase tracking-widest text-xs font-bold">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative aspect-square w-full">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/30 rounded-3xl" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1610977800691-37674b48df03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Studio" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - T-SLIDER */}
      <section className="py-28 bg-accent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Client Love</h2>
        </div>
        <div className="w-full flex gap-6 overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...brief.testimonials, ...brief.testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-secondary/5 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(n => <Sparkles key={n} size={14} className="text-primary" fill="currentColor" />)}
                  </div>
                  <p className="text-white/80 text-xl font-medium leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/5">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - C1 Variant */}
      <section id="contact" className="py-28 px-6 bg-accent relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start relative z-10">
          <div className="sticky top-32">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none uppercase mb-8">
              Secure <br /> Your <span className="text-primary italic">Slot</span>
            </h2>
            <p className="text-white/50 text-xl max-w-sm mb-12">Experience the best in Gbagada. We are currently booking for this month.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Instagram</p>
                  <p className="text-white font-bold">@{brief.contact.instagram}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Location</p>
                  <p className="text-white font-bold">{brief.contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-accent border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-primary text-white flex items-center justify-center font-heading font-black text-2xl rounded-xl mb-8">
            TN
          </div>
          <h2 className="font-heading text-4xl font-bold text-white mb-2 uppercase tracking-tighter">Tee Nailed It</h2>
          <p className="text-white/40 uppercase tracking-[0.4em] text-xs font-bold mb-10 italic">Flawless Artistry for the Modern Muse</p>
          
          <div className="flex gap-10 mb-16">
            {['Services', 'Gallery', 'Press-Ons'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-xs uppercase tracking-widest font-bold text-white/60 hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
          
          <div className="flex flex-col md:flex-row justify-between w-full text-white/30 text-[10px] uppercase tracking-widest font-bold gap-4">
            <p>© {new Date().getFullYear()} TEE NAILED IT STUDIO. ALL RIGHTS RESERVED.</p>
            <p>LAGOS, NIGERIA. SHARP DELIVERY, NATIONWIDE.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// --- Sub-components ---

function FeatureCard({ f, index }: { f: any, index: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`bg-white/3 p-8 rounded-3xl border border-white/5 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all" />
      <div className="mb-6 text-primary group-hover:scale-110 transition-transform">
        <f.icon size={32} />
      </div>
      <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
    </div>
  );
}

function GalleryItem({ src, index }: { src: string, index: number }) {
  const { ref, isVisible } = useScrollReveal(0.05);
  return (
    <div 
      ref={ref}
      className={`relative aspect-[3/4] rounded-2xl overflow-hidden group ${isVisible ? 'animate-clipReveal' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <SafeImage 
        src={src} 
        alt={`Nail Art ${index + 1}`} 
        fill 
        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
      />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent scale-50 group-hover:scale-100 transition-transform duration-500">
          <Sparkles size={20} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ step, index }: { step: any, index: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${index * 200}ms` }}
      className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="font-heading text-[5rem] font-black text-white/5 leading-none absolute -top-12 -left-4 italic">
        {step.number}
      </div>
      <div className="relative z-10 pt-4">
        <h3 className="font-heading text-2xl font-bold text-white mb-3 flex items-center gap-3">
          {step.title}
          <div className="w-2 h-2 rounded-full bg-primary" />
        </h3>
        <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-secondary/5 rounded-[3rem] border border-primary/20 shadow-2xl relative overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/40 relative z-10 animate-float">
          <CheckCheck size={40} className="text-primary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Slot Secured!</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10">Thank you. Tee will reach out via WhatsApp/DM to confirm your session details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/5 p-10 sm:p-14 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-10 uppercase tracking-tighter italic">Session Inquiry</h3>
        <div className="space-y-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className="relative group">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 group-hover:border-white/20"
              />
            </div>
          ))}
          <div className="relative group">
            <textarea 
              rows={4} 
              placeholder="Your inspiration or service request"
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 group-hover:border-white/20"
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:brightness-110 hover:shadow-[0_0_30px_rgba(216,27,96,0.3)] transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group uppercase tracking-[0.2em]"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>
          )}
        </button>
        <p className="text-center mt-6 text-white/20 text-[10px] uppercase font-bold tracking-widest">We typically respond within 2-4 business hours.</p>
      </div>
    </form>
  );
}