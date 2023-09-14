import express from "express";


const app = express();
const port = 3000;

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let date = new Date();
let dayName = days[date.getDay()];

app.get("/", (req,res) => {
    
    if (dayName === "Sunday" || dayName === "Saturday"){
        res.render("index.ejs", {
            dayName:"Weekend",
            message: "it's time to relax!",
        });
    }
    else{
        console.log("Root endpoint hit!");
        res.render("index.ejs", {
            dayName : "Weekday",
            message : "it's time to work hard!"
        });
    }
});

app.listen(port, () => {
    console.log(`Website is running on port ${port}`);
});

