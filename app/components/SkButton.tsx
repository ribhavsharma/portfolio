"use client"
import type React from "react"

interface Props {
  children: React.ReactNode
  onClick?: () => void
}

const down = new Audio("/audio/down.mp3")
const up = new Audio("/audio/up.mp3")

export default function SkButton({ children, onClick }: Props) {
  const handleMouseDown = () => {
    down.currentTime = 0.020
    down.play()
  }

  const handleMouseUp = () => {
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

