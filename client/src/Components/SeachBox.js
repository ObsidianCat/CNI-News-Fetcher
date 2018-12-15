import React, { Component } from "react";
import { Input, Button } from "antd";

class SearchBox extends Component {
  state = { term: "" };

  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    if (this.state.term !== "") {
      this.props.fetchNews(`/news/filtered?query=${this.state.term}`);
    }

    this.setState({ term: "" });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="search-box input-group">
        <Input
          placeholder="type something to search"
          value={this.state.term}
          onChange={this.onInputChange}
          className="search"
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default SearchBox;
