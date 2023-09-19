import "../style.css";
import StickyNotesApp from "./StickyNotesApp.js";

const app = new StickyNotesApp();
window.addEventListener("DOMContentLoaded", () => app.init())