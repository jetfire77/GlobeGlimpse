import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResult] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    console.log("cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });    // class based
    setLoading(true);

    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false);
    console.log(parsedData);
    props.setProgress(100);

    // this.setState({
    //   articles: parsedData.articles,                // class based mein setstate
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - GlobeGlimpse `;
    updateNews();

    // eslint disable next line
  }, []);

  //   useEffect does the same work what componentDidMount does in classbased

  // async componentDidMount() {
  //   // console.log("cdm");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=27486b0ba3e349338074dea6a1f32699&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading: false,
  //   // });
  //   this.updateNews();
  // }

  const handlePrevClick = async () => {
    // console.log("prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=27486b0ba3e349338074dea6a1f32699&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    // this.setState({ page: this.state.page - 1 });    // class based
    // this.updateNews();                               // class based

    setPage(page - 1); // functional based
    updateNews(); // functional based
  };

  const handleNextClick = async () => {
    console.log("Next");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=27486b0ba3e349338074dea6a1f32699&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }

    // this.setState({ page: this.state.page + 1 });     // class based
    // this.updateNews();                                 // class based

    setPage(page + 1); // functional based
    updateNews(); // functional based
  };

  const fetchMoreData = async () => {
    // -------------------classBased----------------------------
    // this.setState({ page: this.state.page + 1 });
    // -------------------classBased----------------------------

    console.log("cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    // -------------------functionBased----------------------------
    setPage(page + 1);
    // -------------------functionBased----------------------------

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    // -------------------functionBased----------------------------
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
    // -------------------functionBased----------------------------

    // -------------------classBased----------------------------
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    // });
    // -------------------classBased----------------------------
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "80px 0px " }}>
        GlobeGlimpse - Top {capitalizeFirstLetter(props.category)} Headlines{" "}
      </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner></Spinner>}
      >
        <div ClassName="container">
          <div className="row">
            {/* {!this.state.loading &&
            this.state.articles.map((element) => { */}

            {articles.map((element) => {
              //to get articles from api
              return (
                //because url is unique
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://cdn.crash.net/styles/large_article/s3/pa/3264825.0064.jpg"
                    }
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between ">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
