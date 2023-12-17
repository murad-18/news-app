import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 18,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=344aef2b1daa4b4aaf6da240acfce1ef";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handlePrevPage = async () => {
    // console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=344aef2b1daa4b4aaf6da240acfce1ef&page=${
      this.state.page - 1
    }&pagesize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      pageSize: 18,
    });
  };
  handleNextPage = async () => {
    console.log(Math.ceil(this.state.totalResults / this.state.pageSize));
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.state.pageSize)
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=344aef2b1daa4b4aaf6da240acfce1ef&page=${
        this.state.page + 1
      }&pagesize=${this.state.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        pageSize: 18,
      });
    } else {
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h1>News Hub - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4 p-4">
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description ? element.description.slice(0, 80) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              className="btn btn-dark btn-lg"
              onClick={this.handlePrevPage}
              disabled={this.state.page <= 1}
            >
              Previous
            </button>
            <h5>
              Page : <span class="badge bg-dark">{this.state.page}</span>
            </h5>
            <button
              className="btn btn-dark btn-lg"
              onClick={this.handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
