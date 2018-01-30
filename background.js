// Keep the extension icon updated
function updateicon() {
  var icon = "N/A";
  var tooltip = "N/A";
  var currency = localStorage['currency'];
  var query = "https://api.coinmarketcap.com/v1/ticker/stellar/?convert=".concat(localStorage['currency']);
  var price = "price_".concat(localStorage['currency']);

// Default to currency to usd if localStorage hasn't been set
  if (!currency) {
    localStorage['currency'] = 'usd';
  }

// Get JSON response from api.coinmarketcap.com
  $.getJSON(query, function (data) {
    data = data[0];
// Round the number displayed on the badge down to 2 decimal places
    icon = Math.round(data[price] * 100) / 100;
// Round the tooltip down to 5 decimal places
    tooltip = Number(data[price]);
    tooltip = tooltip.toFixed(5);
    chrome.browserAction.setTitle({'title': '1 XLM = ' + tooltip + " " + currency.toUpperCase()});
    chrome.browserAction.setBadgeText({'text':"" + icon});
    }
  )
}

// Update the icon every minutes (public API rules)
setInterval(updateicon,60000);
updateicon();

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setBadgeText({'text':"..."});
  updateicon();
});
