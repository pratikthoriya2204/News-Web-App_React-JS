import './App.css';

import React, { Component } from 'react'
import Navbar from './componenets/Navbar';
import News from './componenets/News';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {


  constructor() {
    super();
    this.state = {
      mode: 'light',
      progress: 0

    }
  }



  toggleMode = () => {
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' })
      document.body.style.backgroundColor = '#303031';

    } else {
      this.setState({ mode: 'light' })
      document.body.style.backgroundColor = 'white';
    }
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  pageSize = 8;
  apikey = '4b6cfeeee1bc4691940c7e719d05ffad';

  render() {
    return (
      <div>
        <Router>

          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />

          <Navbar mode={this.state.mode} toggleMode={this.toggleMode} />

          <Switch>
            <Route exact path='/' element={<News setProgress={this.setProgress} apikey={this.apikey} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"sports"} />} />

            <Route exact path='/business' element={<News setProgress={this.setProgress} apikey={this.apikey} key={"business"} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"business"} />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apikey={this.apikey} key={"entertainment"} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"entertainment"} />} />
            <Route exact path='/general' element={<News setProgress={this.setProgress} apikey={this.apikey} key={"general"} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"general"} />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} apikey={this.apikey} key={"health"} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"health"} />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} apikey={this.apikey} key={"science"} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"science"} />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apikey={this.apikey} key={"sports"} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"sports"} />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apikey={this.apikey} key={"technology"} mode={this.state.mode} pageSize={this.pageSize} country={'in'} category={"technology"} />} />
          </Switch>

        </Router>
      </div>
    )
  }
}

