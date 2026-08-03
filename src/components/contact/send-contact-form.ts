export const CONTACT_FORM_ENDPOINT = "https://formsubmit.co/ajax/contact.wayve1.0@gmail.com";

export async function sendContactForm(data: FormData, request: typeof fetch = fetch) {
  data.set("_replyto", String(data.get("email") ?? ""));

  const response = await request(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
  });
  const result = (await response.json()) as { success?: boolean | string };

  if (!response.ok || result.success === false || result.success === "false") {
    throw new Error("The message could not be sent.");
  }
}
