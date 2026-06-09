import { PHASE_1 } from "../data/phase-1.js";
import { PHASE_2 } from "../data/phase-2.js";
import { PHASE_3 } from "../data/phase-3.js";
import { PHASE_4 } from "../data/phase-4.js";
import { PHASE_5 } from "../data/phase-5.js";

export const PHASES = [PHASE_1, PHASE_2, PHASE_3, PHASE_4, PHASE_5];

export const FRAGMENT_IDS = [
  "fragment-1",
  "fragment-2",
  "fragment-3",
  "fragment-4",
];

export function getPhaseById(phaseId) {
  return PHASES.find((phase) => phase.id === phaseId);
}

export function getFinalPhase() {
  return PHASE_5;
}

export function areAllFragmentsUnlocked(state) {
  return FRAGMENT_IDS.every((fragmentId) =>
    state.unlockedFragments.includes(fragmentId)
  );
}

export function isPhaseUnlocked(phase, state) {
  if (phase.isFinal) {
    return areAllFragmentsUnlocked(state);
  }

  return phase.available !== false;
}

export function getPhaseStatus(phase, state) {
  if (phase.isFinal && !areAllFragmentsUnlocked(state)) {
    return {
      label: "bloqueada",
      className: "is-locked",
      disabled: true,
    };
  }

  if (phase.available === false) {
    return {
      label: "em breve",
      className: "is-locked",
      disabled: true,
    };
  }

  if (state.completedPhases.includes(phase.id)) {
    return {
      label: "concluída",
      className: "is-done",
      disabled: false,
    };
  }

  return {
    label: "disponível",
    className: "",
    disabled: false,
  };
}