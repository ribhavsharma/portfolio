"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import MouseGallery from "./components/MouseGallery";
import Scrollable from "./components/Scrollable";
import Skills from "./components/Skills";
import 'react-tooltip/dist/react-tooltip.css';
import Separator from "./components/Separator";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <>
          {isClient && window.innerWidth > 768 && <MouseGallery />}
          <Scrollable />
          <Separator />
          <Skills />
          <Separator />
          <Projects />
          <Separator />
          <ContactMe />
          <Separator />
        </>
        <Footer />
      </main>
    </div>
  );
}
