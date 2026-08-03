import "./wayve-email-form.css";
import { ContactSubmissionLimitError, sendContactForm } from "./send-contact-form";

export default class WayveEmailForm extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount > 0) return;

    this.innerHTML = `
      <form class="email-form" action="https://formsubmit.co/hello@wayve.it" method="post">
        <input type="hidden" name="_subject" value="New message from the WAYVE website" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input class="email-form-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" />
        <div class="email-form-fields">
          <label>
            <span>Your email</span>
            <input type="email" name="email" autocomplete="email" placeholder="you@company.com" required />
          </label>
          <label>
            <span>What would you like to talk about?</span>
            <textarea name="message" rows="4" placeholder="Tell us how you would like to work with us" required></textarea>
          </label>
        </div>
        <div class="email-form-footer">
          <p class="email-form-status" aria-live="polite">We’ll reply directly to your inbox.</p>
          <button type="submit">Send message <span aria-hidden="true">→</span></button>
        </div>
      </form>
    `;

    const form = this.querySelector<HTMLFormElement>("form");
    const button = this.querySelector<HTMLButtonElement>("button");
    const status = this.querySelector<HTMLElement>(".email-form-status");
    if (!form || !button || !status) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      button.textContent = "Sending…";
      status.textContent = "Sending your message…";
      status.dataset.state = "pending";

      try {
        await sendContactForm(new FormData(form));
        form.reset();
        status.textContent = "Thanks — your message is in our inbox.";
        status.dataset.state = "success";
      } catch (error) {
        status.textContent =
          error instanceof ContactSubmissionLimitError
            ? error.message
            : "Something isn’t working. Please try again.";
        status.dataset.state = "error";
      } finally {
        button.disabled = false;
        button.innerHTML = `Send message <span aria-hidden="true">→</span>`;
      }
    });
  }
}

customElements.define("wayve-email-form", WayveEmailForm);
