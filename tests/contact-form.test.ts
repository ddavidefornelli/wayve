import {
  CONTACT_FORM_ENDPOINT,
  ContactSubmissionLimitError,
  MAX_CONTACT_SUBMISSIONS,
  sendContactForm,
} from "../src/components/contact/send-contact-form";

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

const counts = new Map<string, string>();
const storage = {
  getItem: (key: string) => counts.get(key) ?? null,
  setItem: (key: string, value: string) => counts.set(key, value),
};

let rejected = false;
try {
  await sendContactForm(data, (async () => Response.json({ success: "false" })) as typeof fetch, storage);
} catch {
  rejected = true;
}
if (!rejected) throw new Error("Failed submissions must reject");

let requestCount = 0;
const successfulRequest = (async () => {
  requestCount += 1;
  return Response.json({ success: "true" });
}) as typeof fetch;

for (let index = 0; index < MAX_CONTACT_SUBMISSIONS; index += 1) {
  await sendContactForm(data, successfulRequest, storage);
}

const sameUser = new FormData();
sameUser.set("email", "PERSON@EXAMPLE.COM");
try {
  await sendContactForm(sameUser, successfulRequest, storage);
  throw new Error("A fourth submission from the same email must reject");
} catch (error) {
  if (!(error instanceof ContactSubmissionLimitError)) throw error;
}
if (requestCount !== MAX_CONTACT_SUBMISSIONS) throw new Error("Limited submissions must not be sent");

const anotherUser = new FormData();
anotherUser.set("email", "another@example.com");
await sendContactForm(anotherUser, successfulRequest, storage);
if (requestCount !== MAX_CONTACT_SUBMISSIONS + 1) throw new Error("The limit must apply per email");

console.log("contact form check passed");
