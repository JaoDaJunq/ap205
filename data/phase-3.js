export const PHASE_3 = {
  id: "phase-3",
  order: 3,
  name: "Uma Noite no Ginásio",
  description: "A quadra, a arquibancada e ela torcendo por mim mesmo tarde da noite.",
  available: true,
  isFinal: false,

  objective:
    "Toque nos detalhes da cena. Para guardar essa memória, veja a Arquibancada, a Rede e o Placar.",

  sceneClass: "scene-volei",

  audio: {
    src: "./assets/audio/fase-3.mp3",
    label: "Música leve de ginásio à noite",
  },

  sceneElements: [
    {
      id: "gym-lights",
      className: "volei-lights",
      label: "Holofotes do ginásio",
    },
    {
      id: "scoreboard",
      className: "volei-scoreboard",
      label: "Placar luminoso",
    },
    {
      id: "bleachers",
      className: "volei-bleachers",
      label: "Arquibancada",
    },
    {
      id: "court",
      className: "volei-court",
      label: "Quadra de vôlei",
    },
    {
      id: "net",
      className: "volei-net",
      label: "Rede de vôlei",
    },
    {
      id: "ball",
      className: "volei-ball",
      label: "Bola de vôlei",
    },
    {
      id: "court-glow",
      className: "volei-court-glow",
      label: "Reflexo dos holofotes",
    },
  ],

  characters: [
    {
      id: "alice",
      variant: "happy",
      x: 21,
      y: 42,
      width: 18,
      height: 25,
    },
    {
      id: "joao",
      variant: "happy",
      x: 56,
      y: 67,
      width: 19,
      height: 27,
    },
  ],

  objects: [
    {
      id: "arquibancada",
      label: "A Arquibancada",
      required: true,
      position: {
        x: 4,
        y: 31,
        width: 38,
        height: 29,
      },
      memory: {
        type: "narration",
        title: "A Arquibancada",
        text:
          "Ela foi. Mesmo sendo tarde, mesmo sendo longe. Ficou lá na arquibancada torcendo por mim.",
      },
    },
    {
      id: "rede",
      label: "A Rede",
      required: true,
      position: {
        x: 42,
        y: 39,
        width: 17,
        height: 35,
      },
      memory: {
        type: "dialogue",
        title: "A Rede",
        lines: [
          {
            speaker: "João",
            text: "Você não precisa vir sabe, é tarde",
          },
          {
            speaker: "Alice",
            text: "Eu quero ir",
          },
          {
            speaker: "João",
            text: "Vai ser chato",
          },
          {
            speaker: "Alice",
            text: "João.",
          },
          {
            speaker: "João",
            text: "tá bom kkkkk",
          },
        ],
        conclusion: "Ela sempre apareceu quando importava.",
      },
    },
    {
      id: "placar",
      label: "O Placar",
      required: true,
      position: {
        x: 34,
        y: 10,
        width: 33,
        height: 16,
      },
      memory: {
        type: "narration",
        title: "O Placar",
        text:
          "Ganhamos, perdemos, tanto faz. O que importava era ela lá quando eu olhava pras arquibancadas.",
      },
    },
    {
      id: "bola",
      label: "A Bola",
      required: false,
      position: {
        x: 66,
        y: 70,
        width: 16,
        height: 13,
      },
      memory: {
        type: "narration",
        title: "A Bola",
        text:
          "Vôlei sempre foi meu espaço. Mas ficou melhor quando ela passou a fazer parte.",
      },
    },
  ],

  fragment: {
    id: "fragment-3",
    index: 2,
    title: "Fragmento 3 de 4",
    description: "Ela foi. Sempre foi.",
  },
};
