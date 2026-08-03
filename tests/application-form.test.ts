import { APPLICATION_QUESTIONS } from "../src/components/links/application-questions";

if (APPLICATION_QUESTIONS.length !== 4) throw new Error("The application form must have four questions");

for (const question of APPLICATION_QUESTIONS) {
  if (question.answers.length !== 4) {
    throw new Error(`The ${question.name} question must have four answers`);
  }
}

if (new Set(APPLICATION_QUESTIONS.map(({ name }) => name)).size !== 4) {
  throw new Error("Every application question must have a unique field name");
}

console.log("application form check passed");
