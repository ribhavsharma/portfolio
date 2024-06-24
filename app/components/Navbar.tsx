"use client";
import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact-me");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="py-2 top-10 left-0 px-4 md:px-8 fixed w-full flex justify-center z-[100]">
      <div className="navbar rounded-xl py-4 px-6 bg-[#ffffff1a] backdrop-blur-[15px] flex justify-between items-center text-black font-rebond w-[60%]">
        <div>✦ rbv shrm</div>
        <div className="space-x-4">
          <Button full={false} onClick={handleScrollToContact}>
            contact
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
