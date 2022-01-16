import { InformationCircleIcon, UserIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./components/modals/InfoModal";
import { WinModal } from "./components/modals/WinModal";
import { getHints, isWordInWordList, pruneWords } from "./lib/words";
import { WORDS } from "./constants/words";
import { KeyValue } from "./lib/keyboard";
import { Guess } from "./lib/game";

function App() {
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const [disabledKeys, setDisabledKeys] = useState(new Set<KeyValue>())
  const [currentWords, setCurrentWords] = useState(WORDS)
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);

  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [shareComplete, setShareComplete] = useState(false);

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  const onChar = (value: KeyValue) => {
    if (currentGuess.length < 5 && !disabledKeys.has(value)) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (currentGuess.length === 5) {
      if (!isWordInWordList(currentGuess)) {
        setIsWordNotFoundAlertOpen(true);
        return setTimeout(() => {
          setIsWordNotFoundAlertOpen(false);
        }, 2000);
      }


      const guess = currentGuess.toLowerCase();
      const nextWords = pruneWords(currentWords, guess);
      const hints = getHints({ word: nextWords[0], guess });
      hints.forEach((hint, i) => {
        if (hint === "absent") {
          setDisabledKeys(disabledKeys.add(currentGuess[i] as KeyValue))
        }
      });
      setGuesses([...guesses, { guess: currentGuess, hints }]);
      if (nextWords[0] === guess) {
        setIsGameWon(true);
        return;
      }

      setCurrentWords(nextWords);


      setCurrentGuess("");
    }
  };

  return (
    <div className="h-full flex flex-col justify-between max-h-full">
      <Alert message="Paraula no trobada" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message="Joc copiat!"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-2/4 mx-auto items-center mb-8 place-content-evenly">
        <h1 className="text-2xl font-bold">ABSURDLE.CAT</h1>
        <InformationCircleIcon
          className="h-10 w-10 px-2 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <UserIcon
          className="h-10 w-10 px-2 cursor-pointer"
          onClick={() => setIsAboutModalOpen(true)}
        />
      </div>
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        disabledKeys={disabledKeys}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        hints={guesses.map(({ hints }) => { return hints; })}
        handleShare={() => {
          setIsWinModalOpen(false);
          setShareComplete(true);
          return setTimeout(() => {
            setShareComplete(false);
          }, 2000);
        }}
      />
    </div>
  );
}

export default App;
