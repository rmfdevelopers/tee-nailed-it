'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Palette, 
  Diamond, 
  Truck, 
  Stars, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Menu, 
  X, 
  ImageOff,
  Heart,
  Users,
  Star
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-QUOTE
// Typography Personality: editorial

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

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/10 ${fallbackClassName ?? className ?? ''}`}>
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

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const brand = {
    name: "Tee Nailed It",
    tagline: "Redefining Luxury One Nail at a Time",
    description: "Lagos' premier destination for BIAB, GelX, and bespoke press-on artistry tailored for the modern feminine aesthetic.",
    industry: "beauty",
    region: "nigeria",
    accent: "#D4AF37"
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#products" },
    { name: "Gallery", href: "#gallery" },
    { name: "Custom Orders", href: "#process" },
    { name: "Book Now", href: "#contact" }
  ];

  // SECTION REVEALS
  const heroReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="text-2xl font-heading font-black tracking-tighter text-white">
            TEE NAILED IT<span className="text-accent">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium tracking-widest uppercase hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:block bg-accent text-primary px-7 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
            Book Now
          </a>

          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-heading font-bold text-white italic">
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-accent text-primary px-10 py-4 rounded-full font-black text-lg mt-4">
            Book Your Session
          </a>
        </div>
      </div>

      {/* HERO SECTION (HR-A) */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-accent/10 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[100px] pointer-events-none border border-accent/10" />
        
        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            Elevated<br/>Nail Artistry
          </h1>
          <p className="text-secondary/60 mt-10 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            From BIAB to bespoke Press-ons, we craft the sets that turn heads and define your style in the heart of Lagos.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">
            <a href="#contact" className="bg-accent text-primary px-12 py-5 font-black text-lg hover:scale-105 transition-all rounded-full shadow-2xl">
              Book Your Session
            </a>
            <a href="#products" className="border border-white/20 text-white px-12 py-5 font-bold text-lg hover:bg-white/10 transition-all rounded-full backdrop-blur-md">
              View Services
            </a>
          </div>
        </div>

        {/* Floating Decorative Orbs */}
        <div className="absolute top-1/2 left-10 animate-float opacity-30">
          <div className="w-4 h-4 rounded-full bg-accent" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float opacity-20 delay-1000">
          <div className="w-8 h-8 rounded-full bg-accent" />
        </div>
      </section>

      {/* D-QUOTE DIVIDER */}
      <div className="py-24 px-8 text-center bg-primary border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/0.05,transparent_70%)]" />
        <p className={`relative font-heading text-3xl md:text-5xl font-black text-white max-w-4xl mx-auto leading-tight italic`}>
          &ldquo;Redefining Luxury One Nail at a Time&rdquo;
        </p>
        <p className="relative text-accent/40 mt-6 text-xs tracking-[0.5em] uppercase font-bold">TEE NAILED IT STUDIO</p>
      </div>

      {/* GALLERY SECTION */}
      <section id="gallery" ref={galleryReveal.ref} className="py-32 px-6 bg-secondary text-primary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-6xl md:text-7xl font-black uppercase italic leading-none">The Lookbook</h2>
            <p className="text-primary/50 mt-4 text-xl tracking-widest uppercase font-bold">Portfolio of our most requested sets</p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out overflow-hidden ${galleryReveal.isVisible ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {[
              "https://images.unsplash.com/photo-1652869122685-c7792ef56ee2?q=80&w=1080",
              "https://images.unsplash.com/photo-1596740926849-2d473dee8d60?q=80&w=1080",
              "https://images.unsplash.com/photo-1691249938694-349c94bb8581?q=80&w=1080",
              "https://images.unsplash.com/photo-1631212006469-95f300cb8955?q=80&w=1080",
              "https://images.unsplash.com/photo-1669058611053-ff24fb0f1c33?q=80&w=1080",
              "https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?q=80&w=1080"
            ].map((src, i) => (
              <div key={i} className="group relative h-[450px] overflow-hidden rounded-2xl shadow-xl">
                <SafeImage src={src} alt={`Lookbook ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (F-ICON-GRID) */}
      <section ref={featuresReveal.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase italic">Studio Standards</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Stars className="text-accent" />, title: "Healthy Growth", desc: "Our BIAB treatments prioritize the health and integrity of your natural nails." },
              { icon: <Palette className="text-accent" />, title: "Bespoke Art", desc: "Every set is a unique canvas, from minimal chic to intricate hand-painted art." },
              { icon: <Diamond className="text-accent" />, title: "Premium Durability", desc: "Using only high-end products to ensure your manicure lasts up to 4 weeks." },
              { icon: <Truck className="text-accent" />, title: "Express Shipping", desc: "Nationwide delivery for our custom press-on sets across Nigeria." }
            ].map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`p-10 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all duration-500 group ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="font-heading font-bold text-white text-2xl uppercase italic">{f.title}</h3>
                <p className="text-secondary/40 text-sm mt-4 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (P-STAGGER) */}
      <section id="products" ref={productsReveal.ref} className="py-32 px-6 bg-secondary text-primary overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-6xl md:text-8xl font-black uppercase italic leading-none">Service Menu</h2>
            <p className="text-primary/40 mt-4 tracking-[0.3em] font-bold uppercase">Luxury treatments for your hands</p>
          </div>
          
          {[
            { name: "BIAB Full Set", price: "₦18,000", desc: "Builder In A Bottle for strength and natural nail growth with a glossy finish.", img: "https://images.unsplash.com/photo-1596740926849-2d473dee8d60?q=80&w=1080" },
            { name: "GelX Extensions", price: "₦15,000", desc: "Soft gel extension system for long-lasting length and a lightweight feel.", img: "https://images.unsplash.com/photo-1719494206679-24a205905578?q=80&w=1080" },
            { name: "Bespoke Press-Ons", price: "₦10,000", desc: "Custom designed, reusable press-on nails tailored to your inspiration.", img: "https://images.unsplash.com/photo-1719494206679-24a205905578?q=80&w=1080" },
            { name: "Stick-on Luxury Set", price: "₦7,000", desc: "Ready-to-wear premium stick-on sets for instant elegance.", img: "https://images.unsplash.com/photo-1669058611053-ff24fb0f1c33?q=80&w=1080" }
          ].map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : (i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20')}`}>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl group border-[10px] border-white">
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-bold text-accent text-sm tracking-widest uppercase mb-4 block">0{i + 1} — Preferred</span>
                <h3 className="font-heading text-5xl md:text-6xl font-black uppercase italic leading-tight">{p.name}</h3>
                <p className="text-primary/60 mt-6 text-xl leading-relaxed font-light italic">{p.desc}</p>
                <div className="mt-10 flex flex-col gap-6">
                  <span className="text-4xl font-black font-heading text-primary">{p.price}</span>
                  <a href="#contact" className="bg-primary text-white px-10 py-4 rounded-full font-black w-fit hover:bg-accent transition-colors">
                    Order This Set
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION (SIGNATURE STICKY REVEAL) */}
      <section id="process" ref={processReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div className="sticky top-32">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase italic leading-none">Custom Press-Ons</h2>
            <p className="text-accent mt-6 text-xl font-bold uppercase tracking-widest">Lagos to your doorstep</p>
            <p className="text-secondary/40 mt-8 text-lg leading-relaxed max-w-md">
              Can't make it to Gbagada? Upload your inspiration, select your shape, and we'll ship your custom set within 48 hours. Sharp delivery, nationwide.
            </p>
            <div className="mt-12 space-y-6">
              {[
                { n: "01", t: "Send Your Inspo", d: "WhatsApp or DM your dream set designs." },
                { n: "02", t: "Sizing & Shape", d: "Choose from Almond, Stiletto, or Coffin." },
                { n: "03", t: "Fast Fulfillment", d: "Hand-painted and shipped in 48 hours." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="text-accent font-heading font-black text-3xl italic">{step.n}</span>
                  <div>
                    <h4 className="text-white font-bold text-xl uppercase tracking-tighter">{step.t}</h4>
                    <p className="text-secondary/40 text-sm">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative pt-20 md:pt-0">
             <div className="aspect-[3/4] relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                <SafeImage src="https://images.unsplash.com/photo-1719494206679-24a205905578?q=80&w=1080" alt="Process" fill className="object-cover group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
             </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (STATS V9) */}
      <section ref={aboutReveal.ref} className="py-32 px-6 bg-accent/10 border-y border-accent/20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="font-heading text-6xl md:text-7xl font-black text-white uppercase italic leading-none mb-10">The Studio</h2>
              <p className="text-secondary/70 text-xl leading-relaxed italic mb-10">
                Located in the heart of Gbagada, Tee Nailed It was born from a passion for detailed craftsmanship and feminine luxury. We believe your nails are your best accessory.
              </p>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { n: "1,200+", l: "Sets Created", i: <Heart size={20}/> },
                  { n: "500+", l: "Happy Clients", i: <Users size={20}/> },
                  { n: "5★", l: "Rating", i: <Star size={20}/> }
                ].map((s, i) => (
                  <div key={i} className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                    <p className="font-heading text-3xl font-black text-accent italic">{s.n}</p>
                    <p className="text-secondary/40 text-xs uppercase tracking-widest mt-2 font-bold">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-full border-4 border-accent/20 p-6">
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xl">
                <SafeImage src="https://images.unsplash.com/photo-1652869122685-c7792ef56ee2?q=80&w=1080" alt="Studio" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (T-SPOTLIGHT V7) */}
      <section ref={testReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-primary uppercase italic mb-20 leading-none">Client Love</h2>
          <div className="space-y-10">
            {[
              { name: "Tolu", role: "Lagos Entrepreneur", text: "The best BIAB set I've ever had in Lagos. My natural nails have never been this strong!" },
              { name: "Amaka", role: "Content Creator", text: "Her attention to detail is insane. The custom press-ons looked exactly like my Pinterest board." },
              { name: "Ife", role: "Fashion Stylist", text: "Aesthetic studio, great vibes, and even better nails. My go-to spot in Shomolu." }
            ].map((t, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`p-12 rounded-[2rem] border border-primary/10 bg-white shadow-xl transition-all duration-700 ${testReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                <p className="text-primary/80 text-2xl font-light italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary text-accent font-black text-xl flex items-center justify-center">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-primary uppercase tracking-tighter text-xl">{t.name}</p>
                    <p className="text-primary/40 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (C1) */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start">
          <div>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase italic leading-none mb-10">Secure Your Session</h2>
            <p className="text-secondary/40 text-xl leading-relaxed italic mb-12">
              Ready for the set of your dreams? Book an appointment or order your custom press-ons below.
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-white group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent transition-all">
                  <Instagram size={20} className="text-accent" />
                </div>
                <span className="text-lg font-bold tracking-widest uppercase">@tee.nailedit</span>
              </div>
              <div className="flex items-start gap-4 text-white group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent transition-all">
                  <MapPin size={20} className="text-accent" />
                </div>
                <span className="text-lg leading-relaxed font-light italic">Gbagada, Shomolu, Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {sent ? (
              <div className="p-16 text-center animate-scaleIn bg-secondary/5 rounded-[2.5rem] border border-accent/20 backdrop-blur-xl">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 mx-auto border border-accent/40">
                  <CheckCheck size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white uppercase italic mb-4">Message Sent</h3>
                <p className="text-secondary/60 text-lg">Thank you. Tee will review your inquiry and respond to secure your slot shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-10 md:p-14 bg-secondary/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 relative">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-accent transition-all placeholder:text-white/20"
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-accent transition-all placeholder:text-white/20"
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Phone Number (WhatsApp preferred)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-accent transition-all placeholder:text-white/20"
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
                <textarea
                  rows={5}
                  placeholder="Tell us about the set you want (BIAB, GelX, or Custom Press-ons)..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-accent transition-all placeholder:text-white/20 resize-none"
                  onChange={e => setForm({...form, message: e.target.value})}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-primary py-6 rounded-2xl font-black text-xl uppercase italic hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-3 group"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight className="group-hover:translate-x-2 transition-transform" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-3xl font-black tracking-tighter text-white">TEE NAILED IT<span className="text-accent">.</span></h2>
            <p className="text-secondary/30 mt-3 text-sm tracking-widest uppercase font-bold">Sharp delivery, nationwide.</p>
          </div>
          
          <div className="flex gap-10">
            <a href="https://instagram.com/tee.nailedit" target="_blank" rel="noopener noreferrer" className="text-secondary/50 hover:text-accent transition-colors">
              <Instagram size={24} />
            </a>
          </div>

          <div className="text-secondary/20 text-xs font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Tee Nailed It. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}