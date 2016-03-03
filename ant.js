(function(){
  antLibrary = {};
  var allAntsArray = [];
  var allColonyArray = [];
  var xMax, yMax;
  var materials = ["food", "space"]

  var canvas = document.getElementById('map');
  var context = canvas.getContext('2d');
  context.fillStyle = '#FF0000';

  moveAnt = function(Ant){
    Ant.locationX += Math.round(Math.random() * 2) - 1;
    Ant.locationY += Math.round(Math.random() * 2) - 1;
    if(Ant.locationY >= 100){
      Ant.locationY = 99;
    }
    if(Ant.locationX >= 100){
      Ant.locationX = 99;
    }
    if(Ant.locationX < 0){
      Ant.locationX = 0;
    }
    if(Ant.locationY < 0){
      Ant.locationY = 0;
    }

    map[Ant.locationX][Ant.locationY].antPresent = true;
    return Ant;
  }
  antLibrary.getAllAnts = function(){
    return allAntsArray;
  }
  
  antLibrary.createAnt = function(type){
    var newAnt = new Ant(type);
    allAntsArray.push(newAnt);
    return newAnt;
  }

  antLibrary.makeSomeMoves = function(){
    return allAntsArray.map(moveAnt)
  }

  antLibrary.clearCanvas = function(){
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  buildMap = function(dimension){
    var map = [];
    for(var height = 0; height < dimension; height++){
      var one = [];
      for(var width = 0; width < dimension; width++){
        var spaceAndDensity = getSpaceAndDensity();
        one.push({x:height, y:width, material:spaceAndDensity.blockType, density:spaceAndDensity.density, antPresent:false})
      }
      map.push(one)
    }  
    xMax = dimension;
    yMax = dimension;
    return map;  
  }

  getSpaceAndDensity = function(){
    var die1 = Math.round(Math.random()*100);
    var die2 = Math.round(Math.random()*10 * Math.random()*10 * Math.random()*10/10);
    var object = {blockType:"dirt", density:die2}

    if(die1 < 10){
      object.blockType = "food"
    }
    return object;
  }

  var Ant = function (type) {
    this.type = type || 'forager';
    this.locationX = 0;
    this.locationY = 0;
  };

  antLibrary.showPositions = function(){
    map.forEach(function(xRow){
      xRow.forEach(function(coord){
        if (coord.antPresent){
          context.beginPath();
          context.arc(coord.x*10, coord.y*10, 1, 0, Math.PI * 2, true);
          context.fill();
        }
      })
    })
  }

  var map = buildMap(100);
  
  return antLibrary;
}())



createtonsoAnts = function(numberOfAnts){
  for(var i = 0; i<numberOfAnts; i++){
    antLibrary.createAnt();
  }
}

makeMultipleMoves = function(numberOfMoves){

}

makeOneMoveAndDisplay = function(){
  antLibrary.clearCanvas();
  antLibrary.makeSomeMoves();
  antLibrary.showPositions();
}
// window.setInterval(makeOneMoveAndDisplay, 300)