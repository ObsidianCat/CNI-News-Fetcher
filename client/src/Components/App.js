import React, { Component } from "react";
import axios from "axios";

import "../App.css";
import SearchBox from "./SeachBox";
import { List } from "antd";

class App extends Component {
  state = { news: [] };

  componentDidMount() {
    this.fetchNews();
  }
  fetchNews = (url = "/news/headlines") => {
    axios.get(url).then(response => {
      this.setState({ news: response.data.articles });
    }).catch(error => console.error(error));
  };

  render() {
    const newsItems = this.state.news.map(item => (
      <a href={item.url} rel="external" target="_blank">
        {item.title}
      </a>
    ));
    return (
      <div className="App">
        <SearchBox fetchNews={this.fetchNews} />
        <List
          bordered
          dataSource={newsItems}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default App;
