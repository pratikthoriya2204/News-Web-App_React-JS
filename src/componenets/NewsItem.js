import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className=''> 
        <div className="card" style={{width:  '18rem'}}>
          <div style={{
            display:  'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right:  '0'
          }}>
            <span className="badge rounded-pill bg-success" >{source}</span>
          </div>
            <img src={imageUrl} className="card-img-top" alt="..." style={{ height: '150px' }} />
            <div className="card-body" style={{ backgroundColor: this.props.mode === 'dark' ? '#303031' : 'white', color: this.props.mode === 'dark' ? 'white' : 'black' }}>
              <h5 className="card-title" >{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className={`text-body-${this.props.mode === 'dark' ? 'light' : 'secondary'}`} >By {author ? author : "Unknown"} On {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark" style={{ backgroundColor: this.props.mode === 'dark' ? '#FF00FF' : 'black', color: this.props.mode === 'dark' ? 'white' : 'white' }}>Read More</a>
            </div>
          </div>
      </div>
    )
  }
}

export default NewsItem
