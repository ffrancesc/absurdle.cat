export type KeyValue = Char | "Enter" | "Backspace";

export const chars = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç",
  "Z", "X", "C", "V", "B", "N", "M"] as const;
  
export type Char = typeof chars[number];