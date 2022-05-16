const RealEstate = require('../../models/RealEstate');
const bcrypt = require("bcrypt");

const deleteAll = async () => {
    await RealEstate.deleteMany({} );
}

const saveAllEntities = async (dataCards) => {

    for (const dataCard of dataCards) {

        const id = await bcrypt.hash(dataCard.toString(), 12).then(res => res);

        const realEstate = new RealEstate({
            id,
            "link": dataCard.link,

            "price": dataCard.price,

            "address": {
                "street": dataCard.address.street,
                "numberOfHouse": dataCard.address.numberOfHouse
            },

            "rooms": dataCard.rooms,

            "square": dataCard.square,

            "squareKitchen": dataCard.squareKitchen,

            "floorFlat": dataCard.floorFlat,

            "floorHouse": dataCard.floorHouse,

            "page": dataCard.page,

            "typeOfPurchase": dataCard.typeOfPurchase,

            "description": dataCard.description,

            "typeOfObject": dataCard.typeOfObject,

            "balcony": dataCard.balcony,

            "loggia": dataCard.loggia,

            "deadlineCompletion": dataCard.deadlineCompletion,

            "yearOfConstruction": dataCard.yearOfConstruction,

            "images": dataCard.images,


        });

        await realEstate.save()
            .then(() => console.log('successfully saved entity'))
            .catch((e) => console.log(`something went wrong in saving entity: ${dataCard} and program has fallen because of: ${e}`));
    }
}

module.exports = {deleteAll, saveAllEntities};