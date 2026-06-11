export const PHASE_4 = {
  id: "phase-4",
  order: 4,
  name: "Planeta Atlântida",
  description: "Festival, luzes, palco e uma noite que virou memória pra sempre.",
  available: true,
  isFinal: false,

  objective:
    "Toque nos detalhes da cena. Para guardar essa memória, veja o Palco, a Multidão, as Luzes do Festival e o Microfone.",

  sceneClass: "scene-planeta",

  audio: {
    src: "./assets/audio/fase-4.mp3",
    label: "Clima festival acústico e praiano",
  },

  sceneElements: [
    {
      id: "sky",
      className: "planeta-sky-stars",
      label: "Céu estrelado",
    },
    {
      id: "stage-glow",
      className: "planeta-stage-glow",
      label: "Brilho do palco",
    },
    {
      id: "festival-sign",
      className: "planeta-sign",
      label: "Letreiro Planeta Atlântida",
    },
    {
      id: "stage",
      className: "planeta-stage",
      label: "Palco do festival",
    },
    {
      id: "stage-screen-left",
      className: "planeta-screen planeta-screen-left",
      label: "Telão esquerdo",
    },
    {
      id: "stage-screen-right",
      className: "planeta-screen planeta-screen-right",
      label: "Telão direito",
    },
    {
      id: "lights",
      className: "planeta-lights",
      label: "Luzes do festival",
    },
    {
      id: "microphone",
      className: "planeta-microphone",
      label: "Microfone",
    },
    {
      id: "crowd",
      className: "planeta-crowd",
      label: "Multidão",
    },
    {
      id: "grass",
      className: "planeta-grass",
      label: "Gramado",
    },
  ],

  characters: [
    {
      id: "joao",
      variant: "happy",
      x: 45,
      y: 66,
      width: 18,
      height: 26,
    },
    {
      id: "alice",
      variant: "happy",
      x: 57,
      y: 66,
      width: 18,
      height: 26,
    },
  ],

  objects: [
    {
      id: "palco",
      label: "O Palco",
      required: true,
      position: {
        x: 24,
        y: 23,
        width: 52,
        height: 32,
      },
      memory: {
        type: "narration",
        title: "O Palco",
        text:
          "A gente subiu naquele palco junto. No meio do show do Vitor Kley. Eu não consigo explicar o que foi aquilo.",
      },
    },
    {
      id: "multidao",
      label: "A Multidão",
      required: true,
      position: {
        x: 7,
        y: 57,
        width: 86,
        height: 24,
      },
      memory: {
        type: "narration",
        title: "A Multidão",
        text:
          "Todo mundo cantando junto. A gente no meio de tudo aquilo, mas era como se fosse só a gente dois.",
      },
    },
    {
      id: "luzes",
      label: "As Luzes do Festival",
      required: true,
      position: {
        x: 16,
        y: 10,
        width: 68,
        height: 19,
      },
      memory: {
        type: "dialogue",
        title: "As Luzes do Festival",
        lines: [
          {
            speaker: "Alice",
            text: "Que lindo",
          },
          {
            speaker: "João",
            text: "É",
          },
          {
            speaker: "Alice",
            text: "Tô feliz demais",
          },
          {
            speaker: "João",
            text: "Eu também",
          },
          {
            speaker: "Alice",
            text: "Obrigada por ter trazido",
          },
          {
            speaker: "João",
            text: "Obrigada por ter vindo",
          },
        ],
        conclusion:
          "Alguns momentos a gente não esquece nunca. Esse é um deles.",
      },
    },
    {
      id: "ceu",
      label: "O Céu Estrelado",
      required: false,
      position: {
        x: 0,
        y: 0,
        width: 100,
        height: 24,
      },
      memory: {
        type: "narration",
        title: "O Céu Estrelado",
        text:
          "Armandinho, Veigh, Vitor Kley... cada música era uma memória sendo criada em tempo real.",
      },
    },
    {
      id: "microfone",
      label: "O Microfone",
      required: true,
      position: {
        x: 45,
        y: 42,
        width: 14,
        height: 23,
      },
      memory: {
        type: "narration",
        title: "O Microfone",
        text:
          "Subir naquele palco com ela foi uma das coisas mais especiais que já vivi. A música tocando, a multidão lá embaixo, ela do lado. Aquele momento foi nosso.",
      },
    },
  ],

  fragment: {
    id: "fragment-4",
    index: 3,
    title: "Fragmento 4 de 4",
    description: "O último pedaço. Aquela noite que foi nossa.",
  },
};
