var allCats = [
      {name: 'Radar', sprite: 'img/bat-cat.jpg',
      nicknames: [
        'Bat',
        'Earflap',
        'The Great Listener',
        'Skinny Dracula',
        'Herr Wrinkle',
        'Locator'
      ]},
      {name: 'Tigger', sprite: 'img/bengal-cat.jpg',
      nicknames: [
        'Stripy',
        'Wasp',
        'Beasty Boy',
        'Pricy',
        'Spring'
      ]},
      {name: 'Charcoal', sprite: 'img/black-cat.jpg',
      nicknames: [
        'Blacky',
        'Shadow',
        'Sut',
        'Lucky'
      ]},
      {name: 'Ghost', sprite: 'img/blue-cat.jpg',
      nicknames: [
        'Grey',
        'Dusty',
        'Mist',
        'Foggy'
      ]},
      {name: 'Brush', sprite: 'img/forest-cat.jpg',
      nicknames: [
        'Fluffy',
        'Dusty',
        'Cotton Ball'
      ]},
      {name: 'Ginger', sprite: 'img/ginger-cat.jpg'},
      {name: 'Adolf', sprite: 'img/sphynx-cat.jpg'},
      {name: 'Sukkerspinn', sprite: 'img/white-cat.jpg'}
    ];

var Cat = function(cat) {
  this.clicks = ko.observable(0);
  this.clickCount = ko.computed(function() {
    return 'Clicks: ' + this.clicks();
  }, this);
  this.catName = cat.name;
  this.level = ko.computed(function() {
    if (this.clicks() < 10) {
      return 'Newborn';
    } else if (this.clicks() < 20) {
      return 'Infant';
    } else if (this.clicks() < 30) {
      return 'Child';
    } else if (this.clicks() < 40) {
      return 'Teen';
    } else if (this.clicks() < 50) {
      return 'Adult';
    } else return 'Mature cat';
  }, this);
  this.catTitle = ko.computed(function() {
    return (this.catName + ', ' + this.level());
  }, this);
  this.sprite = cat.sprite;
  this.nicknames = {
    title: 'Nicknames:',
    names: cat.nicknames};
};

var ViewModel = function() {
  var self = this;
  this.catList = ko.observableArray([]);
  allCats.forEach(function(cat) {
    self.catList.push(new Cat(cat));
  });
  this.currentCat = ko.observable(self.catList()[0]);
  this.pickName = function(picked) {
    self.currentCat(picked);
  };
  this.incrementClicks = function() {
    this.clicks(this.clicks() + 1); //this represents the binding context (currentCat)
  };
};

ko.applyBindings(new ViewModel());

// (function() {
//   var model = {
//     allCats: [
//       {name: 'Radar', sprite: 'img/bat-cat.jpg'},
//       {name: 'Tigger', sprite: 'img/bengal-cat.jpg'},
//       {name: 'Charcoal', sprite: 'img/black-cat.jpg'},
//       {name: 'Ghost', sprite: 'img/blue-cat.jpg'},
//       {name: 'Brush', sprite: 'img/forest-cat.jpg'},
//       {name: 'Ginger', sprite: 'img/ginger-cat.jpg'},
//       {name: 'Adolf', sprite: 'img/sphynx-cat.jpg'},
//       {name: 'Sukkerspinn', sprite: 'img/white-cat.jpg'}
//     ],
//     init: function(arr) {
//       arr.forEach(function(e) {
//         e.clicks = 0;
//       });
//     }
//   };
//
//
//
//   var viewList = {
//     listBuilder: function(cats) {
//       $('.cat-list').append(document.createElement('ul'));
//       cats.forEach(function(cat) {
//         $('ul').append(document.createElement('li'));
//         $('li:last').text(cat.name);
//         $('li:last').addClass('li-' + cat.name.toLowerCase());
//       });
//     },
//
//     activeItemText: function(txt) {
//       $('.active').text(txt);
//     },
//
//     initializeList: function(cats) {
//       cats.forEach(function(cat) {
//         $('.li-' + cat.name.toLowerCase()).click(function() {
//           $('.main').empty();
//           $('.active').removeClass('active');
//           $('.' + 'li-' + cat.name.toLowerCase()).addClass('active');
//           octopus.activeCat = cat;
//           octopus.showCat(cat);
//         });
//       });
//     },
//
//     init: function(cats) {
//       this.listBuilder(cats);
//       this.initializeList(cats);
//     }
//   };
//
//   var viewCat = {
//     imgBuilder: function(cat) {
//       $('.main').append(document.createElement('div'));
//       $('div:last').addClass('img-container');
//       var image = document.createElement('img');
//       if (cat) image.setAttribute('src', cat.sprite);
//       $('.img-container').append(image);
//       $('img').addClass('cat-image');
//
//       //Adding cat click listener
//       image.addEventListener('click', (function(clicksCopy) {
//         return function() {
//           cat.clicks++;
//           $('.clicks>h3').text('Clicks: ' + cat.clicks);
//         };
//       })(cat.clicks));
//     },
//
//     viewName: function(cat) {
//       //Creating container for name and clicks
//       $('.main').append(document.createElement('div'));
//       $('div:last').addClass('container');
//
//       // Displaying the name
//       var name = document.createElement('div');
//       $('.container').append(name);
//       $('div:last').addClass('name');
//       var nameText = document.createElement('h2');
//       nameText.appendChild(document.createTextNode(cat.name));
//       name.appendChild(nameText);
//     },
//
//     viewClicks: function(cat) {
//       var clicks = document.createElement('div');
//       $('.container').append(clicks);
//       $('div:last').addClass('clicks');
//       var clicksText = document.createElement('h3');
//       clicksText.appendChild(document.createTextNode('Clicks: ' + cat.clicks));
//       clicks.appendChild(clicksText);
//     },
//
//     render: function(cat) {
//       $('.main').empty();
//       this.imgBuilder(cat);
//       this.viewName(cat);
//       this.viewClicks(cat);
//       this.admin(cat);
//     },
//
//     admin: function(cat) {
//       var adminDiv = document.createElement('div');
//       $('.container').append(document.createElement('hr'), adminDiv);
//       $('div:last').addClass('admin');
//       var adminButton = document.createElement('button');
//       adminButton.appendChild(document.createTextNode('Admin'));
//       $('.admin').append(adminButton);
//
//       adminButton.addEventListener('click', function() {
//         adminButton.style.display = 'none';
//         //Append form elements
//         $('.admin').append(document.createElement('input'));
//         $('input:last').addClass('form-name');
//         $('.form-name').attr({
//           type: 'text',
//           placeholder: 'New name'
//         });
//         $('.admin').append(document.createElement('input'));
//         $('input:last').addClass('form-img');
//         $('.form-img').attr({
//           type: 'text',
//           placeholder: 'New image URL'
//         });
//         $('.admin').append(document.createElement('input'));
//         $('input:last').addClass('form-clicks');
//         $('.form-clicks').attr({
//           type: 'number',
//           placeholder: 'Add or detract clicks'
//         });
//         var saveButton = document.createElement('button');
//         $('.admin').append(saveButton);
//         $('button:last').addClass('save-button');
//         saveButton.append(document.createTextNode('Save'));
//         var cancelButton = document.createElement('button');
//         $('.admin').append(cancelButton);
//         $('button:last').addClass('cancel-button');
//         cancelButton.append(document.createTextNode('Cancel'));
//
//         //Saving the form
//         $('.save-button').click(function() {
//           if ($('.form-name').val()) {
//             octopus.activeCat.name = $('.form-name').val();
//             octopus.activeItemText(octopus.activeCat.name);
//           }
//           if ($('.form-clicks').val()) {
//             octopus.activeCat.clicks += parseInt($('.form-clicks').val());
//           }
//           if ($('.form-img').val()) {
//             octopus.activeCat.sprite = $('.form-img').val();
//           }
//           viewCat.render(octopus.activeCat);
//         });
//
//         //Cancel button
//         $('.cancel-button').click(function() {
//           $('.form-name').hide();
//           $('.form-clicks').hide();
//           $('.form-img').hide();
//           $('.save-button').hide();
//           $('.cancel-button').hide();
//           adminButton.style.display = 'inline-block';
//         });
//       });
//     }
//   };
//
//   var octopus = {
//     cats: model.allCats,
//     activeCat: undefined,
//     activeItemText: function(txt) {
//       viewList.activeItemText(txt);
//     },
//     init: function(arr) {
//       model.init(arr);
//       viewList.init(arr);
//     },
//     showCat: function(cat) {
//       viewCat.render(cat);
//     }
//   };
//
//   octopus.init(octopus.cats);
// })();
