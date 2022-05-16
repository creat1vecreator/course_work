const {Router} = require('express');
const {getAllLimited} = require("../services/dbServices/filtrationSearch");
const {saveAllEntities, deleteAll} = require("../services/dbServices/refreshDb");
const {scrapAvito} = require("../services/scrappers/avito/avitoScrapper");
const {finderBuy, finderRent} = require("../services/dbServices/finder");
const router = Router();

router.get('/getAll', async (req, res) => {
    try {
        const allEntitesLimited = await getAllLimited();
        if (!(allEntitesLimited.length === 0)) {

            console.log('sent all db limited to 10 to the front')
            return res.status(200).json({
                entities: allEntitesLimited,
                message: 'sent to the front all entities limited to 10'
            });

        }

        return res.status(404).json({message: 'There are any of the entities in db'});
    } catch (e) {
        return res.status(400).json({message: `something went wrong: ${e}`});
    }
});

router.get('/refreshDb', async (req, res) => {
    console.log('got request to refresh database...');

    const avitoUrlBuy = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/prodam-ASgBAgICAUSSA8YQ?cd=1';
    const dataCardsAvitoBuy = await scrapAvito(avitoUrlBuy)
        .then(res => res)
        .catch(e => console.log('something happened when was scrapping avito buy', e));
    console.log('dataCardsAvitoBuy in routes:', dataCardsAvitoBuy);

    const avitoUrlRent = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/sdam-ASgBAgICAUSSA8gQ?cd=1&localPriority=0';
    const dataCardsAvitoRent = await scrapAvito(avitoUrlRent)
        .then(res => res)
        .catch(e => console.log('something happened when was scrapping avito rent', e));
    console.log('dataCardsAvitoRent in routes', dataCardsAvitoRent);

    if (dataCardsAvitoBuy.length !== 0 && dataCardsAvitoRent.length !== 0) {
        console.log('scrapped arrays contain valid info to save');
        await saveAllEntities(dataCardsAvitoBuy)
            .then(() => console.log('avito buy are saved successfully'))
            .catch(e => console.log('something happened when was saving avito buy', e));

        await saveAllEntities(dataCardsAvitoRent)
            .then(() => console.log('avito rent are saved successfully'))
            .catch(e => console.log('something happened when was saving avito rent', e));

        await deleteAll();
    }

    return res.status(200).json({message: 'refreshed db'});
});

router.post('/getByParams/buy', async (req, res) => {

    const filteredRealEstates = await finderBuy(req.body);
    console.log('filteredRealEstate length in post:', filteredRealEstates.length);
    if (filteredRealEstates.length === 0) {

        return res.status(404).json({
            message: 'Incorrect params in form or they are too specified to find some valid entities.'
        });
    } else {
        return res.status(200).json({
            filteredRealEstates,
            message: 'Found correctly.'

        });
    }

});

router.post('/getByParams/rent', async (req, res) => {

    const filteredRealEstates = await finderRent(req.body);
    console.log('filteredRealEstate length in post:', filteredRealEstates.length);
    if (filteredRealEstates.length === 0) {

        return res.status(404).json({
            message: 'Incorrect params in form or they are too specified to find some valid entities.'
        });
    } else {
        return res.status(200).json({
            filteredRealEstates,
            message: 'Found correctly.'

        });
    }

});

module.exports = router;
