import { FC, ReactNode, useState } from "react";
import { ButtonEx } from "./Button";
import { useAsset } from "../context/Asset";
//import Button from '@material-ui/core/Button';

export const ClaimPrice = (props) => {
  const { asset } = useAsset();
  const {
    onSubmit,
    gameId,
    betId,
    setGameId,
    setBetId,
    formHeader,
    buttonText = "Claim",
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
        value={betId}
        onChange={(e) => setBetId(e.target.value)}
        name="betId"
        type="text"
        placeholder="Bet Id"
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></input>
      <ButtonEx
        className="mt-3"
        disabled={!asset}
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          // alert('兑换取消');  
          setLoading(false);
          
        }}
      >
        {buttonText}
      </ButtonEx>
    </div>
  );
};
