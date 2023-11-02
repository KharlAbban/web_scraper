// Import Libraries
let converter = require('json-2-csv');
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const URLS = ["https://www.imdb.com/title/tt2861424/?ref_=vp_close","https://www.imdb.com/title/tt4574334/?ref_=tt_sims_tt_t_1"];

const moviesData = [];

(async () => {
    for (movie of URLS) {
        const response = await axios.get(movie, {
            headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
            },
        });

        const movieDetails = {}
        const movieSpread = [];

        const $ = cheerio.load(response.data);
        const title = $("h1[data-testid='hero__pageTitle'] > span").text().trim();
        const image = $(".ipc-poster__poster-image > img").attr("src");
        const rating = $("div[class='sc-bde20123-2 gYgHoj'] > span");
        
        const topList = $(".jJsEuz .ipc-inline-list li").each((index, element) => {
            let name = $(element).text();
            movieSpread.push(name);
        });
        
        movieDetails.title = title;
        movieDetails.imageSrc = image;
        movieDetails.type = movieSpread[0];
        movieDetails.releaseDate = movieSpread[1];
        movieDetails.duration = movieSpread[movieSpread.length - 1];
        movieDetails.rating = $(rating[0]).text();

        moviesData.push(movieDetails);

        console.log(movieDetails, "\n");
    }

    fs.writeFileSync("./moviesData.json", JSON.stringify(moviesData), "utf-8");
    const csv = await converter.json2csv(moviesData);
    fs.writeFileSync("./moviesDataCSV.csv", csv, "utf-8");
    console.log(csv)
})()
