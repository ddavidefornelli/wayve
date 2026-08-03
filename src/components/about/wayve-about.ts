import "./wayve-about.css";

const team = [
  {
    name: "David",
    role: "The builder",
    text: "Turns ideas into working products, from the first sketch to the final prototype.",
    instagram: "davide.fornelli",
  },
  {
    name: "Cello",
    role: "The talker",
    text: "Turns complex ideas into clear stories and gets people excited about them.",
    instagram: "_.ggiuliano._",
  },
  {
    name: "???",
    role: "The next member",
    text: "Could this be you?",
  },
  {
    name: "???",
    role: "The next member",
    text: "Could this be you?",
  },
] as const;

export default class WayveAbout extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    const section = document.createElement("section");
    section.className = "site-section about-section";
    section.setAttribute("aria-labelledby", "about-title");
    section.innerHTML = `
      <div class="section-content about-content">
        <h2 id="about-title">About us.</h2>
        <p class="section-lede">Different strengths, one team.</p>
        <div class="team-grid"></div>
      </div>
    `;

    const grid = section.querySelector(".team-grid");
    for (const member of team) {
      const article = document.createElement("article");
      article.innerHTML = `
        <p class="member-role">${member.role}</p>
        <h3>${member.name}</h3>
        <p class="member-description">${member.text}</p>
        ${"instagram" in member ? `<a class="member-instagram" href="https://www.instagram.com/${member.instagram}/">@${member.instagram}</a>` : ""}
      `;
      grid?.append(article);
    }

    this.append(section);
  }
}

customElements.define("wayve-about", WayveAbout);
