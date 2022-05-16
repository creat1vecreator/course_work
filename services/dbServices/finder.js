const {getByParamsBuy, getByParamsRent} = require("./filtrationSearch");

const {filterByBalconyAndLoggiaArr, filteredByNotFirstNotLast} = require("./filtrationHelpers");

const finderBuy = async (body) => {
    let {
        typeOfObject,
        rooms,
        priceFrom,
        priceTo,
        squareFrom,
        squareTo,
        sellerPrivate,
        notMatterSeller,
        floorFrom,
        floorTo,
        floorNotFirst,
        floorNotLast,
        floorInHouseFrom,
        floorInHouseTo,
        brickBuilding,
        panelBuilding,
        blockBuilding,
        monolithicBuilding,
        balcony,
        loggia,
        year2022,
        year2023,
        yearNotMatter,
        squareKitchenFrom,
        squareKitchenTo,
        kitchenNotMatter,
        typeOfHousingFlat,
        typeOfHousingApartments,
        typeOfHousingNotMatter,
        typeOfPurchase,

    } = body

    let filteredMongoArr = await getByParamsBuy(
        priceFrom,
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
    );

    const resBalconyAndLoggia = filterByBalconyAndLoggiaArr(filteredMongoArr, balcony, loggia);

    const resNotFirstNotLast = filteredByNotFirstNotLast(resBalconyAndLoggia, floorNotFirst, floorNotLast);

    return resNotFirstNotLast;
}
const finderRent = async (body) => {
    let {
        typeOfObject,
        rooms,
        priceFrom,
        priceTo,
        squareFrom,
        squareTo,
        sellerPrivate,
        notMatterSeller,
        floorFrom,
        floorTo,
        floorNotFirst,
        floorNotLast,
        floorInHouseFrom,
        floorInHouseTo,
        brickBuilding,
        panelBuilding,
        blockBuilding,
        monolithicBuilding,
        balcony,
        loggia,
        squareKitchenFrom,
        squareKitchenTo,
        kitchenNotMatter,
        typeOfHousingFlat,
        typeOfHousingApartments,
        typeOfHousingNotMatter,
    } = body


    let filteredMongoArr = await getByParamsRent(
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
    );

    const resBalconyAndLoggia = filterByBalconyAndLoggiaArr(filteredMongoArr, balcony, loggia);
    // console.log('resBalconyAndLoggia length:', resBalconyAndLoggia.length);

    const resNotFirstNotLast = filteredByNotFirstNotLast(resBalconyAndLoggia, floorNotFirst, floorNotLast);
    // console.log('resNotFirstNotLast length:', resNotFirstNotLast.length);

    return resNotFirstNotLast;
}

module.exports = {finderBuy, finderRent}

