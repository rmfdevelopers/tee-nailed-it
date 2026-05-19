'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Palette, 
  ShieldCheck, 
  Zap, 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Heart, 
  Users, 
  Scissors, 
  Truck, 
  Instagram,
  Menu,
  X,
  ImageOff
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-QUOTE
// Typography Personality: mono-accent

// --- DATA ---
const brand = {
  name: "Tee Nailed It",
  tagline: "Modern Artistry for the Lagos Woman",
  description: "Premium nail studio based in Lagos specializing in Acrylic, BIAB, and bespoke custom press-ons for the trend-conscious client.",
  industry: "beauty",
  region: "nigeria",
  currency: "₦"
};

const contact = {
  instagram: "tee.nailedit",
  address: "Gbagada / Shomolu, Lagos, Nigeria",
  whatsapp: ""
};

const products = [
  { name: "Acrylic Full Set", description: "Strength and length with premium finish and custom nail art options.", price: "₦15,000", url: "https://images.unsplash.com/photo-1609309267394-9d7b8e01bfe0" },
  { name: "BIAB Overlay", description: "Builder In A Bottle for natural nail strength and growth support.", price: "₦12,500", url: "https://images.unsplash.com/photo-1631212006469-95f300cb8955" },
  { name: "Custom Press-on Kit", description: "Reusable salon-quality nails designed to your exact size and style.", price: "₦10,000", url: "https://images.unsplash.com/photo-1719494206679-24a205905578" },
  { name: "Gel-X Extensions", description: "Soft gel nail extension system for a lightweight, natural feel.", price: "₦18,000", url: "https://images.unsplash.com/photo-1590999893636-503380c789a3" }
];

const features = [
  { title: "Bespoke Design", description: "Every set is a unique canvas tailored to your aesthetic.", icon: Palette },
  { title: "Lasting Quality", description: "Using high-grade pigments and bonding agents for 4+ weeks of wear.", icon: ShieldCheck },
  { title: "Express Service", description: "Modern techniques like Gel-X for faster, flawless appointments.", icon: Zap },
  { title: "Mobile Kits", description: "Nationwide shipping for our luxury custom press-on collections.", icon: Package }
];

const testimonials = [
  { name: "Eniola Balogun", text: "Best BIAB in Lagos! My natural nails have never been this strong or healthy.", role: "Regular Client" },
  { name: "Chiamaka Okoro", text: "The custom press-ons were a lifesaver for my wedding. Perfect fit and so sturdy.", role: "Creative Director" },
  { name: "Tolu Adeyemi", text: "Love the Gbagada studio vibes. Professional service and the art is always 10/10.", role: "Fashion Stylist" }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1652869122685-c7792ef56ee2",
  "https://images.unsplash.com/photo-1610977800691-37674b48df03",
  "https://images.unsplash.com/photo-1631212006469-95f300cb8955",
  "https://images.unsplash.com/photo-1722262363236-4f7dd2f2462a",
  "https://images.unsplash.com/photo-1590999893636-503380c789a3",
  "https://images.unsplash.com/photo-1610992015732-2449b76344bc"
];

// --- HOOKS ---
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
  }, [threshold]);
  return { ref, isVisible };
};

// --- COMPONENTS ---
function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/20 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg text-primary font-black text-xl">T</div>
          <span className="font-heading font-black text-xl tracking-tight text-white group-hover:text-secondary transition-colors">Tee Nailed It</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          {['Gallery', 'Services', 'Process', 'Booking'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white/70 hover:text-accent transition-colors">{item}</a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold hover:brightness-110 transition shadow-lg">Book Session</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-primary z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <span className="font-heading font-black text-xl">Tee Nailed It</span>
          <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col p-12 gap-8 text-3xl font-heading font-bold italic">
          {['Gallery', 'Services', 'Process', 'Booking'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)}>{item}</a>
          ))}
          <a href="#contact" onClick={() => setMobileMenu(false)} className="text-accent">Book Now</a>
        </div>
      </div>
    </nav>
  );
};

const ContactForm = () => {
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
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary/10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40 relative z-10">
          <CheckCheck size={32} className="text-accent" />
        </div>
        <h3 className="font-heading text-3xl font-black text-white mb-3 relative z-10">Artistry Confirmed</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10">Thank you. We will get back to you shortly to secure your session.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-primary/40 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold text-white mb-8">Secure Your Slot</h3>
        <div className="space-y-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input key={field} type={field === 'email' ? 'email' : 'text'} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]} onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))} required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none transition-all focus:bg-white/10 focus:border-accent"
            />
          ))}
          <textarea rows={4} placeholder="Your desired service (e.g., Acrylic Set with Art)" value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none resize-none transition-all focus:bg-white/10 focus:border-accent"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-accent text-primary py-4 rounded-xl font-black text-base hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3 group">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Book Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </form>
  );
};

export default function Page() {
  const heroReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      <Navbar />

      {/* HERO - Variant HR-C */}
      <section id="hero" ref={heroReveal.ref} className="min-h-screen grid md:grid-cols-[1fr_1.1fr] items-stretch bg-primary overflow-hidden">
        <div className={`flex flex-col justify-center px-8 md:px-20 py-32 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-80">Street-Luxe Artistry</span>
          <h1 className="font-heading text-6xl md:text-[5.5rem] font-black text-white leading-[0.9] tracking-tighter">
            Elevate Your <span className="text-secondary italic">Every</span> Touch
          </h1>
          <p className="text-white/60 mt-8 text-xl max-w-md leading-relaxed font-light">
            Expert nail artistry in Gbagada. From healthy BIAB overlays to custom premium press-ons, we create the vibes you wear.
          </p>
          <div className="flex gap-6 mt-12">
            <a href="#contact" className="bg-accent text-primary px-10 py-4 font-black text-lg rounded-full hover:scale-105 transition-all shadow-xl">Book Session</a>
            <a href="#services" className="border border-white/20 text-white px-10 py-4 font-bold rounded-full hover:bg-white/10 transition-all">Service Menu</a>
          </div>
          <div className="mt-20 flex gap-12 border-t border-white/10 pt-10">
            <div>
              <p className="font-heading text-4xl font-black text-white">2k+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Sets Nailed</p>
            </div>
            <div>
              <p className="font-heading text-4xl font-black text-white">500+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Happy Clients</p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full">
          <SafeImage src="https://images.unsplash.com/photo-1610992015732-2449b76344bc" alt="Tee Nailed It Artistry" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/10 to-transparent" />
          <div className="absolute bottom-10 right-10 flex flex-col items-end">
            <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md animate-float">
               <Palette className="text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY - Custom Parallax Drift */}
      <section id="gallery" ref={galleryReveal.ref} className="py-28 bg-secondary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
          <p className="text-accent/60 font-mono text-xs tracking-widest mb-4 uppercase">Latest Drops</p>
          <h2 className="font-heading text-5xl font-black text-white">The Portfolio</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-7xl mx-auto">
          {galleryImages.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl aspect-[4/5] group transition-all duration-1000 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <SafeImage src={img} alt="Nail Art Design" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 parallax-drift" />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="font-heading font-bold text-white text-xl">Bespoke Design</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER - D-QUOTE */}
      <div className="py-24 px-8 text-center bg-accent/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--secondary)/5,transparent_70%)]" />
        <p className="relative font-heading text-3xl md:text-5xl font-black text-white max-w-4xl mx-auto leading-tight italic">
          &ldquo;Modern Artistry for the Lagos Woman.&rdquo;
        </p>
        <p className="relative text-white/30 mt-6 text-xs tracking-[0.5em] uppercase">Tee Nailed It Studio</p>
      </div>

      {/* SERVICES - Variant V4 (Staggered Children) */}
      <section id="services" ref={servicesReveal.ref} className="py-28 bg-primary px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="font-heading text-6xl font-black text-white">Service Menu</h2>
            <p className="text-white/40 max-w-xs text-lg font-light">Premium care for your hands, powered by health-first techniques.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <div key={i} style={{ transitionDelay: `${i * 120}ms` }} className={`group p-6 rounded-3xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all duration-700 ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                  <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-accent text-sm font-bold uppercase tracking-widest">{brand.currency}{p.price.split('₦')[1]}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">{p.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{p.description}</p>
                <a href="#contact" className="inline-flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest border-b border-accent/20 pb-1 hover:border-accent transition-all">Order Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - Variant V9 (Counter Rise) */}
      <section id="process" ref={processReveal.ref} className="py-28 bg-secondary text-primary px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-black mb-16">Custom Press-On Order</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px border-t-2 border-primary/10 border-dashed" />
            {[
              { n: "01", t: "Measure", d: "Use our easy guide to find your perfect fit from home." },
              { n: "02", t: "Inspo", d: "Upload your design ideas or choose from our drops." },
              { n: "03", t: "Slay", d: "Sharp delivery, nationwide. Your kit arrives in 3-5 days." }
            ].map((s, i) => (
              <div key={i} style={{ transitionDelay: `${i * 200}ms` }} className={`relative transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-20 h-20 bg-primary text-secondary rounded-full flex items-center justify-center font-heading text-3xl font-black mx-auto mb-6 shadow-xl">{s.n}</div>
                <h3 className="font-heading text-2xl font-bold mb-3">{s.t}</h3>
                <p className="opacity-70 leading-relaxed font-medium">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-wrap justify-center gap-10 border-t border-primary/10 pt-10">
            <div className="flex items-center gap-4">
              <Scissors className="text-primary/40" />
              <div className="text-left">
                <p className="font-heading text-xl font-black">100%</p>
                <p className="text-xs uppercase tracking-widest opacity-50">Customized</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Truck className="text-primary/40" />
              <div className="text-left">
                <p className="font-heading text-xl font-black">3-5 Days</p>
                <p className="text-xs uppercase tracking-widest opacity-50">Nationwide Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Variant V2 (Scale Reveal) */}
      <section id="booking" ref={featuresReveal.ref} className="py-28 bg-primary px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <h2 className="font-heading text-5xl font-black text-white mb-8">Why Tee Nailed It</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="space-y-3 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                    <f.icon size={24} />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white">{f.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square relative rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1631212006469-95f300cb8955" alt="Nail Studio Interior" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Variant V7 (Blur Cascade) */}
      <section ref={testimonialsReveal.ref} className="py-28 bg-secondary/5 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-heading text-5xl font-black text-white">Client Love</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} style={{ transitionDelay: `${i * 100}ms` }} className={`bg-primary p-8 rounded-[2rem] border border-white/10 transition-all duration-1000 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-md'}`}>
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
              </div>
              <p className="text-white/80 text-lg leading-relaxed italic mb-8">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-black font-heading text-xl">{t.name.charAt(0)}</div>
                <div className="text-left">
                  <p className="font-bold text-white leading-none">{t.name}</p>
                  <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT - Variant V3 (Horizontal Split) */}
      <section ref={aboutReveal.ref} className="py-28 bg-primary overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl font-black text-white mb-8">Meet the Tech</h2>
            <div className="w-20 h-1 bg-accent mb-8" />
            <p className="text-white/60 text-xl leading-relaxed font-light mb-10">
              Tee Nailed It is a boutique nail studio serving Gbagada and Shomolu. We believe nails are the ultimate accessory, blending street-luxe style with professional health-first techniques.
            </p>
            <div className="flex gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-accent mb-3">
                  <Heart size={24} />
                </div>
                <p className="text-xs uppercase tracking-widest font-bold opacity-40">Detail Oriented</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-accent mb-3">
                  <Users size={24} />
                </div>
                <p className="text-xs uppercase tracking-widest font-bold opacity-40">Community Led</p>
              </div>
            </div>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
             <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <SafeImage src="https://images.unsplash.com/photo-1652868771337-0821db91da16" alt="Studio Vibe" fill className="object-cover" />
                <div className="absolute inset-0 bg-primary/30" />
             </div>
             <div className="absolute -top-6 -right-6 bg-accent text-primary p-6 rounded-2xl shadow-xl">
                <p className="font-heading font-black text-4xl">5★</p>
                <p className="text-xs font-bold uppercase tracking-widest">Lagos Rated</p>
             </div>
          </div>
        </div>
      </section>

      {/* CONTACT - Variant C3 */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-accent/5">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 opacity-60">Session Booking</p>
          <h2 className="font-heading text-6xl font-black text-white mb-6">Secure Your Slot</h2>
          <p className="text-white/40 mb-14 text-xl font-light">Join the list of Lagos women wearing the ultimate accessory.</p>
          <div className="text-left">
            <ContactForm />
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 text-white/50">
              <MapPin size={20} className="text-accent/40" />
              <span className="text-sm">Gbagada / Shomolu, Lagos</span>
            </div>
            <a href="https://instagram.com/tee.nailedit" className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors">
              <Instagram size={20} className="text-accent/40" />
              <span className="text-sm">@tee.nailedit</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-primary border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-left">
               <h3 className="font-heading font-black text-2xl mb-2">Tee Nailed It</h3>
               <p className="text-white/30 text-sm max-w-xs">{brand.tagline}</p>
            </div>
            <div className="flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#booking" className="hover:text-white transition-colors">Booking</a>
            </div>
            <div className="flex gap-4">
               <a href={`https://instagram.com/${contact.instagram}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                 <Instagram size={18} />
               </a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            <p>&copy; {new Date().getFullYear()} Tee Nailed It Studio. Lagos, NG.</p>
            <div className="flex gap-6">
              <span>Privacy</span>
              <span>Terms of Art</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}