"use client"

import type React from "react"
import { use, useEffect, useState } from "react"

interface Props {
  children: React.ReactNode
  onClick?: () => void
}


export default function SkButton({ children, onClick }: Props) {
  const [up, setUpAudio] = useState<HTMLAudioElement | null>(null)
  const [down, setDownAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    setUpAudio(new Audio("/audio/up.mp3"))
    setDownAudio(new Audio("/audio/down.mp3"))
  }, [])
  
  const handleMouseDown = () => {
    if (!down) return
    down.currentTime = 0.020
    down.play()
  }

  const handleMouseUp = () => {
    if (!up) return
    up.currentTime = 0.03
    up.play()
  }

  return (
    <button onClick={onClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="key">
      <div className="top">
        <div className="trapezoid right"></div>
        <div className="rectangle">
        <div className="btn-text">{children}</div>
        </div>
        <div className="trapezoid left"></div>
      </div>
    </button>
  )
}

