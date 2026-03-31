
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import ResumeLinks from '../components/ResumeLinks';
import Contact from '../components/Contact';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  useEffect(() => {
    toast({
      title: "Welcome to my portfolio!",
      description: "Feel free to explore my projects and get in touch.",
      duration: 5000,
    });
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <ResumeLinks />
      <Contact />
    </Layout>
  );
};

export default Index;
