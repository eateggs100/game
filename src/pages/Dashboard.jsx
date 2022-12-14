import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useEffect, useState } from "react"
import { ButtonEx } from "../components/Button"
import { JoinGame } from "../components/JoinGame"
import { ClaimPrice } from "../components/ClaimPrice"
import { useAsset } from "../context/Asset"
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import "./Dashboard.css"
// import Britain from "./imgs/Britain.jpg"
// import Britain from "./imgs/Britain.jpg"
import Match from "../components/Match"
// import NumberInput from "./"
// import BetDialog from "../components/BetDialog.jsx"

export const Dashboard = () => {
  const history = useHistory()
  //const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false)
  const [betted, setBetted] = useState(false)
  const { connected, select } = useWallet()
  const {configs, asset, initialized, initAsset, join,  claim, showModal, setShowModal } = useAsset()
  const [gameId, setGameId] = useState(0)
  const [side, setSide] = useState(0)
  const [chips, setChips] = useState(0)
  const [betId, setBetId] = useState(0)
  const [ready, setReady] = useState(false);


  const onConnect = () => {
    setConnecting(true)
    select(PhantomWalletName)
  }

  useEffect(() => {
    if (asset) {
      setConnecting(false)
    }
  }, [asset])

  useEffect(() => {
    if (asset && asset.bets.length>0 ) {
      setBetted(true)
    }
  }, [asset])

  useEffect(() => {
    if (configs && configs.games.length>0 ) {
      setReady(true)
    }
  }, [configs])


  // console.log('asset111++'+JSON.stringify(configs));
  // for()
  // for(let i =0;i<configs.length;i++){
  //   console.log(i);
  // }
  // let arr = configs.for(item=>{
  //   return item
  // })
  // console.log(configs);
 
  // let str = JSON.stringify(configs);
  // let Arr = configs.authes
  // let resultSet = configs.authes
  // let arr = []
  // for(let i in configs){
  //   arr.push (configs[i])
  // }
  // console.log('arr='+arr);
  

 
//  { configs && configs.games.map((item,index)=>{
      
//       console.log('??????'+item,index)
//     }) }

// console.log('asset.bets'+asset.bets);
  // const game = {
  //   code0: 'Eng',
  //   code1: 'Ger',
  //   state: 1,  
  //   bet_end_at: 1668692270, 
  //   reward: 0, 
  //   fee: 0,   
  //   goal0: 0, 
	//   goal1: 0, 
  //   pool0: 100, 
	//   pool1: 250, 
  // }
  const str = [];
  if(!!asset){
    console.log(asset);
    asset.bets.map((item,index)=>{
      console.log(item.state);
      if(item.state == 0){
        str.push(item.state)
      }
    })
    console.log("str"+str);
  }
  

  return (
    <div className="dashboard  overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14  shadow-md">
      {/* style={{width:'400px',position:'absolute',left:'50%',top:"20%",marginLeft:'-200px',marginTop:'-70px'}} */}
        <div  className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            {/* <div style={{textAlign:'center',lineHeight:'50px'}} className="bg-clip-text bg-gradient-to-br from-indigo-300 colorpink">
              Creep Soccer
            </div> */}
          </h2>
          {connected ? (
            <div className="flex items-center">
              {/* <p className=" font-bold text-sm ml-2 capitalize underlinepink">
                Home
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                Asset
              </p> */}
              {initialized ? (
                <div className="box">
                  <ul className='list-two' >
                    {/* {!configs && <Button onClick={() => { checkData()}}>
                        Check Account
                    </Button>}                                      */}
                    {ready && configs.games.map((game, id) =>
                    <li className='list-content' key={id}>
                     <Match game={game} id={id}/>
                    </li>
                    )}
                  </ul>
         <main style={{background:"rgba(0,0,0,.3)"}} className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          {/* <h1 className="title">The Asset</h1> */}
          <div className="row">
            <article >
              <div className="best-post-content">
                {asset &&<div className="best-post-content-cat">Asset: vst<span className="dot"> </span>{asset.vst}</div>}
              </div>
            </article>
            
          </div>
        </div>
        <div className={`modal ${showModal && 'show-modal'}`} >
          <div className="modal-content">
            <span className="close-button"
              onClick={() => setShowModal(false)}
            >??</span>
            <JoinGame
              gameId={gameId}
              side={side}
              chips={chips}
              setGameId={setGameId}
              setSide={setSide}
              setChips={setChips}
              onSubmit={() => join(gameId, side, chips)}
            />
          </div>
        </div>
      </main>
                {/* {betted? (                
                  <Button onClick={() => { setShowModal(true)}}>
                  Claim reward
                  </Button>
                ):(
                  <Button onClick={() => { setShowModal(true)}}>
                  Check asset
                  </Button>               
                )} */}
                </div>                 
              ) : (
                <Button style={{position:'absolute',left:'50%',top:'50%',marginLeft:'-60px',marginTop:'-22px',fontSize:'25px',backgroundColor:'#db7344',color:'#fff',paddingLeft:'30px',paddingRight:'30px'}} onClick={() => { initAsset()}}>
                Login
              </Button>
              )}
            </div>
          ) : (
            <ButtonEx
              style={{position:'absolute',left:'50%',top:'30%',marginLeft:'-47px',marginTop:'-40px'}}
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  // xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
             Need Connect

            </ButtonEx>
          )}
        </div>
      </header>
      
    </div>
  )
}
