var express = require('express');
var router = express.Router();
var Jimp = require('jimp');

router.get('/', function(req, res) {
  axios
    .get('https://pokeapi.co/api/v2/pokemon/125')
    .then(({ sprites: { front_default: image } }) => {
      Jimp.read(image)
        .then(pokemon => {
          return pokemon.write('125.jpg');
        })
        .catch(error => console.log(error));
    });
});

module.exports = router;
