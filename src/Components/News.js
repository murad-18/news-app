import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      query: "",
      totalResults: 0,
    };
  }
  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&q=${this.props.query}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(25);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    document.title = `NewsHub - ${this.capitalize(this.props.category)}`;
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.updateNews();
    }
  }
  // handlePrevPage = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   // console.log(this.state.page);
  //   this.updateNews();
  // };
  // handleNextPage = async () => {
  //   // console.log(this.state.page);
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&q=${this.props.query}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          News Hub - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            <h3 style={{ textAlign: "center" }}>
              <b>
                You have seen it all from {this.capitalize(this.props.category)}{" "}
                category!
              </b>
            </h3>
          }
        >
          <div className="row" style={{ margin: "2rem 0" }}>
            {this.state.articles.map((element) => {
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
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
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
        </div> */}
      </div>
    );
  }
}

export default News;
