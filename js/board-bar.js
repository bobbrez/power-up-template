/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function() {
  t.lists().then(function(lists) {
    lists[0].get('cards').then(function(cards) {
      console.log("CARDS", cards);
    });
  });
});
