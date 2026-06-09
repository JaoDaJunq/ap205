let audioElement = null;
let currentTrack = "";
let audioEnabled = false;
let audioUnlocked = false;
let onStatusChange = () => {};

function emitStatus(extra = {}) {
  onStatusChange({
    enabled: audioEnabled,
    unlocked: audioUnlocked,
    currentTrack,
    paused: audioElement ? audioElement.paused : true,
    ...extra,
  });
}

function createAudioElement() {
  const audio = new Audio();

  audio.loop = true;
  audio.volume = 0.32;
  audio.preload = "auto";

  audio.addEventListener("play", () => emitStatus());
  audio.addEventListener("pause", () => emitStatus());
  audio.addEventListener("error", () => {
    emitStatus({
      error: "Não foi possível carregar a música desta fase.",
    });
  });

  return audio;
}

async function tryPlay() {
  if (!audioElement || !currentTrack || !audioEnabled) {
    emitStatus();
    return false;
  }

  try {
    await audioElement.play();
    audioUnlocked = true;
    emitStatus();
    return true;
  } catch (error) {
    console.warn("Áudio bloqueado ou indisponível:", error);
    emitStatus({
      error: "O áudio precisa de interação da usuária para começar.",
    });
    return false;
  }
}

export function initAudio(options = {}) {
  audioElement = createAudioElement();
  audioEnabled = Boolean(options.initialEnabled);
  onStatusChange = options.onStatusChange || (() => {});
  emitStatus();
}

export function setTrack(trackPath) {
  if (!audioElement) return;

  if (!trackPath) {
    currentTrack = "";
    audioElement.pause();
    audioElement.removeAttribute("src");
    emitStatus();
    return;
  }

  if (currentTrack === trackPath) {
    if (audioEnabled) {
      tryPlay();
    }
    return;
  }

  currentTrack = trackPath;
  audioElement.pause();
  audioElement.src = trackPath;
  audioElement.load();

  if (audioEnabled) {
    tryPlay();
  } else {
    emitStatus();
  }
}

export async function enableAudio() {
  audioEnabled = true;
  return tryPlay();
}

export function disableAudio() {
  audioEnabled = false;

  if (audioElement) {
    audioElement.pause();
  }

  emitStatus();
}

export async function toggleAudio() {
  if (audioEnabled) {
    disableAudio();
    return false;
  }

  await enableAudio();
  return true;
}

export function isAudioEnabled() {
  return audioEnabled;
}

export function hasTrack() {
  return Boolean(currentTrack);
}