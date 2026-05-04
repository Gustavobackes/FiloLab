import { Navbar } from '../../components/Navbar/Navbar'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { ParticleBackground } from '../../components/ParticleBackground/ParticleBackground'
import { CustomCursor } from '../../components/CustomCursor/CustomCursor'
import { motion } from 'framer-motion'
import projects from '../../data/projects'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.titleLine}>Objetos que saem do digital</span>
            <br />
            <span className={`${styles.titleLine} ${styles.accent}`} style={{ animationDelay: '0.4s' }}>para o físico</span>
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Portfólio de impressão 3D — cada peça contada em camadas
          </motion.p>
        </section>

        <section className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              featured={i === 0}
            />
          ))}
        </section>

        <footer className={styles.footer}>
          <span className={styles.footerMark}>⟐ Filolab</span>
          <span className={styles.footerText}>Impressão 3D · Design · Prototipagem</span>
        </footer>
      </main>
    </>
  )
}
