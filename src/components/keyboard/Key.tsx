import { ReactNode } from "react";
import classnames from "classnames";
import { KeyValue } from "../../lib/keyboard";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  disabled: boolean;
  className?: String;
  onClick: (value: KeyValue) => void;
};

export const Key = ({
  children,
  disabled,
  className,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    "flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer h-14 w-12",
    className,
    disabled? 
      "bg-slate-400 text-white pointer-events-none" :
      "bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
  );

  return (
    <div className={classes} onClick={() => onClick(value)}>
      {children || value}
    </div>
  );
};
