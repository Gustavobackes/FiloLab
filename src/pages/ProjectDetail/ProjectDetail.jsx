import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { STLViewer } from '../../components/STLViewer/STLViewer'
import { Navbar } from '../../components/Navbar/Navbar'
import projects from '../../data/projects'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.notFound}>
          <h2>Projeto não encontrado</h2>
          <Link to="/" className={styles.backLink}>← Voltar à galeria</Link>
        </div>
      </main>
    )
  }

  const specs = [
    { label: 'Filamento', value: project.filamento },
    { label: 'Cor', value: project.cor, isColor: true },
    { label: 'Peso', value: project.peso },
    { label: 'Tempo', value: project.tempo },
    { label: 'Camada', value: `${project.camadas}mm` },
    { label: 'Infill', value: project.infill },
    { label: 'Suporte', value: project.suporte ? 'Sim' : 'Não' },
    { label: 'Data', value: project.dataFabricacao },
  ]

  return (
    <main className={styles.main}>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.viewer}>
          <STLViewer stlUrl={project.stlFile} interactive />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>

          <div className={styles.specs}>
            {specs.map((spec) => (
              <div key={spec.label} className={styles.spec}>
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specValue}>
                  {spec.isColor ? (
                    <span className={styles.colorSwatch}>
                      <span className={styles.swatch} style={{ backgroundColor: spec.value }} />
                      {spec.value}
                    </span>
                  ) : (
                    spec.value
                  )}
                </span>
              </div>
            ))}
          </div>

          <p className={styles.description}>{project.description}</p>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>

          <Link to="/" className={styles.backLink}>← Voltar à galeria</Link>
        </div>
      </motion.div>
    </main>
  )
}
