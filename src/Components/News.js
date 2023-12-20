import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      query: "",
    };
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=344aef2b1daa4b4aaf6da240acfce1ef&q=${this.props.query}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.updateNews();
    }
  }
  handlePrevPage = async () => {
    this.setState({ page: this.state.page - 1 });
    // console.log(this.state.page);
    this.updateNews();
  };
  handleNextPage = async () => {
    // console.log(this.state.page);
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Hub - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row" style={{ margin: "2rem 0" }}>
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4 p-4">
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          <div className="container d-flex justify-content-between">
            <button
              className="btn btn-dark btn"
              onClick={this.handlePrevPage}
              disabled={this.state.page <= 1}
            >
              Previous
            </button>
            <h5>
              Page : <span className="badge bg-dark">{this.state.page}</span>
            </h5>
            <button
              disabled={
                !(
                  this.state.page + 1 <=
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                )
              }
              className="btn btn-dark btn"
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
