const fs = require('fs');
const axios = require('axios').default;
const cheerio = require('cheerio');

let data = { books: [] };
async function updateTableOfContents(count) {
    console.log(`FETCHING FROM ${count}`);
    await axios.get(`https://www.royalroad.com/fictions/search?page=${count}&minPages=1&orderBy=title`)
        .then( (html) => {
            const $ = cheerio.load(html.data);
            $('.search-content').each((i, searchContent) => {
                let newEntry = {};
                const timeString = $(searchContent).find('time').prop('unixtime');
                const timeInt = parseInt(timeString);
                newEntry.lastUpdate = timeInt;
                newEntry.dead = timeInt < 1596758400;//unix time referring to Auguest 8th 2020. Dead if not updated since then
                $(searchContent).find('a.font-red-sunglo').each((i, elem) => {
                    // console.log("HERE!");
                    const title = $(elem).text();
                    const homepage = $(elem).attr('href');
                    newEntry.title = title;
                    newEntry.homepage = homepage;
                });
                data.books.push(newEntry);
            });
        }
    );
    if (count > 1) {
        updateTableOfContents(count-1);
    } 
    else {
        const stringified = JSON.stringify(data, null, 4);
        console.log('Starting Table of Contents file write');
        fs.writeFile('table-of-contents.json', stringified, (err) => err ? console.log('Could not write table of contents') : console.log('Table of Contents written to file.'));
    }
}
updateTableOfContents(1398);


