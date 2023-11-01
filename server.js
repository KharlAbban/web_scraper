// Import Libraries
const axios = require("axios");
const cheerio = require("cheerio");
const URL = "https://www.imdb.com/title/tt2861424/?ref_=vp_close";
// const URL = "https://www.imdb.com/title/tt4574334/?ref_=tt_sims_tt_t_1";



(async () => {
    const response = await axios.get(URL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
        },
    });
    const $ = cheerio.load(response.data);
    const title = $("h1[data-testid='hero__pageTitle'] > span").text();

    console.log(title);
})()
