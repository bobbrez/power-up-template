/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function() {
  t.lists().then(function(lists) {
    console.log("LISTS", lists);
    console.log("LIST", lists[0]);
    lists[0].get('cards').then(function(cards) {
      console.log("CARDS", cards);
    });
  });
});
