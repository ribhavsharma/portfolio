"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ValidationError, useForm } from "@formspree/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";

const ContactMe = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, handleSubmit, reset] = useForm(process.env.FORM_URL || "");

  if (state.succeeded) {
    if (state.succeeded) {
      toast("message sent successfully", { type: "success" });
      reset();
    }
  }

  if (state.errors) {
    if (state.errors) {
      toast("message failed to send", { type: "error" });
    }
  }

  useEffect(() => {
    const cursorElement = cursorRef.current;
    const text = "contact me • contact me • contact me •";
    const radius = 50;

    if (cursorElement) {
      cursorElement.innerHTML = "";
      const cursorInner = document.createElement("div");
      cursorInner.className = "cursor-inner";
      const cursorText = document.createElement("div");
      cursorText.className = "cursor-text";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.className = "charr inline-block font-mono text-white";
        span.innerText = char;
        cursorText.appendChild(span);
      });
      cursorInner.appendChild(cursorText);
      cursorElement.appendChild(cursorInner);

      const chars = cursorElement.querySelectorAll(".charr");
      const rotation = 360 / chars.length;

      chars.forEach((char, i) => {
        const rotate = rotation * i;
        gsap.set(char, {
          transformOrigin: `0px ${radius}px`,
          x: radius,
          rotate: rotate,
        });
      });

      gsap.set(cursorElement, {
        transformOrigin: "center center",
        width: radius * 2,
        height: radius * 2,
      });

      gsap
        .timeline({ repeat: -1 })
        .to(cursorElement, { rotation: 360, duration: 5, ease: "none" });
    }
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div
      id="contact-me"
      className="relative py-10 flex flex-col md:flex-row justify-center w-[90%] md:w-[60%] mx-auto"
    >
      <div className="w-[90%] md:w-1/2 md:pr-8 mb-8 md:mb-0 mx-auto">
        <h2 className="text-3xl font-rebond my-6 text-[#141414] text-left">
          Connect with Me
        </h2>
        <p className="mb-6 text-[#141414] *:text-left">
          I'd love to hear from you! Feel free to reach out via email or connect
          with me on social media. Alternatively, you can fill out the form to
          send me a message directly.
        </p>
        <div className="flex justify-start gap-4">
          <a href="mailto:sharma.ribhavsharma@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
          </a>
          <a href="https://www.linkedin.com/in/ribhavsharma/">
            <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
          </a>
          <a href="https://github.com/ribhavsharma">
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
          </a>
          <a href="https://www.instagram.com/ribhavvsharma/">
            <FontAwesomeIcon icon={faInstagram} className="text-lg" />
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/2 relative">
        <form className="border p-6 rounded-xl" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              required
            />
            <ValidationError field="name" prefix="Name" errors={state.errors} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              required
            />
            <ValidationError
              field="email"
              prefix="Email"
              errors={state.errors}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              name="message"
              required
            ></textarea>
            <ValidationError
              field="message"
              prefix="Message"
              errors={state.errors}
            />
          </div>
          <Button full>Send Message</Button>
        </form>
        <div
          className="cursor absolute top-[-50px] right-[-50px] bg-[#141414] rounded-full"
          ref={cursorRef}
        ></div>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default ContactMe;
