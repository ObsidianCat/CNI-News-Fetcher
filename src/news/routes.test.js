const request = require('supertest')
const app = require('../app')
const NEWS_URL = require('./constants').NEWS_URL;
const NEWS_API_KEY =require('./constants').NEWS_API_KEY;
const newsRoutes = require('./routes')
const moxios = require('moxios');
const express = require('express');

const initNewsApp = () => {
  const app = express();
  app.use(newsRoutes());
  return app;
}


describe('News get route', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should return set of articles filtered by search word', async ()=>{
    moxios.stubRequest(`${NEWS_URL}?q=Sunday&apiKey=${NEWS_API_KEY}`, {
      status: 200,
      response: {
          "status": "ok",
          "totalResults": 2,
          "articles": [
            {
              "source": {
                "id": "the-new-york-times",
                "name": "The New York Times"
              },
              "author": "SHIVANI VORA",
              "title": "Sunday Routine: How Alyson Cambridge, Operatic Soprano, Spends Her Sundays",
              "description": "She runs up to 15 miles in Riverside Park, often goes for costume fittings, enjoys guacamole and margaritas with friends, and calls her parents.",
              "url": "https://www.nytimes.com/2018/12/07/nyregion/how-alyson-cambridge-operatic-soprano-spends-her-sundays.html",
              "urlToImage": "https://static01.nyt.com/images/2018/12/09/nyregion/09ROUTINE1/09ROUTINE1-facebookJumbo.jpg",
              "publishedAt": "2018-12-07T10:00:14Z",
              "content": "Alyson Cambridge made her debut at the Metropolitan Opera in 2004 when she was 24. She has performed there regularly ever since while also appearing on European stages with the Polish National Opera and the Munich Philharmonic. This year, Ms. Cambridge, 39, m… [+714 chars]"
            },
            {
              "source": {
                "id": "the-verge",
                "name": "The Verge"
              },
              "author": "Chaim Gartenberg",
              "title": "T-Mobile is releasing a Slow Cooker Sunday cookbook by CEO John Legere",
              "description": "T-Mobile CEO John Legere is essentially a character all his own, representing the carrier’s brand in an almost cartoonish manner, much in the same way that Mickey Mouse is a visual shorthand for Disney. Now, he’s releasing an actual cookbook called #SlowCooke…",
              "url": "https://www.theverge.com/2018/12/6/18128990/tmobile-slow-cooker-sunday-cookbook-ceo-john-legere",
              "urlToImage": "https://cdn.vox-cdn.com/thumbor/unhVseQHVRiUo2uf0z5Aq0ZodOA=/0x99:770x502/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/13606574/John_Legere_Slow_Cooker_Sunday_Cookbook___Original_File.jpeg",
              "publishedAt": "2018-12-06T16:43:42Z",
              "content": "T-Mobile CEO John Legere is essentially a character all his own, representing the carrier’s brand in an almost cartoonish manner, much in the same way that Mickey Mouse is a visual shorthand for Disney. Now, he’s releasing an actual cookbook called #SlowCooke… [+2970 chars]"
            }],
        }
    });

    const app = initNewsApp();
    const res = await request(app).get('/filtered?query=Sunday');
    console.log(res)
    expect(res.status).toEqual(200)
    expect(res.body).toMatchSnapshot()

  })

  it('should return set of latest headlines', async ()=>{
    moxios.stubRequest(`${NEWS_URL}?q=Sunday&apiKey=${NEWS_API_KEY}`, {
      status: 200,
      response: {
        "status": "ok",
        "totalResults": 2,
        "articles": [
          {
            "source": {
              "id": "the-new-york-times",
              "name": "The New York Times"
            },
            "author": "SHIVANI VORA",
            "title": "Sunday Routine: How Alyson Cambridge, Operatic Soprano, Spends Her Sundays",
            "description": "She runs up to 15 miles in Riverside Park, often goes for costume fittings, enjoys guacamole and margaritas with friends, and calls her parents.",
            "url": "https://www.nytimes.com/2018/12/07/nyregion/how-alyson-cambridge-operatic-soprano-spends-her-sundays.html",
            "urlToImage": "https://static01.nyt.com/images/2018/12/09/nyregion/09ROUTINE1/09ROUTINE1-facebookJumbo.jpg",
            "publishedAt": "2018-12-07T10:00:14Z",
            "content": "Alyson Cambridge made her debut at the Metropolitan Opera in 2004 when she was 24. She has performed there regularly ever since while also appearing on European stages with the Polish National Opera and the Munich Philharmonic. This year, Ms. Cambridge, 39, m… [+714 chars]"
          },
          {
            "source": {
              "id": "the-verge",
              "name": "The Verge"
            },
            "author": "Chaim Gartenberg",
            "title": "T-Mobile is releasing a Slow Cooker Sunday cookbook by CEO John Legere",
            "description": "T-Mobile CEO John Legere is essentially a character all his own, representing the carrier’s brand in an almost cartoonish manner, much in the same way that Mickey Mouse is a visual shorthand for Disney. Now, he’s releasing an actual cookbook called #SlowCooke…",
            "url": "https://www.theverge.com/2018/12/6/18128990/tmobile-slow-cooker-sunday-cookbook-ceo-john-legere",
            "urlToImage": "https://cdn.vox-cdn.com/thumbor/unhVseQHVRiUo2uf0z5Aq0ZodOA=/0x99:770x502/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/13606574/John_Legere_Slow_Cooker_Sunday_Cookbook___Original_File.jpeg",
            "publishedAt": "2018-12-06T16:43:42Z",
            "content": "T-Mobile CEO John Legere is essentially a character all his own, representing the carrier’s brand in an almost cartoonish manner, much in the same way that Mickey Mouse is a visual shorthand for Disney. Now, he’s releasing an actual cookbook called #SlowCooke… [+2970 chars]"
          }],
      }
    });

    const app = initNewsApp();
    const res = await request(app).get('/headlines');
    console.log(res)
    expect(res.status).toEqual(200)
    expect(res.body).toMatchSnapshot()

  })

})