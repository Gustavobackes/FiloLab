import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projeto/:slug" element={<ProjectDetail />} />
    </Routes>
  )
}
