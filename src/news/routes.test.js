const request = require("supertest");
const app = require("../app");
const NEWS_URL = require("./constants").NEWS_URL_BASE;
const NEWS_API_KEY = require("./constants").NEWS_API_KEY;
const newsRoutes = require("./routes");
const moxios = require("moxios");
const express = require("express");

const initNewsApp = () => {
  const app = express();
  app.use(newsRoutes());
  return app;
};

describe("News get route", () => {
  let app;
  beforeAll(() => {
    app = initNewsApp();
  });

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should return set of articles filtered by search word", async () => {
    moxios.stubRequest(
      `${NEWS_URL}everything?q=Sunday&apiKey=${NEWS_API_KEY}`,
      {
        status: 200,
        response: {
          status: "ok",
          totalResults: 2,
          articles: [
            {
              source: {
                id: "the-new-york-times",
                name: "The New York Times"
              },
              author: "SHIVANI VORA",
              title:
                "Sunday Routine: How Alyson Cambridge, Operatic Soprano, Spends Her Sundays",
              description:
                "She runs up to 15 miles in Riverside Park, often goes for costume fittings, enjoys guacamole and margaritas with friends, and calls her parents.",
              url:
                "https://www.nytimes.com/2018/12/07/nyregion/how-alyson-cambridge-operatic-soprano-spends-her-sundays.html",
              urlToImage:
                "https://static01.nyt.com/images/2018/12/09/nyregion/09ROUTINE1/09ROUTINE1-facebookJumbo.jpg",
              publishedAt: "2018-12-07T10:00:14Z",
              content:
                "Alyson Cambridge made her debut at the Metropolitan Opera in 2004 when she was 24. She has performed there regularly ever since while also appearing on European stages with the Polish National Opera and the Munich Philharmonic. This year, Ms. Cambridge, 39, m… [+714 chars]"
            },
            {
              source: {
                id: "the-verge",
                name: "The Verge"
              },
              author: "Chaim Gartenberg",
              title:
                "T-Mobile is releasing a Slow Cooker Sunday cookbook by CEO John Legere",
              description:
                "T-Mobile CEO John Legere is essentially a character all his own, representing the carrier’s brand in an almost cartoonish manner, much in the same way that Mickey Mouse is a visual shorthand for Disney. Now, he’s releasing an actual cookbook called #SlowCooke…",
              url:
                "https://www.theverge.com/2018/12/6/18128990/tmobile-slow-cooker-sunday-cookbook-ceo-john-legere",
              urlToImage:
                "https://cdn.vox-cdn.com/thumbor/unhVseQHVRiUo2uf0z5Aq0ZodOA=/0x99:770x502/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/13606574/John_Legere_Slow_Cooker_Sunday_Cookbook___Original_File.jpeg",
              publishedAt: "2018-12-06T16:43:42Z",
              content:
                "T-Mobile CEO John Legere is essentially a character all his own, representing the carrier’s brand in an almost cartoonish manner, much in the same way that Mickey Mouse is a visual shorthand for Disney. Now, he’s releasing an actual cookbook called #SlowCooke… [+2970 chars]"
            }
          ]
        }
      }
    );

    const res = await request(app).get("/filtered?query=Sunday");
    expect(res.status).toEqual(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return set of latest headlines", async () => {
    moxios.stubRequest(
      `${NEWS_URL}top-headlines?country=gb&apiKey=${NEWS_API_KEY}`,
      {
        status: 200,
        response: {
          status: "ok",
          totalResults: 3,
          articles: [
            {
              source: {
                id: "bbc-news",
                name: "BBC News"
              },
              author: "https://www.facebook.com/bbcnews",
              title: "Fire breaks out at Chester Zoo - BBC News",
              description:
                "A blaze has led to the evacuation of visitors and animals at one of the UK's most popular zoos.",
              url: "https://www.bbc.co.uk/news/uk-england-merseyside-46579083",
              urlToImage:
                "https://ichef.bbci.co.uk/news/1024/branded_news/6CC2/production/_104824872_dw.jpg",
              publishedAt: "2018-12-15T12:24:35Z",
              content:
                "Image copyright David Wearing A large fire has broken out at Chester Zoo prompting an evacuation of visitors and animals. The site is one of the most popular tourism venues in the UK. The zoo tweeted the blaze had broken out in its Monsoon Forest habitat. It … [+330 chars]"
            },
            {
              source: {
                id: null,
                name: "Skysports.com"
              },
              author: null,
              title:
                "Tubes Meets Jose Mourinho: I love management more than ever - SkySports",
              description:
                "Manchester United manager Jose Mourinho insists he loves management more than ever, because it is more difficult than ever.",
              url:
                "https://www.skysports.com/football/news/11667/11581501/tubes-meets-jose-mourinho-i-love-management-more-than-ever",
              urlToImage:
                "https://e2.365dm.com/18/12/150x150/skysports-tubes-jose-mourinho_4519375.jpg",
              publishedAt: "2018-12-15T11:32:49Z",
              content:
                "Manchester United manager Jose Mourinho insists he loves management more than ever, because it is more difficult than ever. Mourinho's United are 16 points behind Liverpool going into their Super Sunday clash, having finished second in the Premier League last… [+3056 chars]"
            },
            {
              source: {
                id: "the-guardian-au",
                name: "The Guardian (AU)"
              },
              author: "",
              title:
                "Gilets jaunes protesters turn out in Paris for fifth weekend - The Guardian",
              description:
                "About 8,000 police deployed as demonstrations over economic injustice remain strong",
              url:
                "https://www.theguardian.com/world/2018/dec/15/gilets-jaunes-protesters-turn-out-in-paris-for-fifth-weekend",
              urlToImage:
                "https://i.guim.co.uk/img/media/384fb93b1e2d37556a8633431b52865e3164f546/0_323_4850_2910/master/4850.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=cb397e6d75284cafd84eb396ce15bc62",
              publishedAt: "2018-12-15T11:28:00Z",
              content:
                "Paris police have been deployed in large numbers for the fifth consecutive weekend of demonstrations by gilets jaunes protesters, with authorities repeating calls for calm after previous rallies turned violent. At least 21 people were detained on Saturday mor… [+3346 chars]"
            }
          ]
        }
      }
    );

    const res = await request(app).get("/headlines");
    expect(res.status).toEqual(200);
    expect(res.body).toMatchSnapshot();
  });
});
