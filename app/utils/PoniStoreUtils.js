export default {
  findMinPrice: function(poniArray) {
    return poniArray.reduce((previousValue, currentValue) => {
      if (currentValue.price < previousValue.price) {
        return currentValue;
      }
      else {
        return previousValue;
      }
    }).price;
  },
  
  findMaxPrice: function(poniArray) {
    return poniArray.reduce((previousValue, currentValue) => {
      if (currentValue.price > previousValue.price) {
        return currentValue;
      }
      else {
        return previousValue;
      }
    }).price;
  },
  
  getSomeRandomPonis: function(poniArray, poniCount) {
    let i = 0,
        l = poniArray.length,
        minL = Math.min(poniCount, l),
        randomPonis = [],
        randomIndices = [],
        random;
    
    while (i++ < minL) {
      while(true) {
        random = Math.floor(Math.random() * l);
        if (randomIndices.indexOf(random) === -1) {
          randomPonis.push(poniArray[random]);
          randomIndices.push(random);
          break;
        }
      }
    }
    
    return randomPonis;
  }
  
};