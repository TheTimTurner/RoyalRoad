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
        await scrapeFunctions.scrapeFiction(fiction.homepage, fiction);
        console.log(`Parsing index ${index}`);
        const comma = index == last ? '}' : ',';
        const stringified = JSON.stringify(fiction, null, 4);
        fs.appendFile('dataOutput.json', `"${index}" : ${stringified}${comma}`, (err) => err ? console.log(`Could not write ${index} output to file`) : console.log(`Output ${index} written to file.`));
    }
    // data.books.forEach(async (fiction, index) => {
        //slow it down
    // });
}
run();
