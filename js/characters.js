export const CHARACTER_LIBRARY = {
  joao: {
    id: "joao",
    name: "João",
  },
  alice: {
    id: "alice",
    name: "Alice",
  },
};

export function createCharacterNode(characterConfig) {
  const characterData = CHARACTER_LIBRARY[characterConfig.id] || {
    id: characterConfig.id,
    name: characterConfig.name || "Personagem",
  };

  const node = document.createElement("div");
  const variant = characterConfig.variant || "idle";

  node.className = [
    "character",
    `character-${characterData.id}`,
    `character-${variant}`,
  ].join(" ");

  node.style.left = `${characterConfig.x}%`;
  node.style.top = `${characterConfig.y}%`;
  node.style.width = characterConfig.width ? `${characterConfig.width}%` : "";
  node.style.height = characterConfig.height ? `${characterConfig.height}%` : "";
  node.setAttribute("aria-label", characterData.name);

  node.innerHTML = `
    <div class="character-head"></div>
    <div class="character-body"></div>
    <div class="character-name">${characterData.name}</div>
  `;

  return node;
}