import React from 'react';

class Link extends React.Component {
  
  componentDidMount() {
    this.props.registerLink(this.refs.link);
  }
  
  render() {
    return(
     <a href='javascript:void(0)' ref='link'>{this.props.value}</a>
    )
  }
};

export default Link;