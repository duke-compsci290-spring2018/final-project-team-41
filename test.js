
// const alpha = require('alphavantage')({ key: '73STJHH4687S6JU0' });
// alpha.data.intraday(`msft`).then(data => {
//   console.log(data);
// });
//
// alpha.data.batch([`msft`, `aapl`]).then(data => {
//   console.log(data);
// });
//
// alpha.forex.rate('btc', 'usd').then(data => {
//   console.log(data);
// })
//
// alpha.crypto.intraday('btc', 'usd').then(data => {
//   console.log(data);
// })
//
// alpha.technical.sma(`msft`, `daily`, 60, `close`).then(data => {
//   console.log(data);
// })
//
// alpha.performance.sector().then(data => {
//   console.log(data);
// });

var stocks = new Stocks('73STJHH4687S6JU0');

async function request() {
  var options = {
    symbol: 'TSLA',
    interval: '1min',
    amount: 10
  };
  var result = await stocks.timeSeries(options);
  console.log(result)
  document.body.innerHTML = JSON.stringify(result);
}
request();
