import { Hint } from "../../lib/game";
import { MiniRow } from "./MiniRow";

type Props = {
  hints: Hint[][];
};

export const MiniGrid = ({ hints }: Props) => {

  return (
    <div className="pb-6">
      {hints.map((hint, i) => (
        <MiniRow key={i} hints={hint} />
      ))}
    </div>
  );
};
