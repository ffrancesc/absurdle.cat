import { Hint } from "../../lib/game";
import { MiniCell } from "./MiniCell";

type Props = {
  hints: Hint[];
};

export const MiniRow = ({ hints }: Props) => {

  return (
    <div className="flex justify-center mb-1">
      {hints.map((hint, i) => (
        <MiniCell key={i} hint={hint} />
      ))}
    </div>
  );
};
