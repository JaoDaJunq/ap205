export const PHASE_5 = {
  id: "phase-5",
  order: 5,
  name: "Carta Final",
  description: "Os fragmentos se juntam e a história vira uma carta.",
  available: true,
  isFinal: true,

  objective:
    "Veja os fragmentos reunidos, leia a carta e guarde esse final com carinho.",

  sceneClass: "scene-final",

  audio: {
    src: "./assets/audio/fase-5.mp3",
    label: "Música final suave",
  },

  musicUrl: "https://youtu.be/VRuayKpk2ok",

  letter: {
    title: "Pra Alice",
    paragraphs: [
      "Essa carta ainda é um placeholder, mas esse espaço é pra fechar tudo do jeito certo.",
      "Cada fase guardou um pedaço nosso: o começo, os domingos, o vôlei, o Planeta e tudo que foi virando memória sem a gente perceber.",
      "No fim, os fragmentos se juntam porque é isso que a gente foi fazendo também: juntando momentos pequenos, piadas internas, sustos, viagens, domingos e histórias que só fazem sentido pra nós dois.",
      "E eu espero que, quando tu chegar aqui, sinta um pouquinho do quanto tudo isso foi pensado com carinho.",
    ],
  },
};
