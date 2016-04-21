/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

var pointScale = {
  xs: { cost: 1,  title: 'X-Small', color: 'green' },
  sm: { cost: 2,  title: 'Small',   color: 'green' },
  md: { cost: 4,  title: 'Medium',  color: 'yellow' },
  lg: { cost: 8,  title: 'Large',   color: 'red' },
  xl: { cost: 16, title: 'X-Large', color: 'red' }
};

var getBadges = function(t){
  return {
    dynamic: function(t, context){
      console.log("NAME", t.card('name').get('name'));
      console.log("Getting Badge", t.get('shared', 'card', 'points', 'DEFAULT'));
      return {
        title: 'Points', // for detail badges only
        icon: './images/icon-white.svg', // for card front badges only
        text: (Math.random() * 100).toFixed(0).toString(),
        color: 'red',
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
      text: pointScale[pointCode].title,
      cost: pointScale[pointCode].cost,
      callback: function(t){
        t.set('card', 'shared', 'points', pointCode ).then(function() {
          console.log("ATTEMPTING", pointCode);
          console.log("SET POINTS", t.get('shared', 'card', 'points', 'DEFAULT'));  
        });

        return t.set('card', 'shared', 'points', pointScale[pointCode] )
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
    console.log("OPTIONS", options);
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
