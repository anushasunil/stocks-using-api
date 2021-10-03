var initialPrice = document.querySelector(".initial-price");
var currentPrice = document.querySelector(".current-price");
var quantity = document.querySelector(".quantity");
var stockName = document.querySelector(".stock-name");
var optionList = document.querySelector("datalist");
var btnCheck = document.querySelector(".btn-check");
var output = document.querySelector(".output");

var str = "";
var globalQuoteJson = {};
var companyIndexInJson = 0;
var currency = "";


function getDataFromAPI(stockName) {
    // var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stockName+"&apikey=LTLP02A360UTW9WY"
    // fetch(url)
    // .then(response => response.json())
    // .then(json => console.log(json["Global Quote"]["05. price"]))
}

function getOptionList(name) {
    var url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + name + "&apikey=LTLP02A360UTW9WY"
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            globalQuoteJson = json["bestMatches"];
            getDropDownList(globalQuoteJson);
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

// function convertSymbolToCompanyName(symbol) {

//     var nameOfCompany = ""
//     fetch(symbolUrl)
//         .then(response => response.json())
//         .then(json => {
//             console.log(json);
//             for (var i = 0; i < json.length; i++) {
//                 if (symbol === json[i]["symbol"]) {
//                    console.log("this the symbol= ", symbol);
//                    console.log("this the api symbol= ", json[i]["symbol"]);
//                     nameOfCompany = json[i]["name"];
//                     break;
//                 }
//                 else{
//                     nameOfCompany = symbol;
//                 }
//             }
//             console.log("this is the company name ", nameOfCompany)
//             return nameOfCompany;
//         })
// }

function displayCurrentPrice(companyName){
    console.log(globalQuoteJson);
    console.log(companyName);

}

function errorhandler() {
    console.log("Enter a valid Stock Name.");
}

stockName.addEventListener("input", function clickHandler() {

    str="";
    getOptionList(stockName.value);
    displayCurrentPrice(stockName.value);
})
