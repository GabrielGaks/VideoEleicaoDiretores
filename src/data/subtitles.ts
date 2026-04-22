import type { SubtitleCue } from "../types";
import {
  AUDIO_SPEECH_WINDOWS,
  SCENE_LINE_COUNTS,
  SCENE_START_FRAMES,
  SUBTITLE_DELAY_FRAMES,
} from "../constants";

const SUBTITLE_TEXTS = [
  [
    "Voc\u00ea sabe como \u00e9 escolhido o diretor da escola?",
    "Muita gente pensa que \u00e9 algu\u00e9m de fora que decide\u2026",
    "Mas, na verdade, \u00e9 a pr\u00f3pria comunidade escolar que participa dessa escolha.",
  ],
  [
    "Tudo come\u00e7a com a organiza\u00e7\u00e3o do processo.",
    "Primeiro, \u00e9 formada uma equipe respons\u00e1vel por cuidar de tudo.",
    "Essa equipe define as regras, organiza o calend\u00e1rio e garante que tudo aconte\u00e7a de forma justa.",
  ],
  [
    "Depois disso, come\u00e7a a etapa de inscri\u00e7\u00e3o.",
    "As pessoas interessadas em se tornar diretor se candidatam.",
    "Mas aten\u00e7\u00e3o: s\u00f3 pode participar quem cumpre todos os requisitos definidos.",
  ],
  [
    "Com as inscri\u00e7\u00f5es feitas, chega o momento da divulga\u00e7\u00e3o.",
    "Os nomes dos candidatos s\u00e3o apresentados para toda a escola, para que todos saibam quem est\u00e1 participando.",
  ],
  [
    "Em seguida, come\u00e7a a campanha.",
    "\u00c9 nesse momento que os candidatos apresentam suas ideias e propostas para melhorar a escola.",
    "Tudo deve acontecer com respeito, responsabilidade e igualdade entre todos.",
  ],
  [
    "Agora vem uma das partes mais importantes: a vota\u00e7\u00e3o.",
    "Podem votar todos os professores, servidores que atuam na unidade de ensino, pais de alunos, estudantes a partir de 10 anos que estudam na unidade e um representante da comunidade local.",
    "Ou seja, toda a comunidade escolar est\u00e1 representada nesse momento de decis\u00e3o.",
  ],
  [
    "No dia da vota\u00e7\u00e3o, cada pessoa escolhe seu candidato.",
    "O voto \u00e9 secreto, garantindo que cada um possa decidir com liberdade e responsabilidade.",
  ],
  [
    "Depois que todos votam, come\u00e7a a apura\u00e7\u00e3o.",
    "Os votos s\u00e3o contados com cuidado, sempre acompanhados pela equipe respons\u00e1vel.",
    "Isso garante que todo o processo seja correto.",
  ],
  [
    "E finalmente, chegamos ao resultado.",
    "O candidato mais votado \u00e9 escolhido como diretor da escola.",
  ],
  [
    "Esse processo \u00e9 muito importante, porque garante que a escola seja constru\u00edda com a participa\u00e7\u00e3o de todos.",
    "Agora voc\u00ea j\u00e1 sabe: a escolha do diretor \u00e9 feita de forma democr\u00e1tica.",
    "Com a colabora\u00e7\u00e3o de toda a comunidade escolar.",
  ],
] as const;

const buildSubtitles = (): Record<number, SubtitleCue[]> => {
  const subtitles: Record<number, SubtitleCue[]> = {};
  let speechCursor = 0;

  SUBTITLE_TEXTS.forEach((sceneTexts, sceneIndex) => {
    const sceneStart = SCENE_START_FRAMES[sceneIndex] ?? 0;
    const expectedLineCount = SCENE_LINE_COUNTS[sceneIndex] ?? 0;

    if (sceneTexts.length !== expectedLineCount) {
      throw new Error(
        `Scene ${sceneIndex + 1} has ${sceneTexts.length} lines, expected ${expectedLineCount}.`
      );
    }

    subtitles[sceneIndex] = sceneTexts.map((text) => {
      const speechWindow = AUDIO_SPEECH_WINDOWS[speechCursor];
      speechCursor += 1;

      if (!speechWindow) {
        throw new Error("Missing measured audio window for subtitle line.");
      }

      return {
        from: speechWindow.from - sceneStart + SUBTITLE_DELAY_FRAMES,
        to: speechWindow.to - sceneStart + SUBTITLE_DELAY_FRAMES,
        text,
      };
    });
  });

  if (speechCursor !== AUDIO_SPEECH_WINDOWS.length) {
    throw new Error(
      `Audio sync map has ${AUDIO_SPEECH_WINDOWS.length} windows, consumed ${speechCursor}.`
    );
  }

  return subtitles;
};

export const SUBTITLES: Record<number, SubtitleCue[]> = buildSubtitles();
