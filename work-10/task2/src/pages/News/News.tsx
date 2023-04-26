import React, { Component } from "react";
import Header from "../../components/Header/Header";
import * as api from "../../services/api";
import "./News.css";
import NewsItem from "../../components/NewsItem/NewsItem";
import { IArticle } from "../../types";
import { RouteComponentProps } from "react-router-dom";
interface State {
  news: IArticle[];
}
export default class News extends Component<any, State> {
  state: State = {
    news: [],
  };
  getData = async () => {
    try {
      let result = await api.news();
      this.setState({
        news: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <main>
          {/* <NewsItem></NewsItem> */}
          {this.state.news.map((item) => {
            return <NewsItem {...item} key={item.id}></NewsItem>;
          })}
        </main>
      </React.Fragment>
    );
  }
}
