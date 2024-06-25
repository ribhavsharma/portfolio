import React, { useRef, MouseEvent, TouchEvent, RefObject, useState } from "react";

type Props = {};

const MouseGallery = (props: Props) => {
  const [msg, showMsg] = useState(true);
  const refs = useRef<(HTMLImageElement | null)[]>(new Array(11).fill(null));
  let currentIndex: number = 0;
  let steps: number = 0;
  let nbOfImages: number = 0;
  const maxNumberOfImages: number = 9;

  const manageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    showMsg(false);
    const { clientX, clientY, movementX, movementY } = e;

    steps += Math.abs(movementX) + Math.abs(movementY);

    if (steps >= currentIndex * 200) {
      moveImage(clientX, clientY);
    }

    if (nbOfImages === maxNumberOfImages) {
      removeImage();
    }

    if (currentIndex === refs.current.length) {
      currentIndex = 0;
      steps = -300;
    }
  };

  const manageTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    showMsg(false);
    const touch = e.touches[0];
    const { clientX, clientY } = touch;
    const movementX = touch.clientX - Number(refs.current[currentIndex]?.dataset.lastTouchX || clientX);
    const movementY = touch.clientY - Number(refs.current[currentIndex]?.dataset.lastTouchY || clientY);

    steps += Math.abs(movementX) + Math.abs(movementY);

    if (steps >= currentIndex * 200) {
      moveImage(clientX, clientY);
    }

    if (nbOfImages === maxNumberOfImages) {
      removeImage();
    }

    if (currentIndex === refs.current.length) {
      currentIndex = 0;
      steps = -300;
    }

    refs.current[currentIndex]?.setAttribute('data-last-touch-x', clientX.toString());
    refs.current[currentIndex]?.setAttribute('data-last-touch-y', clientY.toString());
  };

  const getImages = (): HTMLImageElement[] => {
    let images: HTMLImageElement[] = [];
    let firstIndex = currentIndex - nbOfImages;
    for (let i = firstIndex; i < currentIndex; i++) {
      let targetIndex = i;
      if (targetIndex < 0) targetIndex += refs.current.length;
      images.push(refs.current[targetIndex]!);
    }
    return images;
  };

  const setZIndex = () => {
    const images = getImages();
    images.forEach((image, index) => {
      image.style.zIndex = `${index}`;
    });
  };

  const removeImage = () => {
    const images = getImages();
    images[0].style.display = "none";
    nbOfImages--;
  };

  const moveImage = (x: number, y: number) => {
    const currentImage = refs.current[currentIndex];

    if (currentImage) {
      currentImage.style.left = x + "px";
      currentImage.style.top = y + "px";
      currentImage.style.display = "block";
      currentIndex++;
      nbOfImages++;
    }

    setZIndex();
  };

  return (
    <div
      className="flex relative overflow-hidden h-[100vh]"
      onMouseMove={manageMouseMove}
      onTouchMove={manageTouchMove}
    >
      {msg && (
        <div className="absolute inset-0 flex items-center justify-center z-[70]">
          <span className="text-gray-300 text-sm font-serif">
            move your mouse
          </span>
        </div>
      )}
      {[...Array(11).keys()].map((_, index) => (
        <img
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          src={`/images/${index}.jpg`}
          className="hidden absolute w-[20vw] translate-x-[-50%] translate-y-[-50%]"
          alt={`Image ${index}`}
        />
      ))}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-[60]"></div>
    </div>
  );
};

export default MouseGallery;
