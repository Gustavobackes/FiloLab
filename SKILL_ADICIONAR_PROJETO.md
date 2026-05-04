---
name: filolab-adicionar-projeto
description: >
  Use esta skill quando o usuário quiser adicionar, editar, remover ou listar projetos
  no site Filolab. Inclui estrutura de dados, onde colocar o arquivo .stl, como atualizar
  o arquivo de projetos, e boas práticas de nomenclatura. Também cobre atualização de
  thumbnails, tags e specs técnicas de impressão 3D.
---

# Filolab — Skill: Adicionar / Editar Projetos

## Visão Geral da Estrutura de Dados

Os projetos ficam em `src/data/projects.js`. Cada projeto é um objeto JavaScript no array `PROJECTS`.

Os arquivos `.stl` ficam obrigatoriamente em `public/models/` para que o Three.js STLLoader consiga carregá-los via URL HTTP.

---

## Estrutura Completa de um Projeto

```js
// src/data/projects.js

export const PROJECTS = [
  {
    // --- Identificação ---
    id: 'projeto-01',                        // ID único, nunca mude depois de publicado
    slug: 'vaso-geometrico',                 // usado na URL: /projeto/vaso-geometrico

    // --- Exibição ---
    title: 'Vaso Geométrico',                // título principal
    subtitle: 'Decoração paramétrica',       // subtítulo curto (aparece no card)
    description: `
      Descrição longa do projeto. Pode conter múltiplas linhas.
      Explique a inspiração, o processo de design, dificuldades encontradas.
    `,
    tags: ['decoração', 'paramétrico', 'vaso'],

    // --- Arquivo 3D ---
    stlFile: '/models/vaso-geometrico.stl',  // path relativo a /public

    // --- Specs de Impressão ---
    filamento: 'PLA+ Preto',                 // ex: PLA, PETG, ABS, TPU
    fabricante: 'eSUN',                      // fabricante do filamento (opcional)
    cor: '#1a1a1a',                          // cor hex para exibição visual
    peso: '42g',                             // peso do objeto impresso
    tempo: '3h 20min',                       // tempo total de impressão
    camadas: 0.2,                            // altura de camada em mm
    infill: '15%',                           // densidade de preenchimento
    suporte: false,                          // precisou de suporte? true/false
    brim: false,                             // usou brim? true/false

    // --- Metadados ---
    dataFabricacao: '2024-11',               // YYYY-MM
    destaque: false,                         // true = card maior na home
  },
]
```

---

## Passo a Passo: Adicionar um Novo Projeto

### 1. Copiar o arquivo STL

```bash
# Copie o .stl para a pasta public/models/
cp meu-projeto.stl public/models/meu-projeto.stl
```

**Convenção de nomes:** use kebab-case, sem espaços, sem acentos.  
✅ `vaso-geometrico.stl`  
❌ `Vaso Geométrico.stl`  
❌ `vaso_geometrico.stl`

### 2. Abrir `src/data/projects.js`

Adicione um novo objeto ao array `PROJECTS`. Use o próximo número de `id` disponível.

### 3. Preencher os campos obrigatórios

Os campos mínimos para o projeto aparecer no site:

| Campo | Obrigatório | Tipo |
|---|---|---|
| `id` | ✅ | string única |
| `slug` | ✅ | string kebab-case |
| `title` | ✅ | string |
| `stlFile` | ✅ | path `/models/arquivo.stl` |
| `filamento` | ✅ | string |
| `peso` | ✅ | string com unidade |
| `tempo` | ✅ | string formatada |

Todos os outros campos são opcionais mas recomendados.

### 4. Verificar no browser

```bash
npm run dev
```

Acesse `http://localhost:5173` e confirme:
- O novo card aparece na galeria
- O STL carrega no viewer (pode demorar alguns segundos)
- O link do título leva para `/projeto/seu-slug`
- Todos os campos aparecem na página de detalhes

---

## Editar um Projeto Existente

Localize o objeto pelo `id` ou `slug` em `projects.js` e edite os campos desejados.

> **Nunca mude o `id` ou o `slug`** de um projeto publicado — isso quebra links externos e o histórico do browser.

---

## Remover um Projeto

1. Remova o objeto do array em `projects.js`
2. Delete o arquivo `.stl` de `public/models/` se não for mais necessário

---

## Projeto em Destaque

Para fazer um projeto aparecer maior na home (card destaque):

```js
destaque: true,
```

Apenas **um** projeto deve ter `destaque: true` por vez. Se mais de um tiver, o primeiro do array será priorizado pelo layout.

---

## Substituir o Arquivo STL de um Projeto

1. Coloque o novo arquivo em `public/models/`
2. Atualize o campo `stlFile` no objeto correspondente em `projects.js`
3. Se o nome do arquivo mudou, delete o arquivo antigo

---

## Convenções de Nomenclatura

| Campo | Formato | Exemplo |
|---|---|---|
| `id` | `projeto-NN` | `projeto-07` |
| `slug` | kebab-case descritivo | `suporte-celular-articulado` |
| `stlFile` | `/models/[slug].stl` | `/models/suporte-celular-articulado.stl` |
| `filamento` | `Tipo Cor` | `PETG Transparente` |
| `dataFabricacao` | `YYYY-MM` | `2025-03` |
| `tempo` | `Xh Ymin` | `5h 45min` |
| `peso` | `Xg` ou `X.Xkg` | `128g` |

---

## Tipos de Filamento Comuns

Para consistência no campo `filamento`:

```
PLA
PLA+
PETG
ABS
ASA
TPU
Resina (SLA)
Nylon
PC (Policarbonato)
```

---

## Troubleshooting

**O STL não carrega no browser:**
- Verifique se o arquivo está em `public/models/` (não em `src/`)
- Confirme que o `stlFile` começa com `/models/` (barra no início)
- Abra o DevTools → Network e veja se o arquivo é encontrado (status 200)

**O projeto não aparece na galeria:**
- Verifique se o objeto foi adicionado corretamente ao array em `projects.js`
- Confirme que todos os campos obrigatórios estão presentes
- Veja se há erro de sintaxe JS no console

**A página de detalhe dá 404:**
- Confirme que o `slug` no objeto é igual ao que está na URL
- Slugs são case-sensitive: `Vaso-Geometrico` ≠ `vaso-geometrico`
