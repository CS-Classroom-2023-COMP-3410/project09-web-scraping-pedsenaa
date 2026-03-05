const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

axios.get("https://bulletin.du.edu/undergraduate/coursedescriptions/comp/").then(response => {
    const $ = cheerio.load(response.data);

    const courses = [];

    $(".courseblock").each((i, el) => {
        const title = $(el).find(".courseblocktitle").text();
        const description = $(el).text();

        const match = title.match(/COMP\s(\d{4})\s(.+?)\(/);

        if (match) {
            const number = parseInt(match[1]);

            if (number >= 3000 && !description.includes("Prerequisite")) {
                courses.push({
                    course: `COMP-${match[1]}`,
                    title: match[2].trim()
                });
            }
        }
    });

    fs.writeFileSync("results/bulletin.json",
        JSON.stringify({ courses }, null, 4)
    );
});