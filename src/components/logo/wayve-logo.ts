import "./wayve-logo.css";

export default class Logo extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    const gridSize = 9;
    const circles = document.createElement("div");
    circles.className = "circles";
    circles.setAttribute("aria-hidden", "true");

    for (let rowIndex = 0; rowIndex < gridSize; rowIndex += 1) {
      const row = document.createElement("div");
      row.className = "row";

      for (let circleIndex = 0; circleIndex < gridSize; circleIndex += 1) {
        const circle = document.createElement("i");
        circle.className = "circle";
        row.append(circle);
      }

      circles.append(row);
    }

    this.append(circles);
  }
}

customElements.define("wayve-logo", Logo);
