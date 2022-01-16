export type Hint = "absent" | "correct" | "present";

export interface Guess {guess: string, hints: Hint[]};