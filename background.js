// Keep the extension icon update

function updateicon() {
  var icon = "N/A";
  var currency = localStorage['currency'];
  var query = "https://api.coinmarketcap.com/v1/ticker/stellar/?convert=".concat(localStorage['currency']);
  var price = "price_".concat(localStorage['currency']);

  // Default to currency to usd if localStorage hasn't been set
  if (!currency) {
    localStorage['currency'] = 'usd';
  }

// Get JSON response from coinmarketcap.com
  $.getJSON(query, function (data) {
    data = data[0];

// Get rid of these once this shit is finished
    console.log(query);
    console.log(data[price]);

    icon = data[price];
    icon = Math.round(icon * 100) / 100;
    chrome.browserAction.setBadgeText({'text':"" + icon});
    }
    )
}

// Update the icon every 10 minutes (public API rules)
setInterval(updateicon,600000);
updateicon();

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setBadgeText({'text':"..."});
  updateicon();
});
