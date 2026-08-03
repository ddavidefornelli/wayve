import { CONTACT_FORM_ENDPOINT, sendContactForm } from "../src/components/contact/send-contact-form";

const data = new FormData();
data.set("email", "person@example.com");
data.set("message", "Hello");

let submitted: FormData | undefined;
const request = (async (input: string | URL | Request, init?: RequestInit) => {
  if (input !== CONTACT_FORM_ENDPOINT) throw new Error("Wrong contact endpoint");
  submitted = init?.body as FormData;
  return Response.json({ success: "true" });
}) as typeof fetch;

await sendContactForm(data, request);
if (submitted?.get("_replyto") !== "person@example.com") {
  throw new Error("The sender must be set as the reply-to address");
}

let rejected = false;
try {
  await sendContactForm(data, (async () => Response.json({ success: "false" })) as typeof fetch);
} catch {
  rejected = true;
}
if (!rejected) throw new Error("Failed submissions must reject");

console.log("contact form check passed");
