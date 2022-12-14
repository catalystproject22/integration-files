const BASE_URL = 'https://dev-api-somosxpanda.herokuapp.com/api/v1/order';
const AF_SCRIPT = "shopify"

function setCookie(cookie_key, cookie_value, days_of_expiration) {
  var date = new Date();
  date.setTime(date.getTime() + (days_of_expiration*24*60*60*1000));
  var expires = "expires="+ date.toUTCString();
  document.cookie = cookie_key + "=" + cookie_value + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var API = {
  post: function(data){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {};
    xhttp.open("POST", BASE_URL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    data['influencerUsername'] = getCookie("xpndr");
    data['scriptName'] = AF_SCRIPT;
    xhttp.send(JSON.stringify(data));
  }
}

var AffTracker = {
  readInfluencerId: function(){
    var url = new URL(document.location.href);
    return url.searchParams.get("xpndr");
  },
  addOrder: function(data){
    var xpndrCookie = getCookie("xpndr");
    if(xpndrCookie) API.post(data);
  },
  execute: function(){
    var xpndr = this.readInfluencerId();
    if (xpndr) setCookie("xpndr", xpndr, 365);
  }
}

AffTracker.execute();

var products_test = [];

function test(variable_test){
  var product_test = {};
  product_test['variable_test'] = variable_test;
  products_test.push(product_test);
  console.log("TEST");
}

console.log(products_test);


