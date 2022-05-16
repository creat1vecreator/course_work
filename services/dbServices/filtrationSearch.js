const RealEstate = require('../../models/RealEstate');
const {
    setValidSquareKitchen,
    setValidTypesOfObjects,
    setValidDeadlineCompetion,
    setValidCommonParams, setValidRooms
} = require("./filtrationHelpers");

const getAllLimited = async () => {
    try {
        return RealEstate.find({})
            .limit(10);
    } catch (e) {
        throw new Error('Error has occured in the service')
    }

}

const getAll = async () => {
    try {
        return RealEstate.find({});
    } catch (e) {
        throw new Error('Error has occured in the service')
    }

}

const getByParamsBuy = async (priceFrom,
                              priceTo,
                              rooms,
                              squareFrom,
                              squareTo,
                              squareKitchenFrom,
                              squareKitchenTo,
                              kitchenNotMatter,
                              floorFrom,
                              floorTo,
                              floorInHouseFrom,
                              floorInHouseTo,
                              brickBuilding,
                              panelBuilding,
                              blockBuilding,
                              monolithicBuilding,
                              year2022,
                              year2023,
                              yearNotMatter
) => {
    const filteredByParams = await RealEstate.find({
        typeOfPurchase: 'buy',
        price: setValidCommonParams(priceFrom, priceTo),
        rooms: setValidRooms(rooms),
        square: setValidCommonParams(squareFrom, squareTo),
        squareKitchen: setValidSquareKitchen(squareKitchenFrom, squareKitchenTo, kitchenNotMatter),
        floorFlat: setValidCommonParams(floorFrom, floorTo),
        floorHouse: setValidCommonParams(floorInHouseFrom, floorInHouseTo),
        typeOfObject: {$in: setValidTypesOfObjects(monolithicBuilding, brickBuilding, panelBuilding, blockBuilding)},
        deadlineCompletion: setValidDeadlineCompetion(year2022, year2023, yearNotMatter),
    });
    console.log('filteredByParams', filteredByParams.length);
    return filteredByParams;
}

const getByParamsRent = async (
    rooms,
    priceFrom,
    priceTo,
    squareFrom,
    squareTo,
    floorFrom,
    floorTo,
    floorInHouseFrom,
    floorInHouseTo,
    brickBuilding,
    panelBuilding,
    blockBuilding,
    monolithicBuilding,
    squareKitchenFrom,
    squareKitchenTo,
    kitchenNotMatter
) => {

    const filteredByParams = await RealEstate.find({
        typeOfPurchase: 'rent',
        price: setValidCommonParams(priceFrom, priceTo),
        rooms: setValidRooms(rooms),
        square: setValidCommonParams(squareFrom, squareTo),
        squareKitchen: setValidSquareKitchen(squareKitchenFrom, squareKitchenTo, kitchenNotMatter),
        floorFlat: setValidCommonParams(floorFrom, floorTo),
        floorHouse: setValidCommonParams(floorInHouseFrom, floorInHouseTo),
        typeOfObject: {$in: setValidTypesOfObjects(monolithicBuilding, brickBuilding, panelBuilding, blockBuilding)},
    });
    console.log('filtered by params rent length:', filteredByParams.length);
    return filteredByParams;
}

module.exports = {getAllLimited, getAll, getByParamsBuy, getByParamsRent}