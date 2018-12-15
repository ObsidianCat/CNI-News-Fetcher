const { Router } = require('express');
const axios = require('axios');
const NEWS_URL_BASE = require('./constants').NEWS_URL_BASE;
const NEWS_API_KEY =require('./constants').NEWS_API_KEY;

module.exports = (router = new Router()) => {
  router.get('/:type', async function(req, res, next) {
    try {
      const url = req.params.type === 'filtered'?
        `${NEWS_URL_BASE}everything?q=${req.query.query}&apiKey=${NEWS_API_KEY}`
        :`${NEWS_URL_BASE}top-headlines?country=gb&apiKey=${NEWS_API_KEY}`
      const response = await axios.get(url)
      res.send({...response.data});
    }
    catch (error){
      res.status(500).send({ error: error.toString() });
    }
  });

  return router;
};