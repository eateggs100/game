import React from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
// import "./Match.css";
import BetDialog from './BetDialog';
// import arg from '../../public/imgs/'
// import teamMap from '../utils.js';
// import eng from './imgs/Eng.jpg'
 const validValue = (value, min, max, decimals) => {
    let valueF = !value ? 0 : parseFloat(value)
    if (valueF > max || valueF < min)
        return false
    else if (new Number(value).toFixed(decimals) == valueF) {
        return true;
    } else {
        return false
    }
}

 const teamMap = {
    'Arg': 'Argentine',
    'Eng': 'England',
    'Ger': 'Germany',
    'Qat': 'qat',
    'Ecu': 'Ecu'
}


export default function Match(props) {
    console.log(props);
    const [play, setPlay] = React.useState(0);
    const [side, setSide] = React.useState(0);
    const {game, id} = props;
    const flag0 = "/imgs/"+game.code0+".jpg";
    const flag1 = "./imgs/"+game.code1+ ".jpg";
    const team0 = teamMap[game.code0];
    const team1 = teamMap[game.code1];

    const utcTime = moment.unix(game.betEndAt).utc();
    const date = moment(utcTime).format("YYYY/MM/DD");
    const time = moment(utcTime).format("HH:mm");
  
    // console.log("Match.play", side, play);
    // const handleOpen = () => {
    //     console.log('handleOpen');
    //     setOpen(true);
    // };
    
    const handleClose = (value) => {
        // console.log(value);
        setPlay(false);
        //setSelectedValue(value);
    };

    const betSide0 = () => {
        setSide(0);
        setPlay(true);       
        //console.log('betSide0', play, side);
    }

    const betSide1 = () => {
        setSide(1);
        setPlay(true);       
        //console.log('betSide1', play, side);
    }

    return (
        <>
        <div className='fight'>
        <div className='A'>
        <img src={flag0} width='80px' />
        <p style={{color:'#fff'}}>{team0}</p>
        </div>
        <div className='VS'>
        <p className='day' style={{color:'#fff'}}>{date}</p>
        <p className='VS-time' style={{color:'#fff'}}>{time}</p>
        <p className='VS-watch' style={{color:'#fff'}}>{game.goal0} : {game.goal1}</p>
        {/* <p className='VS-ECU'>6666 participation</p> */}
        </div>
        <div className='B'>
        <img src={flag1} width='80px' />
        <p style={{color:'#fff'}}>{team1}</p>
        </div>
    </div>
    <p style={{color:'#fff',textAlign:'center'}} className='forecast'>Which team will win?</p>
    <div className='game-btn'>
    <Button style={{color:'#fff',border:'1px solid #fff'}}  onClick={betSide0}>{team0} victory</Button> 
    <Button style={{color:'#fff',border:'1px solid #fff'}}  onClick={betSide1}>{team1} victory</Button> 
    </div>
    <BetDialog gameId={id} side={side} open={play} setClose={handleClose}/>
    </>
    )
}