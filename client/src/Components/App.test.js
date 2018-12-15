import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import App from './App';

const resMock = {
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

let wrapper;

beforeEach(()=>{
  moxios.install();
  wrapper =  shallow(<App />);
})

afterEach(()=>{
  moxios.uninstall();
  wrapper.unmount()
})

it('renders as snapshot', () => {
  expect(wrapper).toMatchSnapshot();

});

it('set correct state after fetching data', (done) => {
  moxios.stubRequest('/news/headlines', {
    status: 200,
    response: resMock
  })

  wrapper.instance().componentDidMount()

  moxios.wait(()=>{
    console.log(wrapper.state());
    expect(wrapper.state()).toHaveProperty('news', resMock.articles);

    done()
  })

});
