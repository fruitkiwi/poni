export default {
  findMinPrice: function(poniArray) {
    return Math.min.apply(null,
                  poniArray.map(item => {
                    return item.price
                  })
    );
  },
  
  findMaxPrice: function(poniArray) {
    return Math.max.apply(null,
                         poniArray.map(item => {
                          return item.price
                         })
    );
  },
  
  getSomeRandomPonis: function(poniArray, poniCount) {
    let i = 0,
        l = poniArray.length,
        minL = Math.min(poniCount, l),
        randomPonis = [],
        randomIndices = [],
        random;
    
    while (i++ < minL) {
      do {
        random = Math.floor(Math.random() * l);
      }
      while (randomIndices[random]);
      randomPonis.push(poniArray[random]);
      randomIndices[random] = true;
    }
    
    return randomPonis;
  }
  
};