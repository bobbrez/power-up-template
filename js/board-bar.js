/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function() {
  t.cards().then(function(cards) {
    console.log("CARDS", cards);
  });
});
