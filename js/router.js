const screenRegistry = new Map();
let currentScreen = null;

export function initRouter() {
  document.querySelectorAll("[data-screen]").forEach((screen) => {
    screenRegistry.set(screen.dataset.screen, screen);
  });
}

export function showScreen(screenName) {
  const nextScreen = screenRegistry.get(screenName);

  if (!nextScreen) {
    console.warn(`Tela não encontrada: ${screenName}`);
    return;
  }

  screenRegistry.forEach((screen) => {
    screen.classList.remove("is-active");
  });

  nextScreen.classList.add("is-active");
  currentScreen = screenName;

  window.scrollTo({
    top: 0,
    behavior: "instant" in window ? "instant" : "auto",
  });
}

export function getCurrentScreen() {
  return currentScreen;
}