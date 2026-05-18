'use client';
import { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import Image from 'next/image';

const useScrollReveal = (threshold = 0.15) => {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return { ref, v };
};

function SafeImage({ src, alt, fill, className, priority }: any) {
  const [e, setE] = useState(false);
  if (e || !src) return <div className={`bg-neutral-900 flex items-center justify-center ${className}`}><Lucide.ImageOff className="opacity-20" /></div>;
  return <Image src={src} alt={alt} fill={fill} className={className} priority={priority} onError={() => setE(true)} unoptimized />;
}

export default function Page() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* UI implementation here */}
      <section id="hero" className="bg-black text-white py-40">
        <div className="container mx-auto p-4">
          <h1 className="text-6xl tracking-tighter leading-[0.9] font-heading animate-fadeIn">Nails That Speak Louder Than Words.</h1>
          <p className="text-2xl animate-slideUp">Lagos' premier destination for trend-setting acrylics, BIAB, and luxury custom press-ons.</p>
          <button className="bg-primary text-white py-2 px-4 animate-scaleIn">Book Your Set</button>
        </div>
      </section>
      {/* Other sections */}
    </main>
  );
}