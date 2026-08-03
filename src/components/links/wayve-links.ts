import "./wayve-links.css";
import { sendContactForm } from "../contact/send-contact-form";
import { APPLICATION_QUESTIONS } from "./application-questions";

const defaultStatus = "We’ll use your email only to follow up about the team.";

export default class Links extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    const questions = APPLICATION_QUESTIONS.map(
      ({ name, legend, answers }, questionIndex) => `
        <fieldset class="fit-question">
          <legend><span>0${questionIndex + 1} / 04</span>${legend}</legend>
          <div class="fit-answers">
            ${answers
              .map(
                (answer, answerIndex) => `
                  <label>
                    <input type="radio" name="${name}" value="${answer}" required />
                    <span><i aria-hidden="true">${String.fromCharCode(65 + answerIndex)}</i>${answer}</span>
                  </label>
                `,
              )
              .join("")}
          </div>
        </fieldset>
      `,
    ).join("");

    this.innerHTML = `
      <button class="nav-banner" type="button" aria-haspopup="dialog" aria-controls="fit-dialog">
        <span class="banner-badge">TWO SLOTS LEFT</span>
        <span class="banner-message"><strong>Want to join our team?</strong> Find out if you are a fit</span>
        <span class="banner-arrow" aria-hidden="true">
          <svg viewBox="0 0 40 24" focusable="false">
            <path d="M1 12h37M29 3l9 9-9 9" />
          </svg>
        </span>
      </button>
      <dialog class="fit-dialog" id="fit-dialog" aria-labelledby="fit-title">
        <form class="fit-form" action="https://formsubmit.co/hello@wayve.it" method="post">
          <input type="hidden" name="_subject" value="New WAYVE team fit response" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input class="fit-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" />
          <button class="fit-close" type="button" aria-label="Close team fit form">×</button>
          <header class="fit-header">
            <p>Join the team</p>
            <h2 id="fit-title">Could your next team be <span>WAYVE?</span></h2>
            <p>Choose the answer that sounds most like you. Four questions, no wrong answers.</p>
          </header>
          <div class="fit-questions">${questions}</div>
          <label class="fit-contact">
            <span>Contact email</span>
            <input type="email" name="email" autocomplete="email" placeholder="you@example.com" required />
          </label>
          <footer class="fit-footer">
            <p class="fit-status" aria-live="polite">${defaultStatus}</p>
            <button class="fit-submit" type="submit">Send my answers <span aria-hidden="true">→</span></button>
          </footer>
        </form>
      </dialog>
    `;

    const banner = this.querySelector<HTMLButtonElement>(".nav-banner");
    const dialog = this.querySelector<HTMLDialogElement>(".fit-dialog");
    const form = this.querySelector<HTMLFormElement>(".fit-form");
    const close = this.querySelector<HTMLButtonElement>(".fit-close");
    const submit = this.querySelector<HTMLButtonElement>(".fit-submit");
    const status = this.querySelector<HTMLElement>(".fit-status");
    if (!banner || !dialog || !form || !close || !submit || !status) return;

    banner.addEventListener("click", () => {
      if (status.dataset.state === "success") {
        delete status.dataset.state;
        status.textContent = defaultStatus;
      }
      dialog.showModal();
    });
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      submit.disabled = true;
      submit.textContent = "Sending…";
      status.textContent = "Sending your answers…";
      status.dataset.state = "pending";

      try {
        await sendContactForm(new FormData(form));
        form.reset();
        status.textContent = "Thanks — your answers are in our inbox.";
        status.dataset.state = "success";
      } catch {
        status.textContent = "Something isn’t working. Please try again.";
        status.dataset.state = "error";
      } finally {
        submit.disabled = false;
        submit.innerHTML = `Send my answers <span aria-hidden="true">→</span>`;
      }
    });
  }
}

customElements.define("wayve-links", Links);
