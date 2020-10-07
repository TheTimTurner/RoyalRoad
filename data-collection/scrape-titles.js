const fs = require('fs');
const axios = require('axios').default;
const cheerio = require('cheerio');

let data = { books: [] };
async function updateTableOfContents(count) {
    console.log(`FETCHING FROM ${count}`);
    await axios.get(`https://www.royalroad.com/fictions/search?page=${count}&minPages=1&orderBy=title`)
        .then( (html) => {
            const $ = cheerio.load(html.data);

            $('a.font-red-sunglo').each((i, elem) => {
                const title = $(elem).text();
                const homepage = $(elem).attr('href');
                data.books.push({ title, homepage });
            });
        });
    if (count > 1) {
        updateTableOfContents(count-1);
    } else {
        const stringified = JSON.stringify(data, null, 4);
        console.log('Starting Table of Contents file write');
        fs.writeFile('table-of-contents.json', stringified, (err) => err ? console.log('Could not write table of contents') : console.log('Table of Contents written to file.'));
    }
}
updateTableOfContents(1384);


