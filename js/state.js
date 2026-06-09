const STORAGE_KEY = "ap205-game-state-v1";

const DEFAULT_STATE = {
  hasStarted: false,
  completedPhases: [],
  unlockedFragments: [],
  seenMemories: {},
  audioEnabled: false,
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function safeParse(rawValue) {
  try {
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

function normalizeState(savedState) {
  return {
    ...clone(DEFAULT_STATE),
    ...(savedState || {}),
    completedPhases: Array.isArray(savedState?.completedPhases)
      ? savedState.completedPhases
      : [],
    unlockedFragments: Array.isArray(savedState?.unlockedFragments)
      ? savedState.unlockedFragments
      : [],
    seenMemories:
      savedState?.seenMemories && typeof savedState.seenMemories === "object"
        ? savedState.seenMemories
        : {},
  };
}

export function getState() {
  const savedState = safeParse(localStorage.getItem(STORAGE_KEY));
  return normalizeState(savedState);
}

export function saveState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeState(nextState)));
}

export function updateState(updater) {
  const currentState = getState();
  const nextState = updater(clone(currentState));
  saveState(nextState);
  return getState();
}

export function setStarted() {
  return updateState((state) => {
    state.hasStarted = true;
    return state;
  });
}

export function setAudioEnabled(isEnabled) {
  return updateState((state) => {
    state.audioEnabled = Boolean(isEnabled);
    return state;
  });
}

export function getSeenMemoriesForPhase(phaseId) {
  const state = getState();
  return state.seenMemories[phaseId] || [];
}

export function isMemorySeen(phaseId, objectId) {
  return getSeenMemoriesForPhase(phaseId).includes(objectId);
}

export function markMemorySeen(phaseId, objectId) {
  return updateState((state) => {
    if (!state.seenMemories[phaseId]) {
      state.seenMemories[phaseId] = [];
    }

    if (!state.seenMemories[phaseId].includes(objectId)) {
      state.seenMemories[phaseId].push(objectId);
    }

    return state;
  });
}

export function getRequiredObjects(phase) {
  return (phase.objects || []).filter((object) => object.required);
}

export function getSeenRequiredObjects(phase) {
  return getRequiredObjects(phase).filter((object) =>
    isMemorySeen(phase.id, object.id)
  );
}

export function areRequiredMemoriesSeen(phase) {
  const requiredObjects = getRequiredObjects(phase);

  if (!requiredObjects.length) return false;

  return requiredObjects.every((object) =>
    isMemorySeen(phase.id, object.id)
  );
}

export function isPhaseCompleted(phaseId) {
  return getState().completedPhases.includes(phaseId);
}

export function isFragmentUnlocked(fragmentId) {
  return getState().unlockedFragments.includes(fragmentId);
}

export function completePhase(phase) {
  return updateState((state) => {
    if (!state.completedPhases.includes(phase.id)) {
      state.completedPhases.push(phase.id);
    }

    if (phase.fragment?.id && !state.unlockedFragments.includes(phase.fragment.id)) {
      state.unlockedFragments.push(phase.fragment.id);
    }

    return state;
  });
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  return getState();
}