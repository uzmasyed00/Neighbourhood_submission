var settings;
var parameters;


function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
}


function getYelpReviewsFromYelp(place, city) {
    console.log("place received in this function is" + place.name);
    console.log("city received in this function is" + city);
    var yelp_url = 'https://api.yelp.com/v2/search?'
    var YELP_KEY_SECRET = 'rML1MhFwm6phKTKPrwpSbnZ8fss';
    var YELP_TOKEN_SECRET = 'ej_V-eaYPaAfXblnM9OshO8erRE';

    parameters = {
        oauth_consumer_key: 'LyqBJtKrt97LVQH8YOXmXA',
        oauth_token: 'h6sr0yfugN7NAU7X8fE-PMfAi5bOyYut',
        oauth_nonce: nonce_generate(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        callback: 'cb',
        term: place.name,
        location: city
    };

    var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
    parameters.oauth_signature = encodedSignature;


    settings = {
        url: yelp_url,
        data: parameters,
        cache: true,
        dataType: 'jsonp',
        success: function(results) {

            console.log(results)

        },
        fail: function() {
            alert("There was a problem obtaining Yelp review for the location specified");
        }
    };
    var resultFromAjaxRequest = $.ajax(settings);
    return resultFromAjaxRequest;
}