const fs = require('fs');
scrapeFunctions = require('./scrape-fiction');
async function run() {
    console.log("Boutta read file!");
    const rawJSON = fs.readFileSync('table-of-contents.json');

    const data = JSON.parse(rawJSON);
    const books = data.books;
    console.log("Data parsed in");
    const last = books.length-1;
    console.log("About to loop");
    for (let index = 0; index < books.length; index++) {
        const fiction = books[index];
        const comma = index == last ? '}' : ',';
        await scrapeFunctions.scrapeFiction(fiction, index, comma);
        console.log(`Parsed index ${index}`);
    }
    // data.books.forEach(async (fiction, index) => {
        //slow it down
    // });
}
run();
