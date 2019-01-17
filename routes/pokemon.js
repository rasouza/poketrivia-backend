const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = "https://pokeapi.co/api/v2/pokemon/";

var answers = {};

function getPokemon(id) {
  return axios.get(url + id).then(({data:{name, id, sprites:{front_default:image}}}) => {
      return (
        {
          id: id,
          name: name,
          image: image
        }
      );
    })
    .catch(function (error) {
      console.log(error);
    })
}

function getRandomNumber(limit) {
  return Math.floor(1 + Math.random() * (limit - 1))
}

function getRandomNumbers(quantity = 3, limit = 151) {
  const map = {}
  while (Object.keys(map).length < quantity) {
    map[getRandomNumber(limit)] = null
  }
  return Object.keys(map)
}

router.get('/question', async function(req, res) {
    const randomIds = getRandomNumbers()
    const promises = randomIds.map(id => {
      return getPokemon(id)
    })
    await Promise.resolve()
    Promise.all(promises).then((values) => {
      const question = {
        id: getRandomNumber(9999),
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
      }
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
