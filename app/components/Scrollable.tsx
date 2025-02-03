"use client";
import { useEffect } from "react";
import Button from "./Button";

const ScrollableText = (
  props: {
    onClickType: () => void;
  }
) => {
  useEffect(() => {
    const textElements = document.querySelectorAll('.scroll-text') as NodeListOf<HTMLElement>;
    textElements.forEach(textElement => {
      const text = textElement.innerText;
      const words = text.split(' ');
      textElement.innerHTML = '';

      words.forEach(word => {
        const wordElement = document.createElement('span');
        wordElement.className = 'word inline-block';


        word.split('').forEach(char => {
          const span = document.createElement('span');
          span.className = 'char inline-block transition-opacity duration-50 ease-in-out';
          if (char === ' ') {
            span.innerHTML = '&nbsp;';
          } else if (char === "'") {
            span.innerHTML = '&apos;';
          } else {
            span.innerText = char;
          }
          span.style.color = 'rgba(0, 0, 0, 0.2)'; 

          wordElement.appendChild(span);
        });

        textElement.appendChild(wordElement);

        const spaceSpan = document.createElement('span');
        spaceSpan.innerText = ' ';
        textElement.appendChild(spaceSpan); 
      });
    });

    const handleScroll = () => {
      if (window.innerWidth > 768) {
        const spans = document.querySelectorAll('.char') as NodeListOf<HTMLElement>;
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        spans.forEach((span, index) => {
          const opacity = Math.min(Math.max((scrollPosition - index * 2.5) / (windowHeight / 16), 0.2), 0.8);
          span.style.color = `rgba(0, 0, 0, ${opacity})`;
        });
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex items-start justify-center mt-40 md:mt-16">
      <div className="font-rebond text-2xl md:text-4xl text-gray-200 w-[90%] sm:w-[80%] md:w-[60%]">
        <p className="scroll-text">
          Hi, I&apos;m Ribhav. I am a Fullstack Developer and UI/UX Designer based out of Kelowna, Canada.
        </p><br/>
        
        <p className="scroll-text">
          I am a Fourth Year CS student at the University of British Columbia, Okanagan. My passion lies in creating intuitive and visually appealing digital experiences. With a strong foundation in both front-end and back-end development, I thrive on bringing ideas to life through code and design.
        </p><br/>
        <p className="scroll-text">
          Let&apos;s build something splendid together.
        </p><br />
        
        <span className="scroll-text">
        I like cool looking buttons and 
        </span>
        {window.innerWidth > 768 ? (
          <span><Button full={false} onClick={props.onClickType}>monkeytype</Button></span>
        ) : (
          <span>monkeytype</span>
        )}
      </div>
    </div>
  );
};

export default ScrollableText;
