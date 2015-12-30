import React from 'react';
import Dialog from 'dialog-polyfill';
import Range from 'rc-slider';
import PoniActionCreators from '../../actions/PoniActionCreators';
import * as ConstUtils from '../../utils/ConstUtils';

import '../../../node_modules/dialog-polyfill/dialog-polyfill.css';
import '../../../node_modules/rc-slider/assets/index.css';
import './PoniFilter.css';

class PoniFilter extends React.Component {
  
  constructor(props) {
    super(props);
    
    let from = props.filters.priceRange.from,
        to = props.filters.priceRange.to;
    this.state = {
      priceRange: [
        from,
        to
      ],
      priceMarks: {
        [from]: from,
        [to]: to
      },
      color: ConstUtils.DEFAULT_SELECT_VALUE,
      type: ConstUtils.DEFAULT_SELECT_VALUE,
      new: false
    }
  }
  
  closeDialog() {
    this.dialog.close();
  }
  
  handleRange(values) {
    this.setState({
      priceRange: values,
      priceMarks: {
        [values[0]]: values[0],
        [values[1]]: values[1]
      }
    });
  }
  
  handleColor(e) {
    this.setState({
      color: e.target.value
    });
  }
  
  handleType(e) {
    this.setState({
      type: e.target.value
    });
  }
  
  handleNew(e) {
    this.setState({
      new: e.target.checked
    });
  }
  
  handleSubmit() {
    let filter = Object.assign({}, this.state);
    delete filter.priceMarks;
    PoniActionCreators.loadFilter(filter);
    this.closeDialog();
  }
  
  componentDidMount() {
    this.dialog = this.refs.dialog;
    dialogPolyfill.registerDialog(this.dialog);
    
    let showDialog = () => {
      this.dialog.showModal();
    }
    
    this.props.links.forEach((link) => {
      link.addEventListener('click', showDialog)
    })
  }
  
  render() {
    let minPrice = this.props.filters.priceRange.from,
        maxPrice = this.props.filters.priceRange.to;
    
    return (
      <dialog className="poniFilter" ref="dialog">
        <div className="poniFilter__block">
          <p>Цвет:</p>
          <select className="poniFilter__input" onChange={::this.handleColor} value={this.state.color}>
            {[<option key="-1" value={ConstUtils.DEFAULT_SELECT_VALUE}>-</option>,
              ...this.props.filters.color.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
              })
            ]}
          </select>
        </div>
        <div className="poniFilter__block">
          <p>Тип:</p>
          <select className="poniFilter__input" onChange={::this.handleType} value={this.state.type}>
            {[<option key="-1" value={ConstUtils.DEFAULT_SELECT_VALUE}>-</option>,
             ...this.props.filters.type.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
              })
            ]}
          </select>
        </div>
        <div className="poniFilter__block">
          <p>Цена:</p>
          <Range range allowCross={false} value={this.state.priceRange} min={minPrice} max={maxPrice} onChange={::this.handleRange} tipFormatter={null} marks={this.state.priceMarks} step={0.01} className="poniFilter__input"/>
        </div>
        <div className="poniFilter__block">
          <p>Только новинки:</p>
          <input type="checkbox" className="poniFilter__input" onChange={::this.handleNew} checked={this.state.new}></input>
        </div>
        <div className="poniFilter__block alignCenter">
          <input type="submit" value="Применить" className="poniFilter__button" onClick={::this.handleSubmit}></input>
        </div>
        <span className="poniFilter__close" onClick={::this.closeDialog}>[x]</span>
      </dialog>
    )
  }
  
};

export default PoniFilter;