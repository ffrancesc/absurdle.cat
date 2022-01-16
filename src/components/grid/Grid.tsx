import React, { useRef, useEffect } from "react";
import { Hint } from "../../lib/game";
import { Row } from "./Row";

type Props = {
  guesses: { guess: string, hints: Hint[] }[];
  currentGuess: string;
};

export const Grid = ({ guesses, currentGuess }: Props) => {
  const currentRow = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (currentRow.current) currentRow.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom()
  });

  return (
    <div className="overflow-y-auto grow">
      {guesses.map(({ guess, hints }, i) => (
        <Row key={i} guess={guess} hints={hints} />
      ))}
      <Row innerRef={currentRow} guess={currentGuess} />
    </div>
  );
};
