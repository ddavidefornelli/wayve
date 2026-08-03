import { inject, pageview } from "@vercel/analytics";
import "./reset.css";
import "./style.css";

import "./components/logo/wayve-logo";
import "./components/title/wayve-title";
import "./components/contact/wayve-contact-cta";
import "./components/contact/wayve-email-form";
import "./components/links/wayve-links";
import "./components/about/wayve-about";

inject();

const pdfDownload = document.querySelector<HTMLAnchorElement>(".resource-download");
pdfDownload?.addEventListener("click", () => {
  // Vercel Hobby has no custom events; use a virtual pageview until the project upgrades.
  const path = `/downloads${pdfDownload.pathname}`;
  pageview({ route: path, path });
});
