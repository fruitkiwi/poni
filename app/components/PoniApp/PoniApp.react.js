import React from 'react';
import PoniList from '../../components/PoniList/PoniList.react';
import PoniFilter from '../../components/PoniFilter/PoniFilter.react';
import Link from '../../components/link/Link.react';
import PoniStore from '../../stores/PoniStore';

import './PoniApp.css';

class PoniApp extends React.Component {
  
  constructor() {
    super();
    this.state = {
      links: [],
      ponis: []
    }
  }
  
  handleRegisterLink(link) {
    let links = this.state.links;
    links.push(link);
    this.setState({
      links: links
    });
  }
  
  onChange() {
    this.setState({
      ponis: PoniStore.getAll()
    })
  }
  
  componentWillMount() {
    this.setState({
      ponis: PoniStore.getAll()
    })
    PoniStore.addChangeListener(::this.onChange);
  }
  
  render() {
    return (
      <div className="poniApp">
        <Link registerLink={::this.handleRegisterLink} value='Найти пони' />
        <PoniList ponis={this.state.ponis} />
        <PoniFilter links={this.state.links} filters={PoniStore.getFilters()}/>
      </div>
    )
  }
  
};

export default PoniApp;