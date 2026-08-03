export const APPLICATION_QUESTIONS = [
  {
    name: "main_skill",
    legend: "What’s the strongest skill you bring to a hackathon team?",
    answers: ["Product strategy", "UX/UI design", "Software development", "Communication & pitching"],
  },
  {
    name: "hackathon_goal",
    legend: "What are you hoping to get out of this hackathon?",
    answers: ["Win it", "Meet new people", "Learn something new", "Build something I’m proud of"],
  },
  {
    name: "team_role",
    legend: "Which role do you naturally take in a team?",
    answers: ["Idea starter", "Organizer", "Maker", "Presenter"],
  },
  {
    name: "under_pressure",
    legend: "What do you do when time is running out?",
    answers: ["Focus on the essentials", "Help unblock the team", "Keep improving the solution", "Prepare the final pitch"],
  },
] as const;
