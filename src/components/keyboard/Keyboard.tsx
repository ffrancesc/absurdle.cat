import { Char, chars, KeyValue } from "../../lib/keyboard";
import { Key } from "./Key";
import { ReactNode, useEffect } from "react";
import { BackspaceIcon } from "@heroicons/react/outline";

type Props = {
    onChar: (value: Char) => void;
    onDelete: () => void;
    onEnter: () => void;
    disabledKeys: Set<KeyValue>;
};

const LAYOUT: KeyValue[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const KEY_PROPS: { [key in KeyValue]?: { className?: string, children?: ReactNode } } = {
    "Enter": { className: "w-20", children: "ENTER" },
    "Backspace": {
        className: "w-16", children: <BackspaceIcon className="h-6 w-6" />
    },
};

export const Keyboard = ({ onChar, onDelete, onEnter, disabledKeys }: Props) => {
    const onClick = (value: KeyValue) => {
        switch (value) {
            case "Enter": onEnter(); break;
            case "Backspace": onDelete(); break;
            default: onChar(value);
        }
    };

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === "Enter") {
                onEnter();
            } else if (e.code === "Backspace") {
                onDelete();
            } else {
                const key = e.key.toUpperCase() as Char;
                if (chars.includes(key)) {
                    onChar(key);
                }
            }
        };
        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        };
    });

    return (
        <div className="pt-8 pb-0.5 px-0.5">
            {LAYOUT.map((keyRow, i) => (
                <div key={i} className="flex justify-center py-0.5">
                    {keyRow.map((key, j) => (
                        <Key
                            key={j}
                            value={key}
                            onClick={onClick}
                            disabled={disabledKeys.has(key)}
                            className={KEY_PROPS[key]?.className}
                        >
                            {KEY_PROPS[key]?.children}
                        </Key>
                    ))}
                </div>
            ))}
        </div>
    );
};
