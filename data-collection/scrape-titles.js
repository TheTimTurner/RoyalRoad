const fs = require('fs');
const axios = require('axios').default;
const cheerio = require('cheerio');
let data = { books: [] };
async function updateTableOfContents(url) {
    await axios.get(url)
        .then( (html) => {
            const $ = cheerio.load(html.data);

            $('a.font-red-sunglo').each((i, elem) => {
                const title = $(elem).text();
                const homepage = $(elem).attr('href');
                data.chapters.push({ title, homepage });
            });
            const stringified = JSON.stringify(data, null, 4);
            console.log('Starting Table of Contents file write');
            fs.writeFile('table-of-contents.json', stringified, (err) => err ? console.log('Could not write table of contents') : console.log('Table of Contents written to file.'));
        });
}
updateTableOfContents('https://www.royalroad.com/fictions/search?page=2&advanced=True');
