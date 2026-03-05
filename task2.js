const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

axios.get("https://denverpioneers.com/coverage").then(response => {

    const $ = cheerio.load(response.data);

    const events = [];

    $("tr").each((i, row) => {

        const cols = $(row).find("td");

        if (cols.length >= 3) {

            const date = $(cols[0]).text().trim();
            const duTeam = $(cols[1]).text().trim();
            const opponent = $(cols[2]).text().trim();

            if (duTeam && opponent && date) {
                events.push({
                    duTeam: duTeam,
                    opponent: opponent,
                    date: date
                });
            }
        }
    });

    fs.writeFileSync(
        "results/athletic_events.json",
        JSON.stringify({ events }, null, 4)
    );

});