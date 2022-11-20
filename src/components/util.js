export const validValue = (value, min, max, decimals) => {
    let valueF = !value ? 0 : parseFloat(value)
    if (valueF > max || valueF < min)
        return false
    else if (new Number(value).toFixed(decimals) == valueF) {
        return true;
    } else {
        return false
    }
}

export const teamMap = {
    'Arg': 'Argentine',
    'Eng': 'England',
    'Ger': 'Germany',
}