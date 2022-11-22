import {useMemo } from "react"
import { AssetProvider } from "./context/Asset"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Dashboard } from "./pages/Dashboard"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from '@solana/web3.js';
import "./App.css"


export const App = () => {
  const endpoint = "https://rpc.ankr.com/solana"
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  )
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <AssetProvider>
          <Dashboard/>
        </AssetProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
