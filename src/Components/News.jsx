import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News (props) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const pageUpdate = async () => {
    props.setProgress(10);
    setLoading(true)
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=a5432d257dc2454db5639e0507e7bc1d&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let finalData = await data.json();
    setArticles(finalData.articles)
    setLoading(false)
    setTotalResults(finalData.totalResults)
    props.setProgress(100);
  }

  const fetchMoreData = async () => { 
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=a5432d257dc2454db5639e0507e7bc1d&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1) 
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }; 
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} | PressPulse`
    pageUpdate();
    // eslint-disable-next-line
  }, [])
  


    return (
      <>
        <h2 className='my-3 text-center' >{`Top ${capitalizeFirstLetter(props.category)} Headlines of PressPulse`}</h2>
      {loading && <Spinner />}    

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles !== totalResults}
        >
          <div className="container">

            <div className="row">
              {articles.map((element) => {
                return <div className="col-lg-3 col-md-6  my-3"key={element.url} >
                  <NewsItem  source={element.source.name} author={element.author ? element.author : "Unknown"} date={element.publishedAt} title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://sportshub.cbsistatic.com/i/r/2023/01/11/9693db2e-959d-4083-9159-7171ab331903/thumbnail/1200x675/938efe2208edad441a10ea4ae17b1e2d/mahomes-49ers-us.jpg"} newsUrl={element.url} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

      </>
    )
  }

  News.defaultProps = {
    pageSize: 12,
    country: 'us',
    category: "sports",
  }

  News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }