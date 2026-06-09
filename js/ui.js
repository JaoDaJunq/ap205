import { PHASES, FRAGMENT_IDS, getPhaseById, getPhaseStatus } from "./phases.js";
import { createCharacterNode } from "./characters.js";

let deps = null;
let currentPhase = null;
let currentMemoryObject = null;
let currentDialogueIndex = 0;
let resetTimer = null;

const dom = {};

function qs(selector) {
  return document.querySelector(selector);
}

function cacheDom() {
  dom.startTitle = qs("#start-title");
  dom.btnStartGame = qs("#btn-start-game");
  dom.btnContinueGame = qs("#btn-continue-game");
  dom.resetHint = qs("#reset-hint");

  dom.phaseList = qs("#phase-list");
  dom.completedCount = qs("#completed-count");
  dom.fragmentCount = qs("#fragment-count");
  dom.fragmentPreviewGrid = qs("#fragment-preview-grid");

  dom.btnMapAudio = qs("#btn-map-audio");
  dom.btnPhaseAudio = qs("#btn-phase-audio");

  dom.btnBackToMap = qs("#btn-back-to-map");
  dom.phaseKicker = qs("#phase-kicker");
  dom.phaseTitle = qs("#phase-title");
  dom.phaseObjective = qs("#phase-objective");
  dom.sceneStage = qs("#scene-stage");
  dom.requiredProgress = qs("#required-progress");
  dom.btnCompletePhase = qs("#btn-complete-phase");

  dom.fragmentTitle = qs("#fragment-title");
  dom.fragmentDescription = qs("#fragment-description");
  dom.fragmentRevealCard = qs("#fragment-reveal-card");
  dom.btnReturnMapAfterFragment = qs("#btn-return-map-after-fragment");

  dom.finalFragmentComposition = qs("#final-fragment-composition");
  dom.finalLetterContent = qs("#final-letter-content");
  dom.btnFinalBackMap = qs("#btn-final-back-map");

  dom.memoryModal = qs("#memory-modal");
  dom.memoryModalTitle = qs("#memory-modal-title");
  dom.memoryModalKicker = qs("#memory-modal-kicker");
  dom.memoryModalBody = qs("#memory-modal-body");
  dom.btnCloseMemory = qs("#btn-close-memory");
  dom.btnNextDialogue = qs("#btn-next-dialogue");
  dom.btnFinishMemory = qs("#btn-finish-memory");

  dom.resetModal = qs("#reset-modal");
  dom.btnConfirmReset = qs("#btn-confirm-reset");

  dom.audioConsent = qs("#audio-consent");
  dom.btnEnableAudio = qs("#btn-enable-audio");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setAudioButtonsState() {
  const isEnabled = deps.Audio.isAudioEnabled();

  [dom.btnMapAudio, dom.btnPhaseAudio].forEach((button) => {
    if (!button) return;

    button.classList.toggle("is-active", isEnabled);
    button.setAttribute(
      "aria-label",
      isEnabled ? "Desligar música" : "Ligar música"
    );
  });

  syncAudioConsent();
}

function syncAudioConsent() {
  if (!dom.audioConsent) return;

  const shouldShow =
    currentPhase &&
    deps.Audio.hasTrack() &&
    !deps.Audio.isAudioEnabled();

  dom.audioConsent.hidden = !shouldShow;
}

function makeFragmentCell(fragmentId, index, unlocked) {
  const cell = document.createElement("div");
  cell.className = `fragment-cell${unlocked ? " is-unlocked" : ""}`;
  cell.dataset.fragmentId = fragmentId;
  cell.innerHTML = `<span>${unlocked ? index + 1 : "?"}</span>`;
  return cell;
}

function renderFragmentsGrid(container) {
  const state = deps.State.getState();
  container.innerHTML = "";

  FRAGMENT_IDS.forEach((fragmentId, index) => {
    container.appendChild(
      makeFragmentCell(
        fragmentId,
        index,
        state.unlockedFragments.includes(fragmentId)
      )
    );
  });
}

export function renderStart() {
  const state = deps.State.getState();
  dom.btnContinueGame.hidden = !state.hasStarted;
  dom.resetHint.classList.toggle("is-visible", state.hasStarted);
}

function renderMap() {
  const state = deps.State.getState();

  dom.completedCount.textContent = state.completedPhases.length;
  dom.fragmentCount.textContent = `${state.unlockedFragments.length}/4`;

  dom.phaseList.innerHTML = "";

  PHASES.forEach((phase, index) => {
    const status = getPhaseStatus(phase, state);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "phase-card";
    button.dataset.phaseId = phase.id;
    button.disabled = status.disabled;

    button.innerHTML = `
      <div class="phase-number">${index + 1}</div>
      <div>
        <h3>${escapeHtml(phase.name)}</h3>
        <p>${escapeHtml(phase.description || "")}</p>
      </div>
      <span class="phase-status ${status.className}">
        ${status.label}
      </span>
    `;

    dom.phaseList.appendChild(button);
  });

  renderFragmentsGrid(dom.fragmentPreviewGrid);
}

function renderSceneElements(phase) {
  const sceneGraphic = document.createElement("div");
  sceneGraphic.className = `scene-graphic ${phase.sceneClass || ""}`;

  (phase.sceneElements || []).forEach((element) => {
    const node = document.createElement("div");
    node.className = `scene-element ${element.className || ""}`;

    if (element.label) {
      node.setAttribute("aria-label", element.label);
    }

    sceneGraphic.appendChild(node);
  });

  dom.sceneStage.appendChild(sceneGraphic);
}

function renderCharacters(phase) {
  (phase.characters || []).forEach((character) => {
    dom.sceneStage.appendChild(createCharacterNode(character));
  });
}

function renderHotspots(phase) {
  (phase.objects || []).forEach((object) => {
    const isSeen = deps.State.isMemorySeen(phase.id, object.id);

    const hotspot = document.createElement("button");
    hotspot.type = "button";
    hotspot.className = [
      "hotspot",
      object.required ? "is-required" : "",
      isSeen ? "is-seen" : "",
    ].join(" ");

    hotspot.dataset.objectId = object.id;
    hotspot.setAttribute("aria-label", object.label);

    hotspot.style.left = `${object.position.x}%`;
    hotspot.style.top = `${object.position.y}%`;
    hotspot.style.width = `${object.position.width}%`;
    hotspot.style.height = `${object.position.height}%`;

    hotspot.innerHTML = `
      <span class="hotspot-marker">${isSeen ? "✓" : "!"}</span>
      <span class="hotspot-label">${escapeHtml(object.label)}</span>
    `;

    hotspot.addEventListener("click", () => openMemory(object));

    dom.sceneStage.appendChild(hotspot);
  });
}

function updateRequiredProgress() {
  if (!currentPhase) return;

  const requiredObjects = deps.State.getRequiredObjects(currentPhase);
  const seenRequiredObjects = deps.State.getSeenRequiredObjects(currentPhase);
  const allRequiredSeen = deps.State.areRequiredMemoriesSeen(currentPhase);

  dom.requiredProgress.innerHTML = "";

  requiredObjects.forEach((object) => {
    const isDone = deps.State.isMemorySeen(currentPhase.id, object.id);
    const chip = document.createElement("span");

    chip.className = `required-chip${isDone ? " is-done" : ""}`;
    chip.textContent = `${isDone ? "✓" : "•"} ${object.label}`;

    dom.requiredProgress.appendChild(chip);
  });

  if (requiredObjects.length) {
    const counter = document.createElement("span");
    counter.className = "required-chip";
    counter.textContent = `${seenRequiredObjects.length}/${requiredObjects.length} obrigatórias`;
    dom.requiredProgress.appendChild(counter);
  }

  dom.btnCompletePhase.hidden = !allRequiredSeen;
}

function refreshHotspotStates() {
  if (!currentPhase) return;

  dom.sceneStage.querySelectorAll(".hotspot").forEach((hotspot) => {
    const objectId = hotspot.dataset.objectId;
    const isSeen = deps.State.isMemorySeen(currentPhase.id, objectId);
    const marker = hotspot.querySelector(".hotspot-marker");

    hotspot.classList.toggle("is-seen", isSeen);

    if (marker) {
      marker.textContent = isSeen ? "✓" : "!";
    }
  });
}

function renderPhase(phaseId) {
  const phase = getPhaseById(phaseId);

  if (!phase || phase.available === false || phase.isFinal) {
    return;
  }

  currentPhase = phase;

  dom.phaseKicker.textContent = `fase ${phase.order}`;
  dom.phaseTitle.textContent = phase.name;
  dom.phaseObjective.textContent =
    phase.objective || "Toque nos detalhes da cena para revelar memórias.";

  dom.sceneStage.innerHTML = "";

  renderSceneElements(phase);
  renderCharacters(phase);
  renderHotspots(phase);
  updateRequiredProgress();

  deps.Audio.setTrack(phase.audio?.src || "");
  setAudioButtonsState();

  deps.Router.showScreen("phase");
}

function renderFragmentScreen(fragment) {
  dom.fragmentTitle.textContent = fragment.title || "Fragmento desbloqueado";
  dom.fragmentDescription.textContent =
    fragment.description || "Você encontrou mais um pedaço dessa história.";

  dom.fragmentRevealCard.innerHTML = "";
  dom.fragmentRevealCard.appendChild(
    makeFragmentCell(fragment.id, fragment.index || 0, true)
  );

  deps.Router.showScreen("fragment");
}

function renderFinalScreen() {
  const state = deps.State.getState();
  const finalPhase = getPhaseById("phase-5");

  const hasAllFragments = FRAGMENT_IDS.every((fragmentId) =>
    state.unlockedFragments.includes(fragmentId)
  );

  if (!hasAllFragments) {
    renderMap();
    deps.Router.showScreen("map");
    return;
  }

  renderFragmentsGrid(dom.finalFragmentComposition);

  dom.finalLetterContent.innerHTML = (finalPhase.letter || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  deps.Audio.setTrack(finalPhase.audio?.src || "");
  setAudioButtonsState();

  deps.Router.showScreen("final");
}

function openMemory(object) {
  currentMemoryObject = object;
  currentDialogueIndex = 0;

  dom.memoryModalTitle.textContent = object.memory.title || object.label;
  dom.memoryModalKicker.textContent = object.required
    ? "memória obrigatória"
    : "memória";

  if (object.memory.type === "dialogue") {
    renderDialogueStep();
  } else {
    renderNarrationMemory();
  }

  dom.memoryModal.hidden = false;
}

function renderNarrationMemory() {
  dom.btnNextDialogue.hidden = true;
  dom.btnFinishMemory.hidden = false;

  dom.memoryModalBody.innerHTML = `
    <div class="narration-text">
      ${escapeHtml(currentMemoryObject.memory.text)}
    </div>
  `;
}

function renderDialogueStep() {
  const memory = currentMemoryObject.memory;
  const lines = memory.lines || [];
  const line = lines[currentDialogueIndex];

  if (line) {
    dom.btnNextDialogue.hidden = currentDialogueIndex >= lines.length;
    dom.btnFinishMemory.hidden = true;

    dom.memoryModalBody.innerHTML = `
      <div class="dialogue-box">
        <span class="dialogue-speaker">${escapeHtml(line.speaker)}</span>
        <div class="dialogue-text">${escapeHtml(line.text)}</div>
      </div>
    `;

    return;
  }

  dom.btnNextDialogue.hidden = true;
  dom.btnFinishMemory.hidden = false;

  dom.memoryModalBody.innerHTML = `
    <div class="narration-text">
      ${escapeHtml(memory.conclusion || "")}
    </div>
  `;
}

function goToNextDialogueStep() {
  if (!currentMemoryObject) return;

  currentDialogueIndex += 1;
  renderDialogueStep();
}

function closeMemoryModal() {
  dom.memoryModal.hidden = true;
  currentMemoryObject = null;
  currentDialogueIndex = 0;
}

function finishMemory() {
  if (!currentPhase || !currentMemoryObject) return;

  deps.State.markMemorySeen(currentPhase.id, currentMemoryObject.id);

  closeMemoryModal();
  refreshHotspotStates();
  updateRequiredProgress();
}

function openResetModal() {
  dom.resetModal.hidden = false;
}

function closeResetModal() {
  dom.resetModal.hidden = true;
}

function confirmReset() {
  deps.State.resetState();
  deps.Audio.disableAudio();

  closeResetModal();
  currentPhase = null;

  renderStart();
  deps.Router.showScreen("start");
}

async function toggleAudio() {
  await deps.Audio.toggleAudio();
  deps.State.setAudioEnabled(deps.Audio.isAudioEnabled());
  setAudioButtonsState();
}

async function enableAudioFromConsent() {
  await deps.Audio.enableAudio();
  deps.State.setAudioEnabled(deps.Audio.isAudioEnabled());
  setAudioButtonsState();
}

function bindEvents() {
  dom.btnStartGame.addEventListener("click", () => {
    deps.State.setStarted();
    renderStart();
    renderMap();
    deps.Router.showScreen("map");
  });

  dom.btnContinueGame.addEventListener("click", () => {
    deps.State.setStarted();
    renderMap();
    deps.Router.showScreen("map");
  });

  dom.phaseList.addEventListener("click", (event) => {
    const card = event.target.closest(".phase-card");

    if (!card || card.disabled) return;

    const phase = getPhaseById(card.dataset.phaseId);

    if (phase?.isFinal) {
      renderFinalScreen();
      return;
    }

    renderPhase(phase.id);
  });

  dom.btnBackToMap.addEventListener("click", () => {
    renderMap();
    deps.Router.showScreen("map");
  });

  dom.btnCompletePhase.addEventListener("click", () => {
    if (!currentPhase) return;

    deps.State.completePhase(currentPhase);
    renderFragmentScreen(currentPhase.fragment);
  });

  dom.btnReturnMapAfterFragment.addEventListener("click", () => {
    renderMap();
    deps.Router.showScreen("map");
  });

  dom.btnFinalBackMap.addEventListener("click", () => {
    renderMap();
    deps.Router.showScreen("map");
  });

  dom.btnNextDialogue.addEventListener("click", goToNextDialogueStep);
  dom.btnFinishMemory.addEventListener("click", finishMemory);

  document.querySelectorAll("[data-close-memory]").forEach((element) => {
    element.addEventListener("click", closeMemoryModal);
  });

  document.querySelectorAll("[data-close-reset]").forEach((element) => {
    element.addEventListener("click", closeResetModal);
  });

  dom.btnConfirmReset.addEventListener("click", confirmReset);

  dom.btnMapAudio.addEventListener("click", toggleAudio);
  dom.btnPhaseAudio.addEventListener("click", toggleAudio);
  dom.btnEnableAudio.addEventListener("click", enableAudioFromConsent);

  document.addEventListener("audio-status-change", setAudioButtonsState);

  dom.startTitle.addEventListener("pointerdown", () => {
    resetTimer = window.setTimeout(openResetModal, 1200);
  });

  ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
    dom.startTitle.addEventListener(eventName, () => {
      window.clearTimeout(resetTimer);
    });
  });

  dom.startTitle.addEventListener("keydown", (event) => {
    if (event.key === "R" && event.shiftKey) {
      openResetModal();
    }
  });
}

export function initUI(injectedDeps) {
  deps = injectedDeps;
  cacheDom();
  bindEvents();
  setAudioButtonsState();
}