// adapted from: https://medium.com/@ssaurel/create-a-bitcoin-price-index-watcher-in-html5-f441b1e05cd1

const getPrice = (url) => {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4  &&  this.status == 200) {
      var json = JSON.parse(this.responseText);
      parse(json);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

const parse = (json) => {
  if (json["bpi"]["USD"] != undefined) {
    var usdValue = json["bpi"]["USD"]["rate"].split('.')[0];
    //var gbpValue = "&pound;" + json["bpi"]["GBP"]["rate"];
    //var euroValue = "&euro;" + json["bpi"]["EUR"]["rate"];

    price = parseInt(usdValue.replace(',',''));
    priceText.innerHTML = '$' + usdValue;
  } else {
    var obj = json["bpi"];

    for (var key in obj) {
      closePrice = (parseInt(obj[key]));
    }
  }
};

const calcPercent = () => {
  percent = (((price / closePrice) - 1) * 100).toFixed(2);
  percentText.innerHTML = `${percent}%`
  if (percent >= 0) {
    percentText.style.color = 'rgb(0, 148, 0)';
  } else {
    percentText.style.color = 'rgb(148, 0, 0)';
  }
};

let priceText = document.getElementById('priceText');
let percentText = document.getElementById('percentText');
let closePrice = 0;
let price = 0;
let percent = '--%'

getPrice("https://api.coindesk.com/v1/bpi/currentprice.json");
getPrice("https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday");

setTimeout(function() { calcPercent(); }, 1000);
