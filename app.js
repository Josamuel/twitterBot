var Twitter = require('twitter');
var config = require('./config.js');
var t = new Twitter(config);

var params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en',
}

t.get('search/tweets', params, function(err, data, response) {
  if(!err) {
    for(let i =0; i < data.statuses.length; i++){
      let id = {id: data.statuses[i].id_str}
      t.post('favorites/create', id, function(err, response) {
        if(!err) {
          let username = response.user.screen_name;
          let tweetId= response.id_str;
          console.log('FAVORITED: ', `https://twitter.com/${username}/status/${tweetId}`)
        }else {
          console.log('post err is ', err);
        }
      })
    }
  } else {
    console.log('Oh no, this error', err);
  }
})