const fs = require('fs');
const scrapeFunctions = require('./scrape-fiction');
fs.readFile('table-of-contents.json', (err, rawJSON) => {
    const data = JSON.parse(rawJSON);
    const last = data.books.length-1;
    data.books.forEach(fiction, index => {
        scrapeFunctions.scrapeFiction(fiction.homepage, fiction)
        .then(() => {
            const comma = index == last ? '' : ',';
            const stringified = JSON.stringify(a_fiction, null, 4);
            fs.appendFile('dataOutput.json', `"${index}" : ${stringified}${comma}`, (err) => err ? console.log('Could not write output to file') : console.log('Output written to file.'));
        });
        await new Promise(r => setTimeout(r, 50));
    });
    const a_fiction = data.books[0];
    // fs.appendFile('dataOutput.json', )


});