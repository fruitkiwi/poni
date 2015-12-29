import React from 'react';

import './PoniList.css';

class PoniList extends React.Component {
  render() {
    let listContent = this.props.ponis.length === 0 ?
      <p>Ничего не найдено</p> :
      <div>
        <h5 className="poniListHeader">Мои пони:</h5>
        <ul className="poniList">
          {this.props.ponis.map((item) => {
             return <li key={item.name} className="poniList__item">{item.name}</li>
          })}
        </ul>
      </div>;
    return (
      <div className="poniListBlock">
        {listContent}
      </div>
    )
  }
};

export default PoniList;