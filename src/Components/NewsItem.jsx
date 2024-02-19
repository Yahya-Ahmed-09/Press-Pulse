import React from 'react'
import { Link } from 'react-router-dom'

export default function NewsItem(props){
    let imgStyle = {
      width: "100%",
      height: "200px",
      objectfit: "contain"
    }
    let { title, description, imageUrl, newsUrl, author, date, source, } = props;
    return (
      <div className="card">
        <div style={{display: "flex", justifyContent: "end", position: "absolute", right: "0"}}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img src={imageUrl} className="card-img-top" alt="..." style={imgStyle} />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toUTCString()}</small></p>
          <Link to={newsUrl} target="_blank" className="btn btn-md btn-dark">Read More</Link>
        </div>
      </div>
    )
  }

