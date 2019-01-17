var express = require('express');
var router = express.Router();
var axios = require('axios');
const url = "https://pokeapi.co/api/v2/pokemon/";
const util = require('util')

var answers = {};

const fs = require('fs');
const pokejson = require('./pokemons.json');

function getPokemon(id) {

    return ({
            id: id,
            name: pokejson[id].name,
            image: pokejson[id].image
        }
    )
}

router.get('/question', async function(req, res) {
    const promises = []
    for(i = 0;i < 3;i++) {
      promises.push(getPokemon(Math.floor(1 + Math.random() * (151 - 1))))
    }
    await Promise.resolve()
    Promise.all(promises).then((values) => {
      const question = {
        id: Math.floor(1 + Math.random() * (9999 - 1)),
        image: values[0].image,
        options: [
          {
            id: values[0].id,
            name: values[0].name
          },
          {
            id: values[1].id,
            name: values[1].name
          },
          {
            id: values[2].id,
            name: values[2].name
          }
        ]
      };
      answers[question.id] = question.options[0].id
      question.options.sort((a,b) => 0.5 - Math.random());
      res.json(question)
    })
});

router.post('/question/:id', function(req, res) {
  result = answers[req.params.id] === req.body.answer;
  res.json({ answer: result });
});

module.exports = router;
