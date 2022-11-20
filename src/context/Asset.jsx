import * as anchor from '@project-serum/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import idl from "../idl.json";
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

const AssetContext = createContext();

export const useAsset = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("Parent must be wrapped inside AssetProvider");
  }

  return context;
};

export const AssetProvider = (props) => {
  const [asset, setAsset] = useState();
  const [configs, setConfigs] = useState();
  const [initialized, setInitialized] = useState(false);
  //const [bets, setBets] = useState([])
  const [transactionPending, setTransactionPending] = useState(false)
  const [showModal, setShowModal] = useState(false)
  //const [lastBetId, setLastBetId] = useState()

  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet()

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
      return new anchor.Program(idl, PROGRAM_KEY, provider)
    }
  }, [connection, anchorWallet])

  useEffect(() => {
    const start = async () => {
      if (program && publicKey) {
        try {
          const [cfgPda] = findProgramAddressSync([utf8.encode('configs')], program.programId);
          const configs = await program.account.configs.fetch(cfgPda);  
          const [assetPda] = findProgramAddressSync([utf8.encode('asset'), publicKey.toBuffer()], program.programId)
          const asset = await program.account.asset.fetch(assetPda)
          if (configs && asset) {
            //console.log("Asset. configs", configs);
            setConfigs(configs);
            setAsset(asset)
            setInitialized(true)
          }
        } catch (error) {
          console.log(error)
          setInitialized(false)
        }
      }
    }
    start()
  }, [program, publicKey, transactionPending]);


  const initAsset = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true)
        const [assetPda] = findProgramAddressSync([utf8.encode('asset'), publicKey.toBuffer()], program.programId)
        await program.methods
          .initAsset()
          .accounts({
            asset: assetPda,
            player: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()
        setInitialized(true)
      } catch (error) {
        console.log(error)
      } finally {
        setTransactionPending(false)
      }
    }
  }

  const join = async (gameId, side, chips) => {
    if (program && publicKey) {
      setTransactionPending(true)
      try {
        const [assetPda] = findProgramAddressSync([utf8.encode('asset'), publicKey.toBuffer()], program.programId)
        const [cfgPda] = findProgramAddressSync([utf8.encode('configs')], program.programId) //, publicKey.toBuffer(), Uint8Array.from([lastBetId])

        await program.methods
          .join(gameId, side, chips)
          .accounts({
            asset: assetPda,
            configs: cfgPda,
            player: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        setShowModal(false)
      } catch (error) {
        console.error(error)
      } finally {
        setTransactionPending(false)
      }
    }
  }


  const claim = async (gameId, betId) => {
    if (program && publicKey) {
      setTransactionPending(true)
      try {
        const [assetPda] = findProgramAddressSync([utf8.encode('asset'), publicKey.toBuffer()], program.programId)
        const [cfgPda] = findProgramAddressSync([utf8.encode('configs')], program.programId) //, publicKey.toBuffer(), Uint8Array.from([lastBetId])

        await program.methods
          .claim(gameId, betId)
          .accounts({
            asset: assetPda,
            configs: cfgPda,
            player: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        setShowModal(false)
      } catch (error) {
        console.error(error)
      } finally {
        setTransactionPending(false)
      }
    }
  }

  const checkData = async() => {
    if (program && publicKey) {
      setTransactionPending(true)
      try {
        const [assetPda] = findProgramAddressSync([utf8.encode('asset'), publicKey.toBuffer()], program.programId)
        const [cfgPda] = findProgramAddressSync([utf8.encode('configs')], program.programId);
        const configs = await program.account.configs.fetch(cfgPda);
        const asset = await program.account.asset.fetch(assetPda);
        setConfigs(configs);
        setAsset(asset);
        return {configs, asset};
      } catch (error) {
        console.error(error)
      } finally {
        setTransactionPending(false)
      }
    }
  }

  return (
    <AssetContext.Provider
      value={{
        configs,
        asset,
        initialized,
        showModal,
        initAsset,
        join,
        claim,
        checkData,
        setShowModal,
      }}
    >
      {props.children}
    </AssetContext.Provider>
  );
};
