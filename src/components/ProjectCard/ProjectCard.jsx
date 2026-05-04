import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { STLViewer } from '../STLViewer/STLViewer'
import { useRef, useState } from 'react'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project, index, featured = false }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -4, y: x * 4 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div className={styles.viewer}>
        <STLViewer stlUrl={project.stlFile} interactive />
      </div>
      <div className={styles.info}>
        <Link to={`/projeto/${project.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{project.title}</h3>
        </Link>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <div className={styles.badges}>
          <span className={styles.badge}>{project.filamento}</span>
          <span className={styles.badge}>{project.tempo}</span>
        </div>
      </div>
    </motion.article>
  )
}
