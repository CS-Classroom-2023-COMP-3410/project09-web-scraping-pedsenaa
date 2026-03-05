const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

axios.get("https://www.du.edu/calendar").then(response => {

    const $ = cheerio.load(response.data);
    const events = [];

    $(".events-listing__item").each((i, el) => {

        const date = $(el).find("p").eq(0).text().trim();
        const time = $(el).find("p").eq(1).text().trim();
        const title = $(el).find("h3").text().trim();

        const event = {
            title: title,
            date: date
        };

        if (time) {
            event.time = time;
        }

        events.push(event);

    });

    fs.writeFileSync(
        "results/calendar_events.json",
        JSON.stringify({ events }, null, 4)
    );

});