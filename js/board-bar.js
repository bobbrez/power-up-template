/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function() {
  t.lists().then(function(lists) {
    console.log("LISTS", lists);
  });
  
  t.cards().then(function(cards) {
    console.log("CARDS", cards);
  });
});
