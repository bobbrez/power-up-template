/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

var pointScale = {
  'X-Small' : 1,
  'Small'   : 2,
  'Medium'  : 4,
  'Large'   : 8,
  'X-Large' : 16
};

var getBadges = function(t){
  console.log("Getting Badge");
  return {
    dynamic: function(){
      return {
        title: 'Detail Badge', // for detail badges only
        text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
        icon: icon, // for card front badges only
        color: badgeColor,
        refresh: 10
      }
    }
  }
};

var boardButtonCallback = function(t){
  return t.popup({
    title: 'Popup List Example',
    items: [
      {
        text: 'Open Overlay',
        callback: function(t){
          return t.overlay({
            url: './overlay.html',
            args: { rand: (Math.random() * 100).toFixed(0) }
          })
          .then(function(){
            return t.closePopup();
          });
        }
      },
      {
        text: 'Open Board Bar',
        callback: function(t){
          return t.boardBar({
            url: './board-bar.html',
            height: 200
          })
          .then(function(){
            return t.closePopup();
          });
        }
      }
    ]
  });
};

var cardButtonCallback = function(t){
  var items = Object.keys(pointScale).map(function(pointCode){
    return {
      text: pointCode,
      cost: pointScale[pointCode],
      callback: function(t){
        return t.set('card', 'shared', { 'pointScale' : pointCode, 'points' : pointScale[pointCode] })
        .then(function(){
          return t.closePopup();
        })
      }
    };
  });

  return t.popup({
    title: 'Popup Search Example',
    items: items,
    search: {
      count: 5,
      placeholder: 'Search National Parks',
      empty: 'No parks found'
    }
  });
};

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: WHITE_ICON,
      text: 'Points',
      callback: boardButtonCallback
    }];
  },
  'card-badges': function(t, options){
    return getBadges(t);
  },
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Points',
      callback: cardButtonCallback
    }];
  },
  'card-detail-badges': function(t, options) {
    return getBadges(t);
  },
  'show-settings': function(t, options){
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 184
    });
  }
});
