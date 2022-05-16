//puppeteer extra allows to add plugins, it is the wrapper for standard puppeteer
const puppeteer = require('puppeteer-extra');
const {setTypeOfObject, findDeadlineCompletion} = require("./utils/avitoHelpersDP");
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

const detailPageScrapperTest = async (avitoDetailPageUrl = "https://www.avito.ru/nizhniy_novgorod/kvartiry/2-k._kvartira_561m_1925et._2304771106") => {
    //launching puppeteer and setting parameters

    await puppeteer.launch({
        defaultViewport: false,
        //viewable window
        headless: false,
        //devtools are activated since start
        devtools: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        userDataDir: '/Users/andrey/Library/Application Support/Google/Chrome/Default',


    }).then(async browser => {
            try {
                const page = await browser.newPage();
                const {
                    setTypeOfObject,
                    setBalcony,
                    setLoggia,
                    findDeadlineCompletion
                } = require('./utils/avitoHelpersDP');


                try {
                    await page.exposeFunction('setTypeOfObject', setTypeOfObject)
                        .then(() => console.log('loaded func: setTypeOfObject to the page!'));
                    await page.exposeFunction('setBalcony', setBalcony)
                        .then(() => console.log('loaded func: setBalcony to the page!'));
                    await page.exposeFunction('setLoggia', setLoggia)
                        .then(() => console.log('loaded func: setLoggia to the page!'));
                    await page.exposeFunction('findDeadlineCompletion', findDeadlineCompletion)
                        .then(() => console.log('loaded func: findDeadlineCompletion to the page!'));

                } catch (err) {
                    console.log('Something went wrong in loading helpers');
                }

                await page.goto(avitoDetailPageUrl, {waitUntil: "domcontentloaded"});

                let detailPageData = await page.evaluate(async () => {
                            console.log('starting scrapping detail page...');
                            try {
                                let res = {};

                                let containerWithParams = Array.from(document.querySelectorAll('[class*=params]'))
                                    .map(el => el.innerText);

                                console.log('container with params:', containerWithParams);

                                let typeOfObjectArr = containerWithParams
                                    .filter((el) => el.includes('Тип дома:') && el.length > 11 && el.length < 30);

                                let typeOfObject = '';

                                if (!!typeOfObjectArr.toString()) {
                                    typeOfObject = await setTypeOfObject(typeOfObjectArr
                                        .toString()
                                        .split(':')[1]).then(res => res);
                                }

                                console.log('typeOfObject:', typeOfObject);

                                let squareKitchenArr = containerWithParams.filter(str =>
                                    str.includes('Площадь кухни') && str.length > 15 && str.length < 24);
                                console.log('square kitchen arr:', squareKitchenArr);

                                let squareKitchen = '';

                                console.log('it is all ok there!');

                                if (!!squareKitchenArr.toString()) {
                                    squareKitchen = squareKitchenArr
                                        .map(el => el.replaceAll(/ /g, ' '))
                                        .toString()
                                        .split(' ')[2]
                                        .toString();
                                }

                                //чекнуть со ссылкой, где имеется балкон...
                                let balconyAndLoggiaArr = containerWithParams.filter(el => el.includes('Балкон') && el.length > 20 && el.length < 34);

                                console.log('balconyAndLoggiaArr', balconyAndLoggiaArr);

                                let balconyAndLoggia = '';

                                if (!!balconyAndLoggiaArr.toString()) {
                                    balconyAndLoggia = balconyAndLoggiaArr
                                        .toString()
                                        .split(':')[1];
                                }

                                console.log('balcony and loggia after filtering:', balconyAndLoggia);

                                let loggia = false;
                                let balcony = false;

                                if (!!balconyAndLoggia) {
                                    console.log('passed to the condition');

                                    console.log('contains loggia?', balconyAndLoggia.includes('лоджия'));

                                    loggia = await setLoggia(balconyAndLoggia).then(res => res);

                                    balcony = await setBalcony(balconyAndLoggia).then(res => res);
                                }

                                let description = '';

                                if (!!document.querySelector('[class*=description]')) {
                                    description = document.querySelector('[class*=description]')
                                        .innerText
                                        .replace('Описание', '');
                                }
                                let images = [];

                                Array
                                    .from(document.querySelectorAll('img'))
                                    .map(el => el.getAttribute('src'))
                                    .filter(el => el.includes('https') && !el.includes('{WEBO_CID}'))
                                    .forEach(el => images.push(el));

                                let deadlineCompletionArr = containerWithParams
                                    .filter(el => el.includes('Срок сдачи') && el.length > 12 && el.length < 33);
                                console.log('deadlineCompletionArr', deadlineCompletionArr);

                                let deadlineCompletion = 0;

                                if (!!deadlineCompletionArr.toString()) {
                                    deadlineCompletion = +await findDeadlineCompletion(deadlineCompletionArr
                                        .toString()
                                        .split(':')[1]);
                                }
                                let yearOfConstructionArr = containerWithParams.filter((str) =>
                                    str.includes('Год постройки') && str.length > 15 && str.length < 25);
                                console.log('yearOfConstructionArr', yearOfConstructionArr);

                                let yearOfConstruction = 0;

                                //ВОПРОС С ЛОГИКОЙ, БЫВАЕТ КОГДА ДОМ СДАН, И МОЖНО БЫЛО БЫ ЗАСЕТИТЬ 2022, НО НЕИЗВЕСТНО В КАКОМ ГОДУ ОН БЫЛ СДАН
                                if (!!yearOfConstructionArr.toString()) {
                                    yearOfConstruction = +await findDeadlineCompletion(yearOfConstructionArr
                                        .toString()
                                        .split(':')[1]
                                    );
                                }

                                res[`loggia`] = loggia
                                res[`balcony`] = balcony
                                res[`typeOfObject`] = typeOfObject;
                                res[`squareKitchen`] = !!squareKitchen ? squareKitchen : 'non-valid';
                                res['description'] = description;
                                res[`images`] = images;
                                res['deadlineCompletion'] = deadlineCompletion;
                                res['yearOfConstruction'] = yearOfConstruction;

                                return res;

                            } catch
                                (e) {
                                console.log('Program has stopped because of: ', e);
                            }
                        }
                    )
                ;
                console.log('detail page data: ', await detailPageData);
            } catch
                (e) {
                console.log(`Program has been stopped, because of: ${e}`);
            }
        }
    )
    ;
}
const urlTest = 'https://www.avito.ru/nizhniy_novgorod/kvartiry/1-k._kvartira_40m_79et._1298194267';
detailPageScrapperTest(urlTest).then(() => console.log('end to execute the script'));

module.exports = {detailPageScrapperTest}



