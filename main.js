// adapted from: https://medium.com/@ssaurel/create-a-bitcoin-price-index-watcher-in-html5-f441b1e05cd1

const parseJson = (json) => {
  var usdValue = '$ ' + json["bpi"]["USD"]["rate"].split('.')[0];
  //var gbpValue = "&pound;" + json["bpi"]["GBP"]["rate"];
  //var euroValue = "&euro;" + json["bpi"]["EUR"]["rate"];

  price.innerHTML = usdValue;
}

const getPrice = () => {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4  &&  this.status == 200) {
      var json = JSON.parse(this.responseText);
      parseJson(json);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};


const parsePrice = (json) => {
  var obj = json["bpi"];
  var usdValue = '$ ' + json["bpi"];
  //var gbpValue = "&pound;" + json["bpi"]["GBP"]["rate"];
  //var euroValue = "&euro;" + json["bpi"]["EUR"]["rate"];

  console.log(usdValue);
  console.log(json)

  for (var key in obj) {
    console.log(obj[key]);
  }
}

const getYesterday = () => {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4  &&  this.status == 200) {
      var json = JSON.parse(this.responseText);
      parsePrice(json);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


let price = document.getElementById('price');

getPrice();
getYesterday();
