var initialPrice = document.querySelector(".initial-price");
var currentPrice = document.querySelector(".current-price");
var quantity = document.querySelector(".quantity");
var stockName = document.querySelector(".stock-name");
var optionList = document.querySelector("datalist");
var btnCheck = document.querySelector(".btn-check");
var output = document.querySelector(".output");
var currencyDisplay  = document.querySelectorAll(".currency") //span element, indicating the currency

var str = "";              //to store the string of dropdown options list 
var bestMatches = {};      //to store the company details whose name actually matches with the input typed
var globalQuoteJson = {}; //this json contains price detail of the company fetched by its symbol
var companyFullName = ""; 
var currency = "";
var companySymbol = ""
var price = "";



function calculateProfitOrLoss(initial) {
    
}

function getOptionList(name) {
    var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + name + "&apikey=LTLP02A360UTW9WY"
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            bestMatches = json["bestMatches"];
            getDropDownList(bestMatches);
        })
        .catch(errorhandler)
}

function getDropDownList(json) {


    Object.keys(json).map((x) => {
        str += '<option value="' + json[x]["2. name"] + '"/>';
    })
    console.log(str)
    optionList.innerHTML = str;
}

function getCurrentPrice(companyName) {

    if (companyName !== "") {
        console.log(bestMatches);

        Object.keys(bestMatches).map((x) => {
            if (companyName === bestMatches[x]["2. name"]) {
                currency = bestMatches[x]["8. currency"];
                companySymbol = bestMatches[x]["1. symbol"];
            }
        })
        console.log("company ", companyName, "currency ", currency, "symbol ", companySymbol);

        var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + companySymbol + "&apikey=LTLP02A360UTW9WY"
        fetch(url)
            .then(response => response.json())
            .then(json => {
                globalQuoteJson = json;
                console.log("this is globaljson", globalQuoteJson)
                
                price = globalQuoteJson["Global Quote"]["05. price"];
                console.log("this is the price within the then block ",price);
                printCurrentPrice(price);
            })
    }

}

function printCurrentPrice(price)
{
    console.log("print the price here ",price);
    currencyDisplay[0].innerText = " in "+ currency;
    currencyDisplay[1].innerText = " in "+ currency;
    currentPrice.innerText = price;
}

function errorhandler() {
    console.log("Enter a valid Stock Name.");
}

stockName.addEventListener("input", function clickHandler() {

    str = "";
    getOptionList(stockName.value);
    companyFullName = stockName.value;
    getCurrentPrice(companyFullName);
})
