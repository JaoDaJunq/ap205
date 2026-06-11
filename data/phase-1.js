export const PHASE_1 = {
  id: "phase-1",
  order: 1,
  name: "A Primeira Noite",
  description: "O Ap 205, uma noite quente, uma brincadeira idiota e o começo de tudo.",
  available: true,
  isFinal: false,
  objective:
    "Toque nos detalhes da cena. Para guardar essa memória, veja a Porta, o Sofá e o Thomas.",
  sceneClass: "scene-ap-205",
  audio: {
    src: "./assets/audio/fase-1.mp3",
    label: "Lo-fi noturno suave",
  },
  sceneElements: [
    { id: "rug", className: "ap-rug", label: "Tapete" },
    { id: "door", className: "ap-door", label: "Porta de entrada" },
    { id: "window", className: "ap-window", label: "Janela com a noite lá fora" },
    { id: "sofa", className: "ap-sofa", label: "Sofá" },
    { id: "table", className: "ap-table", label: "Mesinha" },
    { id: "thomas", className: "npc-thomas", label: "Thomas" },
  ],
  characters: [
    { id: "joao", variant: "happy", x: 38, y: 54 },
    { id: "alice", variant: "happy", x: 58, y: 54 },
  ],
  objects: [
    {
      id: "porta",
      label: "A Porta",
      required: true,
      position: { x: 5, y: 20, width: 26, height: 54 },
      memory: {
        type: "dialogue",
        title: "A Porta",
        lines: [
          { speaker: "João", text: "Oiii" },
          { speaker: "Alice", text: "Qual o número do ap mesmo?" },
          { speaker: "João", text: "205" },
          { speaker: "Alice", text: "Segundo andarrr" },
          { speaker: "João", text: "chega 4 horas depois: Abre" },
          { speaker: "Alice", text: "OXX KAKAKAKAK" },
          { speaker: "João", text: "Tô brincando kkkkk bocó" },
        ],
        conclusion: "Assim começou tudo. Com uma brincadeira idiota e um sorriso que não saía do rosto.",
      },
    },
    {
      id: "sofa",
      label: "O Sofá",
      required: true,
      position: { x: 27, y: 55, width: 50, height: 26 },
      memory: {
        type: "narration",
        title: "O Sofá",
        text: "Tava tão bom o arzinho. Queria ter ficado mais tempo. Por mim ficava.",
      },
    },
    {
      id: "janela",
      label: "A Janela",
      required: false,
      position: { x: 64, y: 17, width: 30, height: 28 },
      memory: {
        type: "narration",
        title: "A Janela",
        text: "Lajeado lá fora, madrugada, e a única coisa que eu pensava era que não queria sair dali.",
      },
    },
    {
      id: "thomas",
      label: "Thomas",
      required: true,
      position: { x: 78, y: 76, width: 18, height: 14 },
      memory: {
        type: "narration",
        title: "Thomas",
        text: "Sem o Thomas esse dia não teria acontecido. Ele nunca vai deixar a gente esquecer disso.",
      },
    },
  ],
  fragment: {
    id: "fragment-1",
    index: 0,
    title: "Fragmento 1 de 4",
    description: "O primeiro pedaço da imagem final apareceu. Um cantinho do começo de tudo.",
  },
};
