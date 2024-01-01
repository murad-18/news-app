import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
    props;
  return (
    <div>
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            <span className="badge text-bg-info" style={{ fontSize: "small" }}>
              {source}
            </span>{" "}
            <br />
            {title}...
          </h5>
          <p className="card-text">{description}...</p>
          <footer className="blockquote-footer">
            On {new Date(publishedAt).toGMTString()} By{" "}
            <cite title="Source Title">{author ? author : "Unknown"}</cite>
          </footer>
          <a
            href={newsUrl}
            rel="noreferrer"
            className="btn btn-sm btn-secondary"
          >
            Find More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
