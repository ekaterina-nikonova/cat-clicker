var allCats = [
  {name: 'Radar', sprite: 'bat-cat.jpg'},
  {name: 'Tigger', sprite: 'bengal-cat.jpg'},
  {name: 'Charcoal', sprite: 'black-cat.jpg'},
  {name: 'Ghost', sprite: 'blue-cat.jpg'},
  {name: 'Brush', sprite: 'forest-cat.jpg'},
  {name: 'Ginger', sprite: 'ginger-cat.jpg'},
  {name: 'Adolf', sprite: 'sphynx-cat.jpg'},
  {name: 'Sukkerspinn', sprite: 'white-cat.jpg'}
];

function listBuilder() {
  $('.cat-list').append(document.createElement('ul'));
  allCats.forEach(function(cat) {
    cat.clicks = 0;
    $('ul').append(document.createElement('li'));
    $('li:last').text(cat.name);
    $('li:last').addClass('li-' + cat.name.toLowerCase());
  });
}

listBuilder();

allCats.forEach(function(cat) {
  $('.li-' + cat.name.toLowerCase()).click(function() {
    $('.main').empty();
    $('.active').removeClass('active');
    $('.' + 'li-' + cat.name.toLowerCase()).addClass('active');
    //Displaying the image
    $('.main').append(document.createElement('div'));
    $('div:last').addClass('img-container');
    var image = document.createElement('img');
    image.setAttribute('src', 'img/' + cat.sprite);
    $('.img-container').append(image);
    $('img').addClass('cat-image');

    //Creating container for name and clicks
    $('.main').append(document.createElement('div'));
    $('div:last').addClass('container');

    // Displaying the name
    var name = document.createElement('div');
    $('.container').append(name);
    $('div:last').addClass('name');
    var nameText = document.createElement('h2');
    nameText.appendChild(document.createTextNode(cat.name));
    name.appendChild(nameText);

    //Displaying the number of clicks
    var clicks = document.createElement('div');
    $('.container').append(clicks);
    $('div:last').addClass('clicks');
    var clicksText = document.createElement('h3');
    clicksText.appendChild(document.createTextNode('Clicks: ' + cat.clicks));
    clicks.appendChild(clicksText);

    //Adding event listener
    image.addEventListener('click', (function(clicksCopy) {
      return function() {
        cat.clicks++;
        $('.clicks>h3').text('Clicks: ' + cat.clicks);
      };
    })(cat.clicks));
  });
});
