import React from "react";

const NewsItem = (props) => {
  let { title, description, imageurl, newsurl, author, date, source } = props;

  const customStyles = {
    backgroundColor: "white",
  };

  return (
    <div className="my-3     ">
      <div className="card" style={customStyles}>
        {/* <span
            className="position-absolute top-1 translate-middle badge rounded-pill bg-dark"
            style={{ left: "80%", zIndex: "1" }}
          >
            {" "}
            {source}
          </span> */}

        <img src={imageurl} className="card-img-top" alt="..." />
        <div className="text-center mb-2">
          <span className="badge badge-primary bg-dark">{source}</span>{" "}
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {title}
            ...
          </h5>

          <p className="card-text">{description}...</p>

          <p className="card-text">
            <small className="text-muted">
              {" "}
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}{" "}
            </small>
          </p>
          <a
            href={newsurl}
            target="_blank" // target = _blank to open in new tab read more
            className="btn btn-sm btn-success"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
