import { Hint } from "../../lib/game";
import { Cell } from "./Cell";

type Props = {
  innerRef?: React.MutableRefObject<HTMLDivElement | null>;
  guess: string;
  hints?: Hint[];
};

export const Row = ({ guess, hints, innerRef }: Props) => {
  const letters = Array.from(guess.padEnd(5))
  return (
    <div ref={innerRef} className="flex justify-center mb-1">
      {letters.map((letter, i) => (
        <Cell key={i} value={letter} hint={hints ? hints[i] : undefined} index={i}/>
      ))}
    </div>
  );
};
