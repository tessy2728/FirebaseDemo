export const isJSON = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const parseJSON = (value) => {
    if(isJSON(value)) {
        return JSON.parse(value)
    } else {
        return value;
    }
}
