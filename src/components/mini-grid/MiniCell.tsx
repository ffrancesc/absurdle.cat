import { Hint } from "../../lib/game";
import classnames from "classnames";

type Props = {
  hint: Hint;
};

export const MiniCell = ({ hint }: Props) => {
  const classes = classnames(
    "w-10 h-10 border-solid border-2 border-slate-200 flex items-center justify-center mx-0.5 text-lg font-bold rounded",
    {
      "bg-white": hint === "absent",
      "bg-green-500": hint === "correct",
      "bg-yellow-500": hint === "present",
    }
  );

  return (
      <div className={classes}/>
  );
};
