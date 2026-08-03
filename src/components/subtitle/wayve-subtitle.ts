import "./wayve-subtitle.css";

export class WayveSubtitle extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    this.innerHTML = `
      <p id="subtitle"><span class="subtitle-stay">just be</span> <span class="subtitle-wayve">wayve</span></p>
    `;
  }
}

if (!customElements.get("wayve-subtitle")) {
  customElements.define("wayve-subtitle", WayveSubtitle);
}
