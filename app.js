const { response } = require('express');
const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const { render } = require('ejs');




const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req, res)=>{
    res.render("homepage.ejs");
});

// app.get("/pics", function (req, res) {
//     request("https://api.unsplash.com/photos/?client_id=SnkUZ5DcOg-iugmEWr0_E0Nkbpfr6-2OEn4zMaICVc8", function (error, response, body) {
//         if (error) {
//             console.log(error);
//         } else {
//             var data = JSON.parse(body);
//             res.render("pictures",{
//                 picData : data,
//                 page : 1
//             }); //Raw Image
//         }
//     });
// })

app.get("/pics", function (req, res) {
    var searchTerm = req.query.searchterm;
    var page = 1;
    request("https://api.unsplash.com/search/photos?client_id=SnkUZ5DcOg-iugmEWr0_E0Nkbpfr6-2OEn4zMaICVc8&page=" + page + "&query=" + searchTerm, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var data = JSON.parse(body);
            //console.log(page);
            res.render("pictures", {
                picData: data,
                page: page,
                searchterm: searchTerm
            });
        }
    });
});

app.get("/pics/:pageno/:searchterm", function (req, res) {
    var searchTerm = req.params.searchterm;
    var page = req.params.pageno;
    request("https://api.unsplash.com/search/photos?client_id=SnkUZ5DcOg-iugmEWr0_E0Nkbpfr6-2OEn4zMaICVc8&page=" + page + "&query=" + searchTerm, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var data = JSON.parse(body);
            res.render("pictures", {
                picData: data,
                page: page,
                searchterm: searchTerm
            });
        }
    });
});
 
//Route to page so user can search for a picture
app.get("/search", function(req, res){
    res.render("search");
});
 



app.listen(8000, ()=>{
     console.log("production website is now online.");
});