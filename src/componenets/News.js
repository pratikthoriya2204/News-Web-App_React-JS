import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;

  }

  // async updateNews() {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true })
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData)
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false
  //   })
  // }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
    // this.updateNews();
  }

  handlePrevclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // ef61c8a96c5c4aab8e2045fbdabe28f7

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

    // this.setState({ page: this.state.page - 1 })
    // this.updateNews();

  }
  handleNextclick = async () => {

    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
      // this.setState({ page: this.state.page + 1 })
      // this.updateNews();

    }
  }

  render() {
    return (
      <div className='container' style={{ marginTop: '80px' }} >
        <h1 className='text-center' style={{ color: this.props.mode === 'light' ? 'black' : 'white', margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} News</h1>

        {this.state.loading && <Spinner />}
          <div className="container">
            <div className="row">
              {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-xl-4" key={element.url}>
                  <NewsItem mode={this.props.mode} title={element.title ? element.title.slice(0, 40) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage ? element.urlToImage : "https://demofree.sirv.com/nope-not-here.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        
        <div className="container d-flex justify-content-between mb-5">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick} style={{ backgroundColor: this.props.mode === 'dark' ? '#FF00FF' : 'black', color: this.props.mode === 'dark' ? 'white' : 'white' }}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick} style={{ backgroundColor: this.props.mode === 'dark' ? '#FF00FF' : 'black', color: this.props.mode === 'dark' ? 'white' : 'white' }}> Next &rarr; </button>
        </div>
      </div>
    )
  }
}
