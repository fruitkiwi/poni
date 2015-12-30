import PoniAppDispatcher from '../dispatcher/PoniAppDispatcher';
import {EventEmitter} from 'events';
import PoniStoreUtils from '../utils/PoniStoreUtils';
import * as ConstUtils from '../utils/ConstUtils';

let ponis = [
  {
    name: 'Твайлайт',
    color: 'Фиолетовый',
    kind: 'Единорог',
    price: 19.99,
    is_new: false		
  },
  {
    name: 'Poni',
    color: 'Голубой',
    kind: 'Пегас',
    price: 29.99,
    is_new: true		
  },
  {
    name: 'Another Poni',
    color: 'Зеленый',
    kind: 'Земная пони',
    price: 9.99,
    is_new: false		
  },
  {
    name: 'Poni Poni',
    color: 'Зеленый',
    kind: 'Единорог',
    price: 59.99,
    is_new: true		
  },
  {
    name: 'Poni2',
    color: 'Фиолетовый',
    kind: 'Аликорн',
    price: 9.99,
    is_new: false		
  }
];
let filter = {};

class PoniStore extends EventEmitter {
  emitChange() {
    this.emit('change');
  }
  
  addChangeListener(callback) {
    this.on('change', callback);
  }
  
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
  
  getAll() {
    let myPonis;
    
    if (Object.keys(filter).length === 0) {
      myPonis = ponis;
    }
    else {
      myPonis = ponis.filter((item) => {
        return ((filter.color === ConstUtils.DEFAULT_SELECT_VALUE || item.color === filter.color) &&
                (filter.type === ConstUtils.DEFAULT_SELECT_VALUE || item.kind === filter.type) &&
                item.price >= filter.priceRange[0] && item.price <= filter.priceRange[1] &&
                (filter.new ? item.is_new === filter.new : true))
      });
    }
    return PoniStoreUtils.getSomeRandomPonis(myPonis, ConstUtils.PONI_LIST_SHOWN);
  }
  
  getFilters() {
    return {
      color: ['Фиолетовый', 'Голубой', 'Зеленый'],
      type: ['Земная пони', 'Единорог', 'Пегас', 'Аликорн'],
      priceRange: {
        from: PoniStoreUtils.findMinPrice(ponis),
        to: PoniStoreUtils.findMaxPrice(ponis)
      }
    };
  }
  
  dispatchToken = PoniAppDispatcher.register((action) => {
    switch(action.type) {
      case 'filter-poni':
        filter = action.filter;
        this.emitChange();
        break;
    };
  })
  
};

export default new PoniStore();