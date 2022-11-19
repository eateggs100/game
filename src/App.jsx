import { FC, useMemo } from "react"
import { AssetProvider } from "./context/Asset"
//import { Router } from "./router"
import { Dashboard } from "./pages/Dashboard"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import "./App.css"


export const App = () => {
  const endpoint = "https://muddy-aged-panorama.solana-devnet.discover.quiknode.pro/0fe7822c98ade63f96ae1be8e82d17b26d57cacc/"
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
          {/* <Router /> */}
          <Dashboard/>
        </AssetProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
