import "./wayve-title.css";

export default class Title extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    const wordmark = document.createElement("span");
    wordmark.className = "wayve-title";
    wordmark.textContent = "WAYVE";
    this.append(wordmark);
  }
}

customElements.define("wayve-title", Title);
