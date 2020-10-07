const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs');
const tagToInt = {
    'anti-hero lead': 0,
    'cyberpunk': 1,
    'dungeon': 2,
    'female lead': 3,
    'gamelit': 4,
    'gender bender': 5,
    'grimdark': 6,
    'harem': 7,
    'high fantasy': 8,
    'litrpg': 9,
    'low fantasy': 10,
    'magic': 11,
    'male lead': 12,
    'martial arts': 13,
    'multiple lead characters': 14,
    'mythos': 15,
    'non-human lead': 16,
    'summoned hero': 17,
    'post apocalyptic': 18,
    'reader interactive': 19,
    'reincarnation': 20,
    'ruling class': 21,
    'school life': 22,
    'secret identity': 23,
    'slice of life': 24,
    'space opera': 25,
    'sports': 26,
    'steampunk': 27,
    'strategy': 28,
    'strong lead': 29,
    'super heroes': 30,
    'supernatural': 31,
    'urban fantasy': 32,
    'villainous lead': 33,
    'virtual reality': 34,
    'war and military': 35,
    'wuxia': 36,
    'xianxia': 37,
    'action': 38,
    'adventure': 39,
    'comedy': 40,
    'contemporary': 41,
    'drama': 42,
    'fantasy': 43,
    'historical': 44,
    'horror': 45,
    'mystery': 46,
    'psychological': 47,
    'romance': 48,
    'satire': 49,
    'sci-fi': 50,
    'shortstory': 51,
    'tragedy': 52,
    'profanity': 53,
    'sexual content': 54,
    'gore': 55,
    'traumatising content': 56,
    'ongoing': 57,
    'portal fantasy / isekai': 58,
    'original': 59,
    'hiatus': 60
}

function readHTML(html) {
    const tagCount = Object.keys(tagToInt).length;
    let tagData = (new Array(tagCount+6)).fill(0);
    let errors;
    const $ = cheerio.load(html.data);
    $('.label, .list-inline li').each((i, label) => {
        const text = $(label).text().toLowerCase();
        const correspondingInt = tagToInt[text];
        if (correspondingInt == undefined) {
            fs.appendFile('error.txt', `tagToInt could not read |${text}|\n`, (err) => err ? console.log('Could not write err to file') : console.log('Error written to file.'));
            errors = `tagToInt could not read |${text}|`;
        } else {
            tagData[correspondingInt] = 1;
        }
    });
    $('li.bold.uppercase.font-red-sunglo').each((i, statistic) => {
        const text = $(statistic).text().replace(/,/g,'');
        const val = parseInt(text);
        tagData[tagCount+i] = val;

        console.log(text);
    });
    // console.log("Ret val: ", {tagData, errors})
    return {tagData, errors};
}

async function scrapeFiction(path, destination) {
    const url = `https://www.royalroad.com${path}`;
    await axios.get(url)
        .then(readHTML)
        .then(parsed => {
            destination.chapData = parsed.tagData;
            destination.errors = parsed.errors;
            console.log('Destination: ', destination)
        })
        .catch(err => console.log(`Error: ${err}`));
}
scrapeFiction('/fiction/10073/the-wandering-inn', {});
module.exports = {
    scrapeFiction
};