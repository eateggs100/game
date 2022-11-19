import { AnchorProvider, Program } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import idl from "../idl.json";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider) {
  return new Program(idl, PROGRAM_KEY, provider);
}

export const BetInfo = () => {
  const { id } = useParams();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState();
  const [bet, setBet] = useState();

  useEffect(() => {
    try {
      if (provider) {
        const getBet = async (assetPDA, i) => {
          const program = getProgram(provider);
          const asset = await program.account.asset.fetch(assetPDA);
          const bet = asset.bets[i]; //await getBetById(id.toString(), program);
          setBet(bet);
        };
        getBet();
      }
    } catch { }
  }, [provider]);

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }
  }, [connection, wallet]);


  return (
    <article className="hentry background-color">
      <div className="featured-image">
        <img
          src="https://images.unsplash.com/photo-1531096187418-86ac6b31baea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9d6cd4e7c48dfc78f5e9c0fb07b692f0&auto=format&fit=crop&w=1350&q=80"
          alt=""
        />
      </div>
      <h1 className="entry-title">{bet?.gameId}</h1>
      <div className="entry-meta">
        <p>
          <span className="author">
            Written by <a href="#">Lavi Perchik</a>
          </span>{" "}
          <span className="date">Friday, Nov 11, 2022</span>
        </p>
      </div>
      <div className="entry-content">
        <p>{bet?.side}</p>
      </div>
    </article>
  );
};
