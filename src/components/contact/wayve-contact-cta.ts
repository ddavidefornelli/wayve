import "./wayve-contact-cta.css";

export const CONTACT_HREF = "#contact";

export default class WayveContactCta extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    const link = document.createElement("a");
    const arrow = document.createElement("span");

    link.href = this.getAttribute("href") ?? CONTACT_HREF;
    link.append(this.getAttribute("label") ?? "Contact us");

    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(arrow);

    this.append(link);
  }
}

customElements.define("wayve-contact-cta", WayveContactCta);
