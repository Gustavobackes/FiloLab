import { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [visible])

  return (
    <div
      className={`${styles.cursor} ${visible ? styles.visible : ''}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      <span className={styles.h} />
      <span className={styles.v} />
    </div>
  )
}
