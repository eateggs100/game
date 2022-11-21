import React from 'react';
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NumberInput from "./NumberInput"
import { useAsset } from "../context/Asset"

export default function BetDialog(props) {
  const  [chips, setChips]  = React.useState(1);
  //const [close, setClose] = React.useState(false);
  const { gameId, side, open, setClose } = props;
  // console.log("open", open);
  const { asset, initialized, initAsset, join} = useAsset()

  const handleBet = () => {
    function  isRealNum(val){
      if (val ===  ""  || val == null ){
          return  false ;
      }
      if (!isNaN(val)){
        join(gameId, side, chips);
       setClose(true);
        return true
      } else {
          return  false ;
      }

    }
    isRealNum(chips);
    
  };


  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      
      <Dialog open={open} onClose={setClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Make a Bet</DialogTitle>
        <DialogContent> 
          <DialogContentText >
            To make a bet, please enter your bet amount here. 
          </DialogContentText>
            <NumberInput   onChange={setChips} max={99999} decimals={0} unit={'Vst'} getValue={setChips}/>
            {/* <input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={setClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBet} color="primary">
            Make the Bet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
