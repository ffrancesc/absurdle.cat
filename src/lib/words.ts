import { WORDS } from "../constants/words";
import { Hint } from "./game";

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase());
};

export const getHints = ({ word, guess }: { word: string, guess: string }): Hint[] => {
  return Array.from(guess).map((char, i) => {
    if (word[i] === char)
      return "correct";
    else if (word.includes(char))
      return "present";
    else
      return "absent";
  })
}

export const pruneWords = (words: string[], guess: string): string[] => {
  let hash = (hints: Hint[]): string => {
    return hints.map((hint) => {
      switch (hint) {
        case "correct": return "c";
        case "absent": return "a";
        case "present": return "p";
        default: return "";
      }
    }).join("");
  };
  let bags: { [index: string]: string[]; } = {};

  for (let word of words) {
    const h = hash(getHints({ word, guess }));
    let bag = bags[h] ?? [];
    bags[h] = [...bag, word];
  }

  let largest: string[] = [guess];
  for (const key in bags) {
    const bag = bags[key];
    if (bag.includes(guess)) 
      continue;
    else if (bag.length >= largest.length)
      largest = bag
  }
  console.log(largest)
  return largest;
}
