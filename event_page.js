var serverData = {};

chrome.extension.onMessage.addListener(function(banner, sender) {
  serverData[sender.tab.id] = banner;

  var alt = "Unrecognized server";
  var ico = "unrecognized_server.png";

  for (var i = 0; i < web_servers.length; i++) {
    if (banner.match(web_servers[i].regex)) {
      alt = web_servers[i].title;
      ico = web_servers[i].icon;
    }
  }

  chrome.pageAction.setIcon({tabId: sender.tab.id, path: "icons/" + ico});
  chrome.pageAction.setTitle({tabId: sender.tab.id, title: alt});
  chrome.pageAction.show(sender.tab.id);
});

chrome.tabs.onRemoved.addListener(function(tabId) {
  delete serverData[tabId];
});
