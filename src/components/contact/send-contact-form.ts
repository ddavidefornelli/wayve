export const CONTACT_FORM_ENDPOINT = "https://formsubmit.co/ajax/fornelli.dv@gmail.com";
export const MAX_CONTACT_SUBMISSIONS = 3;

const submissionCountKey = (email: string) => `wayve:contact-submissions:${email.trim().toLowerCase()}`;
type SubmissionStorage = Pick<Storage, "getItem" | "setItem">;

export class ContactSubmissionLimitError extends Error {
  constructor() {
    super("This email address has reached the limit of three messages.");
  }
}

export async function sendContactForm(
  data: FormData,
  request: typeof fetch = fetch,
  // Browser-local ceiling; move this check to durable server storage when a backend is added.
  storage: SubmissionStorage | undefined = typeof localStorage === "undefined" ? undefined : localStorage,
) {
  const email = String(data.get("email") ?? "");
  const countKey = submissionCountKey(email);
  const submissionCount = Number(storage?.getItem(countKey) ?? 0);

  if (submissionCount >= MAX_CONTACT_SUBMISSIONS) throw new ContactSubmissionLimitError();

  data.set("_replyto", email);

  const response = await request(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
  });
  const result = (await response.json()) as { success?: boolean | string };

  if (!response.ok || result.success === false || result.success === "false") {
    throw new Error("The message could not be sent.");
  }

  storage?.setItem(countKey, String(submissionCount + 1));
}
