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

const VALID_VARIANTS = ["idle", "happy", "talking"];

function getSafeVariant(variant) {
  if (VALID_VARIANTS.includes(variant)) {
    return variant;
  }

  return "idle";
}

function getCharacterImagePath(characterId, variant) {
  return `./assets/characters/${characterId}-${variant}.png`;
}

export function createCharacterNode(characterConfig) {
  const characterData = CHARACTER_LIBRARY[characterConfig.id] || {
    id: characterConfig.id,
    name: characterConfig.name || "Personagem",
  };

  const variant = getSafeVariant(characterConfig.variant || "idle");

  const node = document.createElement("div");

  node.className = [
    "character",
    `character-${characterData.id}`,
    `character-${variant}`,
  ].join(" ");

  node.style.left = `${characterConfig.x}%`;
  node.style.top = `${characterConfig.y}%`;

  if (characterConfig.width) {
    node.style.width = `${characterConfig.width}%`;
  }

  if (characterConfig.height) {
    node.style.height = `${characterConfig.height}%`;
  }

  node.setAttribute("aria-label", `${characterData.name} ${variant}`);
  node.setAttribute("role", "img");

  const image = document.createElement("img");

  image.src = getCharacterImagePath(characterData.id, variant);
  image.alt = characterData.name;
  image.draggable = false;
  image.loading = "eager";

  image.style.width = "100%";
  image.style.height = "100%";
  image.style.display = "block";
  image.style.objectFit = "contain";
  image.style.objectPosition = "center bottom";
  image.style.mixBlendMode = "multiply";
  image.style.pointerEvents = "none";
  image.style.userSelect = "none";

  image.addEventListener("error", () => {
    if (variant !== "idle") {
      image.src = getCharacterImagePath(characterData.id, "idle");
    }
  });

  node.appendChild(image);

  return node;
}