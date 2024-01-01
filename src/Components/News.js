import React, { useEffect, useState, useRef } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const prevPropsRef = useRef({ query: props.query });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&q=${props.query}&page=${page}&pagesize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(25);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    document.title = `NewsHub - ${capitalize(props.category)}`;
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
  }, []);

  useEffect(() => {
    if (setQuery(prevPropsRef.current.query) !== props.query) {
      updateNews();
    }
    prevPropsRef.current = props;
  }, [props.query]);

  const handlePrevPage = async () => {
    setPage(page - 1);
    updateNews();
  };
  const handleNextPage = async () => {
    setPage(page + 1);
    updateNews();
  };
  const fetchData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&q=${props.query}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center">
        News Hub - Top {capitalize(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <h3 style={{ textAlign: "center" }}>
            <b>
              You have seen it all from {capitalize(props.category)} category!
            </b>
          </h3>
        }
      >
        <div className="row" style={{ margin: "2rem 0" }}>
          {articles.map((element) => {
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
          onClick={handlePrevPage}
          disabled={page <= 1}
          >
            Previous
          </button>
          <h5>
            Page : <span className="badge bg-dark">{page}</span>
          </h5>
          <button
            disabled={
              !(
                page + 1 <=
                Math.ceil(totalResults / props.pageSize)
              )
            }
            className="btn btn-dark btn"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div> */}
    </div>
  );
};

export default News;
