import { useEffect } from 'react';
import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import PropertiesSection from '@/components/public/PropertiesSection';
import AboutSection from '@/components/public/AboutSection';
import WhyChooseUsSection from '@/components/public/WhyChooseUsSection';
import BlogSection from '@/components/public/BlogSection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import Loader from '@/components/public/Loader';
import CustomCursor from '@/components/public/CustomCursor';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="bg-[var(--dark)] min-h-screen">
      <CustomCursor />
      <Loader />
      <Navbar />
      <Hero />
      <PropertiesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <BlogSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
