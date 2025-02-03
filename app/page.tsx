"use client"

import { useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MouseGallery from "./components/MouseGallery";
import Scrollable from "./components/Scrollable";
import Skills from "./components/Skills";
import 'react-tooltip/dist/react-tooltip.css';
import Separator from "./components/Separator";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";
import Type from "./components/Type";
import {motion} from 'motion/react'

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isType, setIsType] = useState(false);

  const onClickType = () => {
    setIsType(!isType);
  };

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div>
      <Navbar />
      <main>
        {isClient && (
          <>
            {window.innerWidth > 768 && <MouseGallery />}
            {isType ? (
              <Type onExit = {onClickType}/>
            ) : (
              <Scrollable onClickType={onClickType} />
            )}
            <Separator />
            <Skills />
            <Separator />
            <Projects />
            <Separator />
            <ContactMe />
            <Separator />
          </>
        )}
        <Footer />
      </main>
    </motion.div>
  );
}
