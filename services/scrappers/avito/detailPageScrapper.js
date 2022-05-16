const {setTypeOfObject, findDeadlineCompletion} = require("./utils/avitoHelpersDP");
const detailPageScrapper = async (page, url) => {
    console.log('called func');
    try {
        await page.goto(url, {waitUntil: "domcontentloaded", timeout: 0});

        const detailPageData = await page.evaluate(async () => {

                    console.log('starting scrapping detail page...');
                    try {
                        //initializing array to push the objects that contain scrapped information
                        let res = {};

                        //taking the elems
                        let containerWithParams = Array.from(document.querySelectorAll('[class*=params]'))
                            .map(el => el.innerText);

                        let typeOfObjectArr = containerWithParams
                            .filter((el) => el.includes('Тип дома:') && el.length > 11 && el.length < 30);

                        let typeOfObject = '';

                        if (!!typeOfObjectArr.toString()) {
                            typeOfObject = await setTypeOfObject(typeOfObjectArr
                                .toString()
                                .split(':')[1]).then(res => res);
                        }


                        let squareKitchenArr = containerWithParams.filter(str =>
                            str.includes('Площадь кухни') && str.length > 15 && str.length < 24);

                        let squareKitchen = '';

                        if (!!squareKitchenArr.toString()) {
                            squareKitchen = squareKitchenArr
                                .map(el => el.replaceAll(/ /g, ' '))
                                .toString()
                                .split(' ')[2]
                                .toString();
                        }

                        let balconyAndLoggiaArr = containerWithParams.filter(el => el.includes('Балкон') && el.length > 20 && el.length < 34);

                        let balconyAndLoggia = '';

                        if (!!balconyAndLoggiaArr.toString()) {
                            balconyAndLoggia = balconyAndLoggiaArr
                                .toString()
                                .split(':')[1];
                        }

                        let loggia = false;
                        let balcony = false;

                        if (!!balconyAndLoggia) {
                            loggia = await setLoggia(balconyAndLoggia).then(res => res);

                            balcony = await setBalcony(balconyAndLoggia).then(res => res);
                        }

                        let description = 'non-valid';

                        if (!!document.querySelector('[class*=description]')) {
                            description = document.querySelector('[class*=description]')
                                .innerText
                                .replace('Описание', '');
                        }

                        let images = [];

                        if (Array.from(document.querySelectorAll('img'))[0].hasAttribute('src')) {
                            Array
                                .from(document.querySelectorAll('img'))
                                .map(el => el.getAttribute('src'))
                                .filter(el => el.includes('https') && !el.includes('{WEBO_CID}'))
                                .forEach(el => images.push(el));
                        }

                        let deadlineCompletionArr = containerWithParams
                            .filter(el => el.includes('Срок сдачи') && el.length > 12 && el.length < 33);

                        let deadlineCompletion = 0;

                        if (!!deadlineCompletionArr.toString()) {
                            deadlineCompletion = +await findDeadlineCompletion(deadlineCompletionArr
                                .toString()
                                .split(':')[1]);
                        }

                        let yearOfConstructionArr = containerWithParams.filter((str) =>
                            str.includes('Год постройки') && str.length > 15 && str.length < 25);

                        let yearOfConstruction = 0;

                        if (!!yearOfConstructionArr.toString()) {
                            yearOfConstruction = +await findDeadlineCompletion(yearOfConstructionArr
                                .toString()
                                .split(':')[1]
                            )
                        }


                        res[`loggia`] = loggia
                        res[`balcony`] = balcony
                        res[`typeOfObject`] = typeOfObject;
                        res[`squareKitchen`] = !!squareKitchen ? parseFloat(squareKitchen) : 0;
                        res['description'] = description;
                        res['images'] = images;
                        res['deadlineCompletion'] = deadlineCompletion;
                        res['yearOfConstruction'] = yearOfConstruction;

                        return res;


                    } catch
                        (e) {
                        console.log('Program has been stopped because of: ', e);
                    }
                }
            )
        ;
        console.log('detail page data logging in detail page scrapper: ', await detailPageData);
        return detailPageData;
    } catch
        (e) {
        console.log(`Catched in detail page scrapper. Program has been stopped, because of: ${e}`);
    }
}

module.exports = {detailPageScrapper};