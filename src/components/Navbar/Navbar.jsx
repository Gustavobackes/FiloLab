import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoMark}>⟐</span>
        <span className={styles.logoText}>Filolab</span>
      </Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Projetos</Link>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
      </div>
    </nav>
  )
}
