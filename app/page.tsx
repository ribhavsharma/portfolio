"use client";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import MouseGallery from "./components/MouseGallery";
import Scrollable from "./components/Scrollable";
import Skills from "./components/Skills";
import locomotiveScroll from "locomotive-scroll";
import "react-tooltip/dist/react-tooltip.css";
import Separator from "./components/Separator";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <>
          {window.innerWidth > 768 && <MouseGallery />}
          <Scrollable />
          <Separator />
          <Skills />
          <Separator />
          <Projects />
          <Separator />
          <ContactMe />
          <Separator />
        </>

        <Footer></Footer>
      </main>
    </div>
  );
}
