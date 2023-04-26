import React, { Component } from "react";
import Header from "../../components/Header/Header";
import "./Posts.css";
import * as api from "../../services/api";
import PostItem from "../../components/PostItem/PostItem";
import { IArticle } from "../../types";
interface State {
  posts: IArticle[];
}
export default class Posts extends Component<any, State> {
  state: State = {
    posts: [],
  };
  getData = async () => {
    try {
      let res = await api.posts();
      let posts = res.rows;
      this.setState({
        posts,
      });
    } catch (error) {}
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <main>
          {this.state.posts.map((item, index) => {
            return (
              <PostItem {...item} content={index + ""} key={item.id}></PostItem>
            );
          })}
        </main>
      </React.Fragment>
    );
  }
}
