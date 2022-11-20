import { FC, ReactNode, useState } from "react";
import { ButtonEx } from "./Button";
import { useAsset } from "../context/Asset";
//import Button from '@material-ui/core/Button';

export const JoinGame = (props) => {
  const { asset } = useAsset();
  const {
    onSubmit,
    gameId,
    side,
    chips,
    setSide,
    setGameId,
    setChips,
    formHeader,
    buttonText = "Join",
  } = props;
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-lg py-4 px-6 bg- flex flex-col ">
      {formHeader}
      <input
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        type="text"
        placeholder="Game Id"
        className="bg-white rounded-3xl h-10 px-4 black"
      />
      <input
        value={side}
        onChange={(e) => setSide(e.target.value)}
        name="side"
        type="text"
        placeholder="Side"
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></input>
      <input
        value={chips}
        onChange={(e) => setChips(e.target.value)}
        name="chips"
        type="text"
        placeholder="Chips"
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></input>
      <ButtonEx
        className="mt-3"
        disabled={!asset}
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          setLoading(false);
        }}
      >
        {buttonText}
      </ButtonEx>
    </div>
  );
};
