const axios = require('axios').default;
const cheerio = require('cheerio');
const tagToInt = {
    Action: 0,
    Adventure: 0,
    Comedy: 0,
    Contemporary: 0,
    Drama: 0,
    Fantasy: 0,
    
}
function readHTML(html) {
    
    const $ = cheerio.load(html.data);
    let labels = [];
    $('.tag-label').each((i, label) => {
        labels.push($(label).text());
    });
    $('[name=tagsAdd]').children().each((i, optionTag) => {
        let single = [];
        single.push($(optionTag).val());
        console.log(single);
        labels.push($(optionTag).val().trim());
    });
    
    console.log(labels);
}

async function scrapeTag(path) {
    // const url = `www.royalroad.com${path}`;
    url = 'https://www.royalroad.com/fictions/search?advanced=True';
    await axios.get(url)
        .then(readHTML)
        .catch(err => console.log(`Error: ${err}`));
}
scrapeTag();