import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {validValue} from './util.js'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
}));

function ValueInput(props) {
    const [value, setValue] = React.useState(1);
    const {getValue, max, unit, decimals} = props

    const handleChange = (event) => {
        const value = event.target.value.trim();
        // console.log("value", setValue);
        setValue(value);
        getValue(value);
    };
    // console.log("max, unit, decimals", max, unit, decimals);
    const getHint = () => {
        if (value && value=='') {
            if (max == 0)
                return "Chips used up";
            else
                return " <= " + max;
        } else if (isNaN(value)) {
            return "Not a number"
        } else if (value<=max) {
            return "Value is valid";
        } else {
            return "Value is invalid";
        }
    }

    const hintMsg = getHint()
    const classes = useStyles();

    return (
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="amount">VST: </InputLabel>
        <Input
            id="adornment-amount"
            value={value}
            onChange={handleChange}
            endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
        />
        <FormHelperText id="helper-text">{hintMsg}</FormHelperText>
    </FormControl>
    );
}

export default ValueInput;