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


let price = document.getElementById('price');

getPrice();
