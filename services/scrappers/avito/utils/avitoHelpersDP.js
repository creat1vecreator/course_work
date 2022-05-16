// const splittedTest = [].concat(...testString.split(' ').map(arr => arr.split(',').filter(str => str.startsWith('https'))));

const setBalcony = (str) => {
    if (!!str) {
        return str.includes('балкон');
    }
    return 'non-valid';
}

const setLoggia = (str) => {
    if (!!str) {
        return str.includes('лоджия');
    }
    return 'non-valid';
}

const setTypeOfObject = (str) => {
    console.log('str:', str, 'undefined?', str === undefined);
    if (!!str) {
        str = str.trim();
        switch (str) {
            case 'монолитный':
                return 'monolithicBuilding';
            case 'кирпичный':
                return 'brickBuilding';
            case 'панельный':
                return 'panelBuilding';
            case 'блочный':
                return 'blockBuilding';
            default:
                return 'non-valid';
        }
    }
    return 'non-valid';
}

const replacerNonNums = (str) => {
    return str.replace(/\D/g, '');
}
const findDeadlineCompletion = (str) => {
    console.log('str in findDedalinCompetion')
    if (str.length > 3) {
        for (let i = 0; i < str.length; i++) {
            if ((!isNaN(str[i]) && +str[i] !== 0) && !isNaN(str[i + 1]) && !isNaN(str[i + 2]) && !isNaN(str[i] + 3)) {
                return str[i] + str[i + 1] + str[i + 2] + str[i + 3];
            }
        }
    }
    return 0;
}

module.exports = {setTypeOfObject, setBalcony, setLoggia, findDeadlineCompletion};
