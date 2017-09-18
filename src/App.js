import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import BgImg from './img/john-towner-128480.jpg';
import Partners from './components/Partners';
import Partner from './components/Partner';
import partnersDataFile from './data/partnersData.json';


class App extends Component {
  componentWillMount() {
    this.setState({ partnersData : partnersDataFile });
  }

  componentDidMount() {
    this.setState({ PartnersHTMLRoutes : this.state.partnersData.partners
      .map( partner => {
        const PartnerSection = () => {
          console.log("building route for : "+partner.name);
          return (
            <Partner partner={ partner }/>
          );
        }
        return ( <Route key={partner.name} path={`/${partner.name}/`} partner={partner} component={ PartnerSection } /> ); })
      });
  }

  render() {
    const PartnersList = () => {
      return (
        <Partners partners={ this.state.partnersData.partners } />
      );
    }


    return (
      <Router>
        <div className="container main" data-reactroot="root">
          <div className="header jumbotron">
            <img src={ BgImg } alt="Nexway Onboarding" />
            <h1><span className="f-letter">C</span>ustomer <span className="f-letter">O</span>nboarding <span className="f-letter">P</span>rogress</h1>
          </div>
          <Switch>
            <Route exact path="/" render={ PartnersList }/>
            { this.state.PartnersHTMLRoutes }
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
