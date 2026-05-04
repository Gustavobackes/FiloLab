# 🧵 Filolab — Plano de Execução do Site

> Portfólio de projetos de impressão 3D com visualizador STL interativo

---

## Visão Geral

**Nome do projeto:** Filolab  
**Stack:** React + Vite + React Three Fiber + Framer Motion  
**Objetivo:** Exibir projetos 3D em `.stl` com rotação interativa, visual premium, e páginas de detalhes por projeto.

---

## Stack Tecnológica

| Camada | Tecnologia | Pacote |
|---|---|---|
| Framework | React 18 + Vite | `react`, `vite` |
| Roteamento | React Router v6 | `react-router-dom` |
| 3D Engine | React Three Fiber | `@react-three/fiber` |
| Helpers 3D | Drei | `@react-three/drei` |
| Loader STL | Three.js STLLoader | `three` (addon) |
| Animações | Framer Motion | `framer-motion` |
| Estilos | CSS Modules + variáveis globais | nativo |
| Fontes | Google Fonts (Syne + Space Mono) | CDN |

---

## Estrutura de Pastas

```
filolab/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── models/              ← arquivos .stl ficam aqui
│   │       ├── projeto-01.stl
│   │       ├── projeto-02.stl
│   │       └── projeto-03.stl
│   ├── components/
│   │   ├── STLViewer/
│   │   │   ├── STLViewer.jsx    ← componente de visualização 3D
│   │   │   └── STLViewer.module.css
│   │   ├── ProjectCard/
│   │   │   ├── ProjectCard.jsx  ← card da galeria com preview 3D
│   │   │   └── ProjectCard.module.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   └── ParticleBackground/
│   │       └── ParticleBackground.jsx  ← partículas animadas de fundo
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx         ← galeria de projetos
│   │   │   └── Home.module.css
│   │   └── ProjectDetail/
│   │       ├── ProjectDetail.jsx ← página de detalhe do projeto
│   │       └── ProjectDetail.module.css
│   ├── data/
│   │   └── projects.js          ← fonte de dados dos projetos (mock)
│   ├── styles/
│   │   └── global.css           ← variáveis CSS, reset, tipografia
│   ├── App.jsx
│   └── main.jsx
├── SKILL_ADICIONAR_PROJETO.md   ← skill para adicionar novos projetos
├── package.json
└── vite.config.js
```

---

## Etapas de Execução

### Etapa 1 — Setup do Projeto

```bash
npm create vite@latest filolab -- --template react
cd filolab
npm install
npm install @react-three/fiber @react-three/drei three
npm install framer-motion
npm install react-router-dom
```

**Configurar Vite para importar `.stl`:**

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.stl'],
})
```

---

### Etapa 2 — Dados dos Projetos (`src/data/projects.js`)

Cada projeto é um objeto com os campos:

```js
{
  id: 'projeto-01',
  slug: 'vaso-geometrico',
  title: 'Vaso Geométrico',
  subtitle: 'Decoração paramétrica',
  stlFile: '/models/projeto-01.stl',   // path em /public/models/
  thumbnail: null,                      // gerado pelo viewer 3D
  description: 'Descrição detalhada...',
  filamento: 'PLA+ Preto',
  cor: '#1a1a1a',
  peso: '42g',
  tempo: '3h 20min',
  camadas: 0.2,
  infill: '15%',
  suporte: false,
  dataFabricacao: '2024-11',
  tags: ['decoração', 'paramétrico', 'vaso'],
}
```

---

### Etapa 3 — Componente STLViewer

**Comportamento esperado:**
- Ao clicar no card → cursor some, rotação ativada
- Rotação livre no eixo X e Y (sem pan/drag da câmera)
- Zoom permitido com scroll
- Ao soltar o clique → cursor retorna
- Auto-rotação lenta quando não interagindo

**Implementação:**

```jsx
// STLViewer.jsx
import { useLoader } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'

function Model({ url }) {
  const geometry = useLoader(STLLoader, url)
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color="#e8e0d0" metalness={0.3} roughness={0.6} />
    </mesh>
  )
}

export function STLViewer({ stlUrl, interactive = false }) {
  const [isInteracting, setIsInteracting] = useState(false)

  return (
    <div
      style={{ cursor: isInteracting ? 'none' : 'grab' }}
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url={stlUrl} />
          </Stage>
          <OrbitControls
            enablePan={false}        // ← sem arrastar câmera
            enableDamping={true}
            dampingFactor={0.05}
            autoRotate={!isInteracting}
            autoRotateSpeed={1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
```

---

### Etapa 4 — Design Visual

**Identidade Filolab:**
- Tema: dark industrial com acentos de filamento laranja (`#FF6B2B`) e branco sujo
- Fonte display: **Syne** (títulos grandes, peso 800)
- Fonte mono: **Space Mono** (dados técnicos, specs)
- Fundo: preto profundo `#0a0a0a` com textura de ruído sutil (CSS noise)
- Cards: bordas finas `1px solid rgba(255,255,255,0.08)`, backdrop-blur, hover com glow laranja
- Grid da galeria: assimétrico, 3 colunas com card destaque maior

**Efeitos e movimento:**
- Partículas flutuantes no fundo (canvas 2D simples com requestAnimationFrame)
- Entrada dos cards com `framer-motion` stagger (delay escalonado)
- Linha animada que "imprime" o título (`stroke-dashoffset` animation)
- Hover no card: elevação 3D sutil (`transform: perspective(800px) rotateX(2deg)`)
- Cursor customizado: um crosshair fino laranja que segue o mouse

---

### Etapa 5 — Página Home (Galeria)

**Layout:**
```
[NAVBAR - logo Filolab + nav links]

[HERO - título animado + subtítulo]
  "Objetos que saem do digital para o físico"

[GRID DE PROJETOS]
  Card 1 (destaque grande) | Card 2
  Card 3                   | Card 4 (se houver)

[FOOTER - contato + redes]
```

**Interação no card:**
- Click ativa o modo de rotação 3D (cursor some)
- O título do card é um `<Link>` para `/projeto/:slug`
- Badge com filamento e tempo visíveis no hover

---

### Etapa 6 — Página de Detalhe do Projeto

**URL:** `/projeto/:slug`

**Seções:**
```
[VIEWER 3D GRANDE - 60vh, rotação livre, sem pan]
[TÍTULO + SUBTÍTULO]
[SPECS TÉCNICAS em grid:]
  • Filamento usado
  • Cor
  • Peso final
  • Tempo de impressão
  • Altura de camada
  • Infill
  • Suporte usado
  • Data de fabricação
[DESCRIÇÃO LONGA]
[TAGS]
[← Voltar à galeria]
```

---

### Etapa 7 — Mock Inicial (3 Projetos)

Os 3 projetos iniciais usarão o mesmo arquivo `.stl` de placeholder.

Coloque o arquivo em: `public/models/placeholder.stl`

Os mocks em `projects.js` apontarão todos para `/models/placeholder.stl` com dados diferentes.

> **Após o projeto estar pronto:** substitua `placeholder.stl` pelos arquivos reais em `public/models/` e atualize os paths em `projects.js`. A pasta `/assets` original pode ser removida.

---

### Etapa 8 — Checklist Final

- [ ] `.stl` carrega corretamente via `useLoader(STLLoader, url)`
- [ ] Click remove cursor e ativa rotação
- [ ] Soltar click restaura cursor
- [ ] Pan está desabilitado (`enablePan={false}`)
- [ ] Título do card é `<Link>` navegável
- [ ] Página de detalhe renderiza specs do projeto
- [ ] Animações de entrada funcionam (framer-motion)
- [ ] Responsivo (mobile: cards em coluna única)
- [ ] STL path em `/public/models/` (não em `/src/assets/`)
- [ ] `vite.config.js` inclui `assetsInclude: ['**/*.stl']`

---

## Observações Importantes

### Sobre os arquivos STL

Os arquivos `.stl` **devem ficar em `/public/models/`** (não dentro de `/src`). Isso é necessário porque o Vite serve arquivos da pasta `public` diretamente, e o `STLLoader` do Three.js precisa de uma URL HTTP para fazer o fetch do arquivo binário.

```
✅ /public/models/meu-projeto.stl  →  '/models/meu-projeto.stl'
❌ /src/assets/meu-projeto.stl     →  não funciona com STLLoader
```

### Cursor invisível no modo 3D

O cursor é ocultado com CSS `cursor: none` aplicado no wrapper do Canvas quando `isInteracting = true`. Isso é controlado por `onMouseDown` / `onMouseUp` / `onMouseLeave`.

### Performance

Para muitos projetos, use `<Suspense>` com skeleton loader enquanto o STL carrega. O `STLLoader` faz um fetch assíncrono — arquivos grandes podem demorar.

---

## Referências

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei — OrbitControls](https://drei.docs.pmnd.rs/controls/orbit-controls)
- [Three.js STLLoader](https://threejs.org/docs/#examples/en/loaders/STLLoader)
- [Framer Motion](https://www.framer.com/motion/)
