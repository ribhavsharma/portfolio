import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center items-center py-8 my-10">
      <p className="flex items-center text-gray-300 gap-0">
        made with {"<3"} by
        <img src="images/signature.png" className="inline-block h-[3em]" />
      </p>
    </div>
  );
};

export default Footer;
