# Video educativo sobre eleicao de diretores escolares

Projeto de portfolio desenvolvido com **Remotion**, **React** e **TypeScript** para criar um video educativo animado em portugues do Brasil sobre o processo de eleicao de diretores escolares.

![Preview do projeto](docs/thumbnail.png)

## Visao geral

Este projeto foi pensado como um case de portfolio que combina narrativa audiovisual, motion design em codigo e organizacao de uma composicao completa em multiplas cenas.

O video apresenta, de forma acessivel e visual, as principais etapas da escolha democratica de diretores escolares:

- organizacao do processo
- inscricao de candidaturas
- divulgacao
- campanha
- votacao
- apuracao
- resultado final

## Objetivo

Criar um material audiovisual claro, didatico e visualmente atraente para explicar como a comunidade escolar participa da escolha da direcao da escola.

## Publico-alvo

- estudantes
- familias
- servidores e professores
- comunidade escolar em geral
- equipes interessadas em comunicacao institucional com motion design em codigo

## Stack utilizada

- `Remotion`
- `React 18`
- `TypeScript`
- `@remotion/google-fonts`
- `@remotion/media-utils`

## Destaques tecnicos

- composicao principal em `1920x1080` a `30 FPS`
- duracao do video calculada automaticamente a partir do audio principal
- estrutura modular com separacao entre `components`, `scenes` e `data`
- legendas sincronizadas por janelas de fala mapeadas em frames
- elementos visuais reutilizaveis para personagens, cards, fundos e icones
- pipeline simples para studio, render final, master e thumbnail

## Estrutura do projeto

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
|  `- Root.tsx
|- docs/
|  `- thumbnail.png
|- assets/
|  |- README.md
|  `- raw/               # materiais brutos e arquivos de processo (ignorados no Git)
|- remotion.config.ts
|- package.json
`- README.md
```

## Como executar localmente

### 1. Instalar dependencias

```bash
npm install
```

### 2. Abrir o Remotion Studio

```bash
npm run start
```

### 3. Gerar o video final

```bash
npm run render
```

### 4. Gerar uma thumbnail do projeto

```bash
npm run thumbnail
```

### 5. Validar tipagem

```bash
npm run typecheck
```

## Scripts disponiveis

- `npm run start`: abre o Remotion Studio para edicao e preview
- `npm run render`: gera o video final em `out/school-election.mp4`
- `npm run render:hd`: gera a versao H.264 do projeto
- `npm run render:master`: gera uma versao master em ProRes
- `npm run render:frames`: exporta os frames em sequencia de imagens
- `npm run still`: gera uma imagem estatica em `out/thumbnail.png`
- `npm run thumbnail`: gera a thumbnail versionada em `docs/thumbnail.png`
- `npm run typecheck`: executa a validacao de tipos com TypeScript

## Resultado esperado

O resultado final e um video educativo animado, com identidade visual consistente, ritmo guiado pelo audio e mensagens distribuidas em cenas tematicas. O projeto foi organizado para ser facil de entender, executar e apresentar como portfolio tecnico.

## Organizacao para portfolio

Para deixar o repositorio mais profissional e pronto para publicacao:

- `public/` contem apenas os assets necessarios para o render atual
- `assets/raw/` guarda arquivos brutos e materiais de processo
- `out/` fica fora do versionamento para nao subir renders pesados
- `.agents/`, `.claude/` e dependencias locais tambem ficam ignorados

## Melhorias futuras

- adicionar uma GIF curta ou video demonstrativo no README
- incluir bastidores do processo criativo e storyboard
- criar variacoes de formato para redes sociais
- parametrizar textos e trilhas para reaproveitamento em outros videos

## Autoria

Projeto organizado e apresentado como case de portfolio pessoal.

- Autor(a): `[Seu nome aqui]`
- GitHub: `[https://github.com/seu-usuario](https://github.com/seu-usuario)`
- LinkedIn: `[https://www.linkedin.com/in/seu-perfil](https://www.linkedin.com/in/seu-perfil)`

## Creditos e observacoes

- Alguns assets visuais e de audio podem ter origem institucional ou de terceiros e podem exigir credito ou restricoes de uso especificas.
- Este repositorio nao esta sendo publicado com uma licenca aberta neste momento.
- Antes de publicar externamente ou reutilizar os materiais, revise a origem e os direitos de cada asset.
