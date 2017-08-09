let $ = require('jquery');
let handlebars = require('handlebars');

let charactersUrl = 'https://gateway.marvel.com/v1/public/characters';
let apiKey = 'ts=1&hash=21bd2e1b96821f4b508e0dd04ba254bd&apikey=809f574f31a7e23a17adc1f6a3631a58';

// $.ajax(charactersUrl + '?' + apiKey).then(start);
$.ajax('https://swapi.co/api/planets/1/').then(function(data){console.log(data);});
// Kick off the application by getting marvel data
fetch(charactersUrl + '?' + apiKey).then(function(res){
  return res.json();
}).then(start);

function start(ajaxResults){
  let characters = ajaxResults.data.results;
  displayCharacters(characters);
}

function displayCharacters(characters){
  let source = $('#character-template').html();
  let template = handlebars.compile(source);

  characters.forEach(function(character){
    let $characterHtml = $(template(character));

    $characterHtml.find('.js-character-button').on('click', function(e){
      e.preventDefault();
      fetchComics(character);
    });

    $('.characters').append($characterHtml);
  });
}

function fetchComics(character){
  let url = character.comics.collectionURI + '?' + apiKey;
  fetch(url).then(function(res){ return res.json(); }).then(displayComics);
}

function displayComics(ajaxResults){
  let comics = ajaxResults.data.results;
  let $modal = $('.js-modal');
  let source = $('#comic-template').html();
  let template = handlebars.compile(source);

  let context = {
    count: comics.length,
    comics: comics
  };

  $modal.find('.js-modal-content').html(template(context));
  $modal.addClass('is-active');
}
