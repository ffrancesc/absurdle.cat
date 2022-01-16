import { Hint } from "./game";

export const shareStatus = (hints: Hint[][]) => {
  navigator.clipboard.writeText(
    `Absurdle en ${hints.length} intents:\n\n` +
    generateEmojiGrid(hints)
  );
};

const showHint = (hint: Hint): string => {
  switch (hint) {
    case "correct":
      return "🟩";
    case "present":
      return "🟨";
    case "absent":
      return "⬜";
  }
}

export const generateEmojiGrid = (hints: Hint[][]) => {
  return hints
    .map((hints) => {
      return hints.map(showHint).concat();
    })
    .join("\n");
};
