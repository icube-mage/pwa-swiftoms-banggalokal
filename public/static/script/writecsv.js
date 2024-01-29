/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const Papa = require('papaparse');
const { translationJSONDir } = require('../../swift.config');

fs.readdir(`${translationJSONDir}en/`, (err, filenames) => {
    if (err) {
        throw err;
    }
    const jsonFilenames = filenames.filter((name) => name.includes('.json'));
    const dataArr = [];
    const uniqueKey = [];
    jsonFilenames.forEach((filename) => {
        fs.readFile(`${translationJSONDir}en/${filename}`, 'utf-8', (error, content) => {
            if (error) {
                throw error;
            }
            const jsonData = JSON.parse(content.toString());
            const pushToArray = (data) => {
                // eslint-disable-next-line guard-for-in
                for (const key in data) {
                    if (typeof data[key] === 'string') {
                        if (!uniqueKey.includes(`${data[key]}:${data[key]}`)) {
                            dataArr.push({
                                // key,
                                key: data[key],
                                text: data[key],
                                module: '',
                            });
                            uniqueKey.push(`${data[key]}:${data[key]}`);
                        }
                    }
                    if (typeof data[key] === 'object') {
                        pushToArray(data[key]);
                    }
                }
            };
            pushToArray(jsonData);
            const res = Papa.unparse([...new Set(dataArr)]);
            fs.writeFileSync('writecsv2.csv', res);
        });
    });
});
