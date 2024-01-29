/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-syntax */
import Papa from 'papaparse';
import cookies from 'js-cookie';

const languages = {};
let currentLanguage = cookies.get('lang') || 'en';

export const t = (localizationKey) => {
    const languageDict = languages[currentLanguage];
    if (!languageDict) return localizationKey;
    const value = languageDict[localizationKey];
    if (!value) return localizationKey;
    return value;
};

export const tr = (localizationKey) => {
    const languageDict = languages[currentLanguage];
    if (!languageDict) return localizationKey;
    const value = languageDict[localizationKey];
    if (!value) return localizationKey;
    return value;
};

export const initialize = async (name) => {
    if (!cookies.get('lang')) {
        cookies.set('lang', 'en');
    } else {
        currentLanguage = cookies.get('lang');
    }
    const response = await fetch(`static/locales/${name}.csv`);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    let content = await decoder.decode(result.value);
    // remove all new lines
    content = content.replace(/^(?:[\t ]*(?:\r?\n|\r))+/g, '');
    const { data, meta } = Papa.parse(content, { header: true });
    const [textLabel, ...locales] = meta.fields;
    for (const loc of locales) {
        languages[loc] = {};
    }
    // reorganize data into languages
    for (const line of data) {
        for (const loc of locales) {
            languages[loc][line[textLabel]] = line[loc];
        }
    }
};

export const init = async () => {
    if (!cookies.get('lang')) {
        cookies.set('lang', 'en');
    } else {
        currentLanguage = cookies.get('lang');
    }
    const response = await fetch('static/locales/en.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    let content = await decoder.decode(result.value);
    // remove all new lines
    content = content.replace(/^(?:[\t ]*(?:\r?\n|\r))+/g, '');
    const { data, meta } = Papa.parse(content, { header: true });
    const [textLabel, ...locales] = meta.fields;
    for (const loc of locales) {
        languages[loc] = {};
    }
    // reorganize data into languages
    for (const line of data) {
        for (const loc of locales) {
            languages[loc][line[textLabel]] = line[loc];
        }
    }
};
