"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experiences";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Intro from "@/components/layout/Intro";
import VisualLog from "@/components/sections/VisualLog";
import Beyond from "@/components/sections/Beyond";
import BeyondTransition from "@/components/beyond/BeyondTransition";

export default function Home() {
  const [showBeyond, setShowBeyond] = useState(false);

  return (
    <>
      <Intro />

      <Navbar showBeyond={showBeyond} onBack={() => setShowBeyond(false)} />

      {!showBeyond ? (
        <>
          <main id="home">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <VisualLog />
            <Experience />
            <Education />
            <BeyondTransition onComplete={() => setShowBeyond(true)} />
            <Contact />
          </main>

          <Footer />
        </>
      ) : (
        <Beyond />
      )}
    </>
  );
}
