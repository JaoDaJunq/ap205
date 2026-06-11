import * as Router from "./router.js";
import * as State from "./state.js";
import * as Audio from "./audio.js";
import { initUI, renderStart } from "./ui.js";

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.warn("Service worker não registrado:", error);
    });
  });
}

function boot() {
  Router.initRouter();

  Audio.initAudio({
    initialEnabled: State.getState().audioEnabled,
    onStatusChange: (status) => {
      document.dispatchEvent(
        new CustomEvent("audio-status-change", {
          detail: status,
        })
      );
    },
  });

  initUI({
    Router,
    State,
    Audio,
  });

  renderStart();
  Router.showScreen("start");
  registerServiceWorker();
}

document.addEventListener("DOMContentLoaded", boot);
