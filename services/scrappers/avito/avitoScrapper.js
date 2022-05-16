//puppeteer extra allows to add plugins, it is the wrapper for standard puppeteer
const puppeteer = require('puppeteer-extra');
// const avitoUrlBuy = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/prodam-ASgBAgICAUSSA8YQ?cd=1';
// const avitoUrlRent = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/sdam-ASgBAgICAUSSA8gQ?cd=1&localPriority=0';
//

puppeteer.use(require('puppeteer-extra-plugin-stealth')());

const {
    findRoomsAvito,
    findFloorFlatAvito,
    findSquareAvito,
    findFloorHouseAvito,
    replacerNonNums
} = require("./utils/avitoHelpersMP");
const {detailPageScrapper} = require('./detailPageScrapper');

const {
    setTypeOfObject,
    setBalcony,
    setLoggia,
    findDeadlineCompletion,

} = require('./utils/avitoHelpersDP');

// const avitoUrl = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/prodam-ASgBAgICAUSSA8YQ?cd=1';
const scrapAvito = async (avitoUrl) => {

    let result;
    //launching puppeteer and setting parameters
    await puppeteer.launch({

        defaultViewport: false,
        //viewable window
        headless: false,
        //devtools are activated since start
        devtools: true,
        // slowMo: 3000,
        // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        // userDataDir: '/Users/andrey/Library/Application Support/Google/Chrome/Default',
        // args: [
        //     '--proxy-server=https://162.23.125.34:8080'
        // ]

    }).then(async browser => {
        console.log('there it is all ok!');
        const page = await browser.newPage();

        try {
            await page.exposeFunction('findRoomsAvito', findRoomsAvito)
                .then(() => console.log('loaded func: findRoomsAvito to the page!'))
                .catch((e) => console.log('something happened in loading func findRoomsAvito', e));

            await page.exposeFunction('findSquareAvito', findSquareAvito)
                .then(() => console.log('loaded func: findSquareAvito to the page!'))
                .catch((e) => console.log('something happened in loading func findSquareAvito', e));

            await page.exposeFunction('findFloorFlatAvito', findFloorFlatAvito)
                .then(() => console.log('loaded func: findFloorFlatAvito to the page!'))
                .catch((e) => console.log('something happened in loading func findFloorFlatAvito', e));

            await page.exposeFunction('findFloorHouseAvito', findFloorHouseAvito)
                .then(() => console.log('loaded func: findFloorHouseAvito to the page!'))
                .catch((e) => console.log('something happened in loading func findFloorFlatAvito', e));

            await page.exposeFunction('scrapDetailPageAvito', detailPageScrapper)
                .then(() => console.log('loaded func: scrapDetailPageAvitoTest to the page!'))
                .catch((e) => console.log('something happened in loading func scrapDetailPageAvitoTest', e));

            //Loading functions for detail page scrapping.
            await page.exposeFunction('setTypeOfObject', setTypeOfObject)
                .then(() => console.log('loaded func: setTypeOfObject to the page!'))
                .catch((e) => console.log('something happened in loading func setTypeOfObject', e));

            await page.exposeFunction('setBalcony', setBalcony)
                .then(() => console.log('loaded func: setBalcony to the page!'))
                .catch((e) => console.log('something happened in loading func setBalcony', e));

            await page.exposeFunction('setLoggia', setLoggia)
                .then(() => console.log('loaded func: setLoggia to the page!'))
                .catch((e) => console.log('something happened in loading func setLoggia', e));

            await page.exposeFunction('replacerNonNums', replacerNonNums)
                .then(() => console.log('loaded func: replacerNonNums to the page!'))
                .catch((e) => console.log('something happened in loading func replacerNonNums', e));

            await page.exposeFunction('findDeadlineCompletion', findDeadlineCompletion)
                .then(() => console.log('loaded func: findDeadlineCompletion to the page!'))
                .catch((e) => console.log('something happened in loading func findDeadlineCompletion', e));

            //waiting until all dom wil be loaded and ready for scrapping.
            await page.goto(avitoUrl, {waitUntil: "domcontentloaded", timeout: 50000});

            //taking information from each card
            let dataCardsAvito = await page.evaluate(async () => {
                console.log('There it is all ok!');

                //initializing array to push the objects that contain scrapped information
                let res = [];
                //taking every card that has info of real eastates.
                let allCards = document.querySelectorAll('div.iva-item-content-rejJg');

                for (const card of allCards) {
                    console.log('card:', card);

                    const link = card.querySelector('.iva-item-sliderLink-uLz1v').href;

                    const price = parseFloat((card.querySelector('.price-price-JP7qe')).innerText.replaceAll(/ /g, ''));
                    console.log('price:', price);

                    const address = card.querySelector('.geo-address-fhHd0').innerText;
                    console.log('address:', address);

                    const roomsSquareFloorsSplittedContainer = String(card.querySelector('.title-root-zZCwT')
                        .innerText).replace(/ /g, ' ')
                        .split(' ');

                    const rooms = Number(await findRoomsAvito(roomsSquareFloorsSplittedContainer).then(res => res));
                    console.log('rooms:', rooms, typeof rooms);

                    const contWithSquare = await findSquareAvito(roomsSquareFloorsSplittedContainer);

                    const square = parseFloat(contWithSquare.replace(',', '.'));

                    const floorFlat = Number(await findFloorFlatAvito(roomsSquareFloorsSplittedContainer).then(res => res));
                    console.log('floorFlat:', floorFlat);

                    const floorHouse = Number(await findFloorHouseAvito(roomsSquareFloorsSplittedContainer));
                    console.log('floorHouse:', floorHouse);

                    const page = Number(document.querySelector('.pagination-item_active-NcJX6').innerText);
                    console.log('page:', page);

                    const typeOfPurchase = String(card.querySelector('.price-price-JP7qe').innerText).includes('сутки')
                    || String(card.querySelector('.price-price-JP7qe').innerText).includes('месяц') ? 'rent' : 'buy';
                    console.log('top', typeOfPurchase);

                    let street = '';
                    let numberOfHouse = '';

                    if (address.includes(',')) {
                        street = address.split(',')[0].trim();
                        numberOfHouse = address.split(',')[1].trim();
                    } else {
                        street = address.toString();
                    }
                    console.log('street', street);
                    console.log('numberOfHouse', numberOfHouse);


                    res.push({
                        link,
                        price,
                        address: {
                            street,
                            numberOfHouse,
                        },
                        rooms,
                        square,
                        floorFlat,
                        floorHouse,
                        page,
                        typeOfPurchase,

                    });
                }
                return res;
            });
            console.log('Data cards without detail info avito:', dataCardsAvito);

            for (const dataCardAvito of dataCardsAvito) {
                console.log('started scrapping detail page:', dataCardAvito.link);
                const {
                    description,
                    typeOfObject,
                    balcony,
                    loggia,
                    images,
                    squareKitchen,
                    deadlineCompletion,
                    yearOfConstruction
                } = await detailPageScrapper(page, dataCardAvito.link).then(res => res);

                console.log('destructured data in avito scrapper: ')
                console.log('description:', description);
                console.log('typeOfObject:', typeOfObject);
                console.log('balcony:', balcony);
                console.log('loggia:', loggia);
                console.log('squareKitchen', squareKitchen);
                console.log('deadlineCompletion', deadlineCompletion);
                console.log('yearOfConstruction', yearOfConstruction);
                console.log('images', images);

                dataCardAvito['description'] = description;
                dataCardAvito['typeOfObject'] = typeOfObject;
                dataCardAvito['balcony'] = balcony;
                dataCardAvito['loggia'] = loggia;
                dataCardAvito[`squareKitchen`] = squareKitchen;
                dataCardAvito['deadlineCompletion'] = deadlineCompletion;
                dataCardAvito['yearOfConstruction'] = yearOfConstruction;
                dataCardAvito['images'] = images;
            }
            console.log('all cards new again:', dataCardsAvito);
            await browser.close();
            console.log('end to scrap:', avitoUrl);
            result = dataCardsAvito;
            return dataCardsAvito;
        } catch (e) {
            console.log(`Catched in avito scrapper. Program has been stopped, because of: ${e}`);
        }

    });
    return result;
}
// scrapAvito(avitoUrlRent).then(() => console.log('end to execute the script'));
module.exports = {scrapAvito};
