const setValidDeadlineCompetion = (year2022, year2023, yearNotMatter) => {
    if (yearNotMatter || (!year2022 && !year2023 && !yearNotMatter)) {
        return {$gte: 0, $lte: Infinity};
    } else if (year2022 && year2023 && !yearNotMatter) {
        return {$gte: 2022, $lte: 2023};
    } else if (year2022 && !year2023 && !yearNotMatter) {
        return 2022;
    } else if (!year2022 && year2023 && !yearNotMatter) {
        return 2023;
    }
}

const setValidTypesOfObjects = (monolithicBuilding, brickBuilding, panelBuilding, blockBuilding) => {
    let res = [];
    if (monolithicBuilding) {
        res.push('monolithicBuilding');
    }
    if (brickBuilding) {
        res.push('brickBuilding');
    }
    if (panelBuilding) {
        res.push('panelBuilding');
    }
    if (blockBuilding) {
        res.push('blockBuilding');
    }

    if (!monolithicBuilding) {
        if (!brickBuilding) {
            if (!panelBuilding) {
                if (!blockBuilding) {
                    res.push('monolithicBuilding');
                    res.push('brickBuilding');
                    res.push('panelBuilding');
                    res.push('blockBuilding');
                    res.push('');
                }
            }
        }
    }

    return res;
}

const setValidSquareKitchen = (squareKitchenFrom, squareKitchenTo, squareKitchenNotMatter) => {
    console.log('squareKitchenFrom', squareKitchenFrom, !!squareKitchenFrom, 'squareKitchenTo', squareKitchenTo, !!squareKitchenFrom, 'squareKitchenNotMatter', squareKitchenNotMatter)
    if (squareKitchenNotMatter || !squareKitchenFrom && !squareKitchenTo && !squareKitchenNotMatter) {
        return {$gte: 0, $lte: Infinity}
    } else if (squareKitchenFrom && !squareKitchenTo && !squareKitchenNotMatter) {
        return {$gte: squareKitchenFrom, $lte: Infinity}

    } else if (!squareKitchenFrom && squareKitchenTo && !squareKitchenNotMatter) {
        return {$gte: 0, $lte: squareKitchenTo}

    } else if (squareKitchenFrom && squareKitchenTo && !squareKitchenNotMatter) {
        return {$gte: squareKitchenFrom, $lte: squareKitchenTo}
    }

}


const setValidCommonParams = (paramFrom, paramTo) => {
    if (!paramFrom && !paramTo) {
        return {$gte: 0, $lte: Infinity}
    } else if (paramFrom && !paramTo) {
        return {$gte: paramFrom, $lte: Infinity}
    } else if (!paramFrom && paramTo) {
        return {$gte: 0, $lte: paramTo}
    } else if (paramFrom && paramTo) {
        return {$gte: paramFrom, $lte: paramTo}

    }
}

const filterByBalconyAndLoggiaArr = (filterByMongoArr, balcony, loggia) => {
    let res = [];
    if (balcony && !loggia) {
        for (const filterByMongoRealEstate of filterByMongoArr) {
            if (filterByMongoRealEstate.balcony) {
                res.push(filterByMongoArr);
            }
        }
    } else if (!balcony && loggia) {
        for (const filterByMongoRealEstate of filterByMongoArr) {
            if (filterByMongoRealEstate.loggia) {
                res.push(filterByMongoRealEstate);
            }
        }
    } else if (!balcony && !loggia || balcony && loggia) {
        for (const filterByMongoRealEstate of filterByMongoArr) {
            res.push(filterByMongoRealEstate);
        }
    }
    return res;
}

const filteredByNotFirstNotLast = (resBalconyAndLoggia, floorNotFirst, floorNotLast) => {
    let res = [];
    console.log('floorNotFirst', floorNotFirst, 'floorNotLast', floorNotLast);
    if (floorNotFirst && !floorNotLast) {
        for (const balconyAndLoggiaReal of resBalconyAndLoggia) {
            if (balconyAndLoggiaReal.floorFlat > 1) {
                res.push(balconyAndLoggiaReal);
            }
        }
    } else if (!floorNotFirst && floorNotLast) {
        for (const balconyAndLoggiaReal of resBalconyAndLoggia) {
            if (balconyAndLoggiaReal.floorFlat !== balconyAndLoggiaReal.floorHouse) {
                res.push(balconyAndLoggiaReal);
            }
        }
    } else if (floorNotFirst && floorNotLast) {
        for (const balconyAndLoggiaReal of resBalconyAndLoggia) {
            if (balconyAndLoggiaReal.floorFlat !== balconyAndLoggiaReal.floorHouse) {
                if (balconyAndLoggiaReal.floorFlat > 1) {
                    res.push(balconyAndLoggiaReal);
                }
            }
        }
    } else if (floorNotFirst && floorNotLast) {
        for (const balconyAndLoggiaReal of resBalconyAndLoggia) {
            if (balconyAndLoggiaReal.floorFlat !== balconyAndLoggiaReal.floorHouse) {
                if (balconyAndLoggiaReal.floorFlat > 1) {
                    res.push(balconyAndLoggiaReal);
                }
            }
        }

    } else if (!floorNotFirst && !floorNotLast) {
        for (const balconyAndLoggiaReal of resBalconyAndLoggia) {
            res.push(balconyAndLoggiaReal);
        }
    }
    return res;

}

const setValidRooms = (rooms) => {

    if (rooms === '4+') {
        return {$gte: 4};
    } else if (+rooms === 0) {
        return {$gte: 0, $lte: Infinity};
    } else if (+rooms === 1 || rooms === 'studio') {
        return 1;
    } else if (+rooms === 2) {
        return 2;
    } else if (+rooms === 3) {
        return 3;

    }
}
module.exports = {
    setValidTypesOfObjects,
    setValidDeadlineCompetion,
    setValidSquareKitchen,
    setValidCommonParams,
    filterByBalconyAndLoggiaArr,
    filteredByNotFirstNotLast,
    setValidRooms,

};
