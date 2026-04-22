# Remotion video project | Eleicao de diretores escolares

Projeto de motion design em codigo desenvolvido com **Remotion**, **React** e **TypeScript** para gerar um video educativo em `1920x1080`, `30 FPS`, com duracao ajustada dinamicamente a partir do audio principal.

Mais do que um video institucional, este repositorio foi organizado como um **case tecnico de programacao de video**: composicao declarativa, sincronizacao por frames, modularizacao em cenas e pipeline de render automatizado.

![Preview tecnico do projeto](docs/thumbnail.png)

## Stack

- `Remotion`
- `React 18`
- `TypeScript`
- `@remotion/cli`
- `@remotion/media-utils`
- `@remotion/google-fonts`

## O que este projeto demonstra

- uso de `Composition` para definir uma renderizacao de video baseada em componentes React
- calculo dinamico de `durationInFrames` a partir do audio com `getAudioDurationInSeconds()`
- organizacao da timeline em **10 cenas independentes**
- sincronizacao de legendas por janelas de fala medidas em frames
- carregamento controlado de fonte com `delayRender()` e `continueRender()`
- separacao clara entre logica de timeline, dados, componentes visuais e assets

## Arquitetura tecnica

### 1. Entrada da aplicacao

O entrypoint do Remotion fica em `src/index.ts`, onde o projeto registra a raiz com:

```ts
registerRoot(Root);
```

### 2. Composicao principal

Em `src/Root.tsx`, a composicao `MainVideo` define:

- `fps`: `30`
- `width`: `1920`
- `height`: `1080`
- `calculateMetadata`: leitura da duracao real do audio antes do render

O comportamento importante aqui e que o video **nao usa uma duracao fixa rigida**. Em vez disso, a duracao final e calculada a partir de `public/audio-back.mp3`, garantindo que a timeline acompanhe o audio principal.

### 3. Orquestracao da timeline

Em `src/MainVideo.tsx`, a aplicacao:

- renderiza o audio com `staticFile(AUDIO_FILE)`
- calcula os intervalos das cenas com `buildSceneTimings()`
- seleciona a cena ativa com base no frame global
- aplica transicoes de opacidade entre cenas
- mantem uma `ProgressBar` global ao longo de toda a composicao

### 4. Camada de dados

O arquivo `src/constants.ts` centraliza configuracoes da timeline, como:

- `FPS`, `WIDTH`, `HEIGHT`
- arquivo de audio principal
- frames de transicao
- mapa de janelas de fala
- pontos de inicio de cada cena

O arquivo `src/data/subtitles.ts` converte as janelas de fala medidas em uma estrutura de legendas por cena, garantindo sincronizacao consistente entre narracao e texto na tela.

### 5. Sistema de cenas e componentes

O projeto esta separado em:

- `src/scenes/`: cenas da narrativa
- `src/components/`: elementos visuais reutilizaveis
- `src/data/`: dados de legenda e sincronizacao
- `src/types.ts`: contratos tipados da timeline

Essa separacao facilita:

- manutencao
- extensao da timeline
- reaproveitamento de componentes
- substituicao de audio, textos ou cena sem refatoracao estrutural

## Pipeline de render

### Studio

```bash
npm run start
```

Abre o Remotion Studio para inspecionar a composicao `MainVideo`, navegar frame a frame e validar animacoes, alinhamento e legendas.

### Render final

```bash
npm run render
```

Gera:

```text
out/school-election.mp4
```

Configuracao atual:

- codec `h264`
- `crf=18`
- sobrescrita automatica do output

### Master em alta qualidade

```bash
npm run render:master
```

Gera uma saida em ProRes com audio PCM, util para pos-producao ou arquivamento.

### Export de frames

```bash
npm run render:frames
```

Exporta a timeline como sequencia de imagens.

### Thumbnail versionada

```bash
npm run thumbnail
```

Gera a imagem de preview usada no proprio README:

```text
docs/thumbnail.png
```

### Validacao de tipos

```bash
npm run typecheck
```

Executa `tsc --noEmit`.

## Estrutura do repositorio

```text
.
|- public/
|  |- audio-back.mp3
|  `- brasao-vitoria.png
|- src/
|  |- components/
|  |- data/
|  |- scenes/
|  |- constants.ts
|  |- MainVideo.tsx
|  |- Root.tsx
|  |- index.ts
|  `- types.ts
|- docs/
|  `- thumbnail.png
|- assets/
|  |- README.md
|  `- raw/               # materiais brutos e arquivos de processo
|- remotion.config.ts
|- package.json
`- README.md
```

## Decisoes tecnicas relevantes

### Public dir dedicada

`remotion.config.ts` define `Config.setPublicDir("public")` para manter os assets de runtime isolados e evitar que pastas de ambiente local entrem no bundle.

### Duracao orientada por audio

Em vez de fixar manualmente a timeline, o projeto usa `calculateMetadata()` para ajustar a composicao a partir da duracao real do audio. Isso evita drift entre narracao e video.

### Sincronizacao por frames

As legendas nao sao "soltas" na interface: elas sao derivadas de intervalos medidos (`from` / `to`) e transformadas em cues tipados por cena.

### Animacao declarativa

As cenas usam primitivas do Remotion como:

- `spring()`
- `interpolate()`
- `useCurrentFrame()`
- `useVideoConfig()`
- `AbsoluteFill`

Isso mantem a animacao previsivel, reproduzivel e facil de refatorar.

## Como adaptar este projeto

Se voce quiser reutilizar este case para outro video em Remotion, os pontos principais de troca sao:

- `public/audio-back.mp3`: trilha/narracao principal
- `src/data/subtitles.ts`: textos e sincronizacao
- `src/constants.ts`: timings, transicoes e resolucao
- `src/scenes/`: layout e narrativa visual de cada etapa

## Assets e versionamento

O repositorio publico mantem apenas os assets necessarios para o render atual.

- `public/` contem os arquivos usados em runtime
- `assets/raw/` guarda materiais brutos, testes e variacoes
- `out/` fica fora do Git para nao versionar renders pesados

## Posicionamento do projeto

Este repositorio foi preparado para portfolio com foco em:

- engenharia de video com Remotion
- arquitetura de composicoes React para motion
- sincronizacao audiovisual orientada por dados
- organizacao de um pipeline de render local em TypeScript

## Autoria

- Autor(a): `[Seu nome aqui]`
- GitHub: `[https://github.com/seu-usuario](https://github.com/seu-usuario)`
- LinkedIn: `[https://www.linkedin.com/in/seu-perfil](https://www.linkedin.com/in/seu-perfil)`

## Creditos e observacoes

- Alguns assets visuais e de audio podem ter origem institucional ou de terceiros e podem exigir credito ou restricoes de uso especificas.
- Este repositorio nao esta sendo publicado com uma licenca aberta neste momento.
- Antes de reutilizar os assets, revise a origem e os direitos de cada arquivo.
