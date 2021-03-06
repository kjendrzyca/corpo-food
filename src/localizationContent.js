'use strict';
const locale = require('locale');

const defaultLocale = 'pl';
module.exports.defaultLocale = defaultLocale;
const resources = {
    pl: {
        app: {
            appName: 'Corpo food',
            uniqueValueProposition: ' orderuj food bez fakapu',
            backToDashboard: 'Wróć na dashboard',
        },
        dashboard: {
            noOrdersYet: 'Nikt jeszcze nie sfokusował się na czelendża - bądź pierwszy',
            addOrder: 'DODAJ ORDER',
        },
        orderTile: {
            deadline: 'Deadlajn:',
            author: 'Fokusuje się:',
            alreadyOrdered: 'os. już zamówiły',
        },
        newOrderForm: {
            restaurant: 'Lokal',
            orderingAt: 'Zamawiam o',
            deliveryAt: 'Zamawiam na',
            menu: 'Menu',
            description: 'Opis',
            author: 'Autor',
            deliveryCost: 'Koszt dowozu',
            extraCostPerMeal: 'Do każdego zamówienia',
            save: 'Dodaj order',
            validationMessages: {
                required: 'To pole jest wymagane',
                provideRestaurant: 'Prosze podać lokal',
                provideValidHour: 'Podaj poprawną godzinę',
                provideMenuLink: 'Proszę podać odnośnik do menu',
                provideAuthor: 'Proszę podać autora zamówienia',
                provideValidDeliveryCost: 'Podaj poprawny koszt dostawy',
                provideValidExtraCostPerMeal: 'Podaj poprawny koszt do każdego zamówienia',
            },
        },
        schemaValidation: {
            order: {
                deadline: {
                    required: 'Nie zapomnij o deadljnie!',
                    min: 'Dedlajn nie może być w przeszłości',
                },
                deliveryTime: {
                    required: 'Czas dostawy jest wymagany!',
                    min: 'Czas dostawy nie może być w przeszłości',
                },
                restaurant: {
                    required: 'Nazwa lokalu jest wymagana!',
                },
                menu: {
                    required: 'Menu jest wymagane! Wrzuć linka do menu.',
                },
                author: {
                    required: 'Podaj imię!',
                },
            },
        },
        orderDetails: {
            deliveryCost: 'Dostawa kosztuje',
            descriptionHeader: 'Opis',
            extraCostPerMeal: 'Dodatkowo do każdego zamówienia',
            foodExpectedAt: 'Chcemy jeść o',
            menu: 'Link do menu',
            orderBy: 'Dzisiaj zamawia',
            orderedAt: 'Dzwoni po jedzenie o',
            orderingFrom: 'Zamawiamy z',
        },
        mealList: {
            whoIsOrdering: 'Zamawiają razem',
            who: 'kto',
            what: 'co',
            howMuch: 'za ile',
        },
        signUpForMeal: {
            whatDoYouWant: 'co chcesz?',
            menuPrice: 'cena z menu',
            action: 'fokusuj',
        },
        setUsername: {
            username: 'nazwa użytkownika',
            provideUsername: 'podaj nazwę użytkownika',
            randomUsername: 'LOSOWA NAZWA',
        },
        orderManagement: {
            managerBadge: 'MENADŻER',
            states: {
                ordered: 'Zamawiam!',
            },
        },
        notifications: {
            manager: {
                title: 'Zamówienie gotowe, ludzie mogą bez fakapu zamawiać jedzenie',
                introToLink: 'Oto Twój permalink pod którym możesz się fokusować na zamówienie:',
                betterSaveIt: 'Lepiej uniknij fakapu i gdzieś zapisz ten link, bo nie pokażemy Ci go więcej!',
            },
        },
    },
    en: {
        app: {
            appName: 'Corpo food',
            uniqueValueProposition: ' order food without fuckups',
            backToDashboard: 'Back to dashboard',
        },
        dashboard: {
            noOrdersYet: 'Nobody is on the task yet - be first',
            addOrder: 'ADD ORDER',
        },
        orderTile: {
            deadline: 'Deadline:',
            author: 'On the task:',
            alreadyOrdered: 'have already ordered',
        },
        newOrderForm: {
            restaurant: 'Restaurant',
            orderingAt: 'Calling at',
            deliveryAt: 'I want food at',
            menu: 'Menu',
            description: 'Description',
            author: 'Author',
            deliveryCost: 'Delivery cost',
            extraCostPerMeal: 'Extra cost per meal',
            save: 'Save order',
            validationMessages: {
                required: 'This field is required',
                provideRestaurant: 'Provide restaurant name',
                provideValidHour: 'Provide valid hour',
                provideMenuLink: 'Provide menu link',
                provideAuthor: 'Provide author',
                provideValidDeliveryCost: 'Provide valid delivery cost',
                provideValidExtraCostPerMeal: 'Provide valid extra cost per meal',
            },
        },
        schemaValidation: {
            order: {
                deadline: {
                    required: 'Dont forget the deadline!',
                    min: 'Deadline must not be in the past',
                },
                deliveryTime: {
                    required: 'Delivery time is required!',
                    min: 'Delivery time must not be in the past',
                },
                restaurant: {
                    required: 'Provide name for the restaurant',
                },
                menu: {
                    required: 'Add menu link to make our lives easier',
                },
                author: {
                    required: 'Who are you?',
                },
                accessCode: {
                    required: 'Access code is required',
                },
            },
        },
        orderDetails: {
            deliveryCost: 'Delivery cost',
            descriptionHeader: 'Description',
            extraCostPerMeal: 'Extra cost per meal',
            foodExpectedAt: 'We want food at',
            menu: 'Menu link',
            orderBy: 'Today orders',
            orderedAt: 'Calling at',
            orderingFrom: 'Ordering from',
        },
        mealList: {
            whoIsOrdering: 'Already ordering together',
            who: 'who',
            what: 'what',
            howMuch: 'how much',
        },
        signUpForMeal: {
            whatDoYouWant: 'meal name',
            menuPrice: 'menu price',
            action: 'let\'s go',
        },
        setUsername: {
            username: 'Username',
            provideUsername: 'provide a username',
            randomUsername: 'RANDOM USERNAME',
        },
        orderManagement: {
            managerBadge: 'MANAGER',
            states: {
                ordered: 'Food ordered',
            },
        },
        notifications: {
            manager: {
                title: 'Order is ready, people can sign up for food!',
                introToLink: 'Here is your permanent link to a page where you can manage this order:',
                betterSaveIt: 'You should probably save this link somewhere as we will never give it to you again!',
            },
        },
    },
};

module.exports.resources = resources;

const _getSupportedLocales = () => {
    const localesInContent = [];
    for (let localeInContent in resources) {
        if (resources.hasOwnProperty(localeInContent)) {
            localesInContent.push(localeInContent);
        }
    }

    return new locale.Locales(localesInContent);
};

const getBestMatchingLocale = request => {
    locale.Locale.default = defaultLocale;

    const acceptableLocales = new locale.Locales(request.headers['accept-language']);

    return acceptableLocales.best(_getSupportedLocales());
};

module.exports.getBestMatchingLocale = getBestMatchingLocale;

module.exports.getBestMatchingResources = request => {
    return resources[getBestMatchingLocale(request)];
};
