import { Hint } from "../../lib/game";
import classnames from "classnames";
import { Transition } from "@headlessui/react";
import './Cell.css';

type Props = {
  value?: string;
  hint?: Hint;
  index?: number;
};

export const Cell = ({ value, hint, index = 0 }: Props) => {
  const color = classnames(
    {
      "bg-white border-slate-200": !hint,
      "bg-slate-400 text-white border-slate-400": hint === "absent",
      "bg-green-500 text-white border-green-500": hint === "correct",
      "bg-yellow-500 text-white border-yellow-500": hint === "present",
    },
    "my-class"
  );

  const transition = classnames(
    "transform transition ease-in-out duration-[600ms]",
    `delay-[${index}00ms]`,

  )
  return (
    <Transition
      show={true}
      appear={value !== undefined}
      enter={transition}
      enterFrom="opacity-75 bg-transparent"
      enterTo={`opacity-100 scale-100 ${color}`}
      entered={color}
      className="w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded"
    >
      {value}
    </Transition>
  );
};
