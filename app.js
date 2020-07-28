var http = require("https");

var options = {
	"method": "GET",
	"hostname": "betfair-sportsbook-and-exchange.p.rapidapi.com",
	"port": null,
	"path": "/v1/betfair/ex/event?event_id=29919699",
	"headers": {
		"x-rapidapi-host": "betfair-sportsbook-and-exchange.p.rapidapi.com",
		"x-rapidapi-key": "",
		"useQueryString": true
	}
};

function getData(){
var req = http.request(options, function (res) {
	var chunks = "";

	res.on("data", function (chunk) {
		chunks+=chunk;
	});

	res.on("end", function () {
		let data = JSON.parse(chunks);
    data.results[0].markets.forEach(market => {
      let flag=0;
      market.runners.forEach(runner => {
        if(Object.keys(runner.exchange).length == 2){
          if(flag==0){console.log(market.description.marketName);flag=1}
          console.log(runner.description.runnerName+" Lay : Size = "+runner.exchange.availableToLay[0].size+" , Price = "+runner.exchange.availableToBack[0].price + " , Back : Size = "+runner.exchange.availableToBack[0].size+" , Price = "+runner.exchange.availableToLay[0].price);
        }
      })
      if(flag==1)console.log();

    })
	});
});

req.end();}


setInterval(()=>{
  console.clear();
  getData()
},5000)
