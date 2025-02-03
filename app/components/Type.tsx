import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { RefreshCcw, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "./Button";

type Props = {};

const text = `hi im ribhav i am a fullstack developer and uiux designer based out of kelowna canada i am a fourth year cs student at the university of british columbia okanagan my passion lies in creating intuitive and visually appealing digital experiences with a strong foundation in both frontend and backend development i thrive on bringing ideas to life through code and design lets build something splendid together i like cool looking buttons and monkeytype `;

const words = text.split(" ");
const chars = text.split("");

const Type = (props: Props) => {
  const [curPos, setCurPos] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const getNumCorrect = (typed: string) => {
    let correctCount = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) {
        correctCount++;
      }
    }
    return correctCount;
  };

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
        const numCorrect = getNumCorrect(typedText);
        const calculatedWpm = Math.floor((numCorrect / 5) * (60 / elapsedTime));
        setWpm(calculatedWpm);
      }, 150);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [typedText, startTime]);

  const handleType = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    if (!startTime) setStartTime(Date.now());

    if (e.key === "Backspace") {
      if (typedText.length > 0) {
        setTypedText(typedText.slice(0, -1));
        let char = document.getElementById(`char-${curPos - 1}`);
        char?.style.setProperty("color", "#e5e7eb");
        setCurPos((prev) => {
          const newPos = prev - 1;
          updateCursorPosition(newPos);
          return newPos;
        });
      }
    } else {
      let char = document.getElementById(`char-${curPos}`);
      if (curPos === 450) {
        setShowResults(true);
        setStartTime(null);
        return;
      }
      if (e.key === text[curPos]) {
        char?.style.setProperty("color", "black");
      } else {
        char?.style.setProperty("color", "#eb7593");
      }
      setTypedText(typedText + e.key);
      setCurPos((prev) => {
        const newPos = prev + 1;
        updateCursorPosition(newPos);
        return newPos;
      });
    }
  };

  const updateCursorPosition = (pos: number) => {
    const char = document.getElementById(`char-${pos}`);
    const charRect = char?.getBoundingClientRect();
    const container = containerRef.current;

    if (char && container && charRect) {
      setCursorPosition({
        x: char.offsetLeft,
        y: char.offsetTop + 5,
      });
    }
  };

  const reset = () => {
    setStartTime(null);
    setWpm(0);
    setCurPos(0);
    setTypedText("");
    setCursorPosition({
      x: containerRef.current?.offsetLeft || 0,
      y: containerRef.current?.offsetTop || 0,
    });
    let allChars = document.querySelectorAll("span");
    allChars.forEach((char) => {
      char.style.setProperty("color", "#e5e7eb");
    });
    setShowResults(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
    setCursorPosition({
      x: containerRef.current?.offsetLeft || 0,
      y: containerRef.current?.offsetTop || 0,
    });
  }, []);

  const handleResetClick = () => {
    reset();
    if (containerRef.current) {
      containerRef.current.focus();
    }
  };

  return (
    <motion.div
      className="py-10 flex flex-col items-stretch w-[80%] md:w-[60%] mx-auto font-rebond text-2xl md:text-4xl mt-40 md:mt-16 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-200">{wpm}</p>
        <RefreshCcw className="text-gray-200 cursor-pointer" onClick={handleResetClick} />
      </div>
      <p
        className="text-gray-200 outline-none"
        onKeyDown={handleType}
        tabIndex={0}
        ref={containerRef}
      >
        {chars.map((char, index) => (
          <span key={index} id={`char-${index}`}>
            {char}
          </span>
        ))}

        <motion.span
          className="absolute w-[2px] h-8 bg-black cuursor"
          style={{ top: cursorPosition.y }}
          animate={{ opacity: [1, 0.2, 1], left: cursorPosition.x }}
          transition={{
            duration: 0.08,
            opacity: { repeat: Infinity },
          }}
        />
      </p>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 flex items-center justify-center z-[10000] backdrop-blur-lg"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              results
            </h2>
            <p className="text-sm  dark:text-gray-200">Your WPM: {wpm}</p>
            <p className="text-sm mb-4 dark:text-gray-300">My WPM: 110</p>
            <p className="text-sm dark:text-gray-300 mb-4">
              {wpm > 110
                ? "lucky."
                : "LMAO YOU CAN DO BETTER 😭😭😭😭 "}
            </p>
            <div className="flex flex-col space-y-2">
              <Button onClick={reset} full>
                Try Again :(
              </Button>

              {wpm > 110 && (
                <a
                  href={`mailto:ribhavsharma2003@gmail.com?subject=you suck&body=im simply better! my wpm is ${wpm}.`}
                  className="bg-green-300 text-green-600 border-green-400 border-2 px-4 py-2 rounded transition-colors text-sm inline-block text-center w-full"
                >
                  or... flex on me
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Type;

{
  /* <motion.span
          className="text-black"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          |
        </motion.span> */
}
