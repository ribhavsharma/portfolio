// components/ScrollableText.tsx
"use client";
import { useEffect } from "react";

const ScrollableText = () => {
  useEffect(() => {
    const textElements = document.querySelectorAll(
      ".scroll-text",
    ) as NodeListOf<HTMLElement>;
    textElements.forEach((textElement) => {
      const text = textElement.innerText;
      const words = text.split(" ");
      textElement.innerHTML = "";

      words.forEach((word) => {
        const wordElement = document.createElement("span");
        wordElement.className = "word inline-block";

        if (word.includes("Ribhav")) {
        }

        if (
          word == "Fullstack" ||
          word == "Developer" ||
          word == "UI/UX" ||
          word == "Designer"
        ) {
          wordElement.classList.add("squiggle");
        }

        word.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className =
            "char inline-block transition-opacity duration-50 ease-in-out";
          if (char === " ") {
            span.innerHTML = "&nbsp;";
          } else {
            span.innerText = char;
          }
          span.style.color = "rgba(0, 0, 0, 0.2)";

          wordElement.appendChild(span);
        });

        textElement.appendChild(wordElement);

        const spaceSpan = document.createElement("span");
        spaceSpan.innerText = " ";
        textElement.appendChild(spaceSpan);
      });
    });

    const handleScroll = () => {
      const spans = document.querySelectorAll(
        ".char",
      ) as NodeListOf<HTMLElement>;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      spans.forEach((span, index) => {
        const baseFactor = window.innerWidth <= 768 ? 10 : 2.5;
        const opacity = Math.min(
          Math.max(
            (scrollPosition - index * baseFactor) / (windowHeight / 16),
            0.2,
          ),
          0.8,
        );
        span.style.color = `rgba(20,20,20, ${opacity})`;
      });
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-start justify-center mt-40 md:mt-16">
      <div
        className={`font-rebond text-2xl md:text-4xl ${window.innerWidth > 768 ? "text-gray-200" : "text-[#141414]"} w-[60%]`}
      >
        <p className={`${window.innerWidth > 768 ? "scroll-text" : ""}`}>
          Hi, I am Ribhav. I am a Fullstack Developer and UI/UX Designer based
          out of Kelowna, Canada.
        </p>
        <br></br>

        <p className={`${window.innerWidth > 768 ? "scroll-text" : ""}`}>
          I am a Fourth Year CS student at the University of British Columbia,
          Okanagan. My passion lies in creating intuitive and visually appealing
          digital experiences. With a strong foundation in both front-end and
          back-end development, I thrive on bringing ideas to life through code
          and design.
        </p>
        <br></br>
        <p className={`${window.innerWidth > 768 ? "scroll-text" : ""}`}>
          Let's build something splendid together.
        </p>
      </div>
    </div>
  );
};

export default ScrollableText;
