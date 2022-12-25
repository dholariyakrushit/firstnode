const express=require("express");
// const res = require("express/lib/response");
const app=express();
const path=require("path");
const hbs=require("hbs");
const requests=require("requests");



const staticPath=path.join(__dirname,"../public");
const templatesPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")

app.use(express.static(staticPath));

app.set("views",templatesPath);

// set the view engine
app.set("view engine","hbs");
hbs.registerPartials(partialPath);


app.get("",(req,res)=>{
    res.render("index.hbs",{
        name:"krushit"
    }); 
});

app.get("/about",(req,res)=>{
    requests(
        `https://api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=2f833bac4ee36479106711021b79cabf`
      )
        .on("data", (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          console.log(`city name ${arrData[0].name} and the temp is ${arrData[0].main.temp}`);
          res.write(`city name ${arrData[0].name} and the temp is ${arrData[0].main.temp}`);
          // res.write((arrData[0].main.temp).toString()); 
          res.end();
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
        //   else {
        // res.end("File not found");
        // }
});

app.get("/about/*",(req,res)=>{
    res.render("404",{
        errorcomment:"oppppps"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        errorcomment:"404 not found"
    });
});

app.listen(5000); 