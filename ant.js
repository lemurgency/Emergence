(function(){
  antLibrary = {};
  var allAntsArray = [];
  var allColonyArray = [];
  var xMax, yMax;
  var materials = ["food", "space"]

  var canvas = document.getElementById('map');
  var context = canvas.getContext('2d');

  moveAnt = function(Ant){
    if(Ant.returningHome){

    } else {
      
    }
    var xDir = Ant.forwardLocation.x === 0 ? 2 : Ant.forwardLocation.x;
    var yDir = Ant.forwardLocation.y === 0 ? 2 : Ant.forwardLocation.y;
    Ant.forwardLocation.x = xDir === 2 ? Math.round(Math.random() * xDir) - 1 : Math.round(Math.random() * xDir);
    Ant.forwardLocation.y = yDir === 2 ? Math.round(Math.random() * yDir) - 1 : Math.round(Math.random() * yDir);
    var tempMoveX = Ant.locationX + Ant.forwardLocation.x;
    var tempMoveY = Ant.locationY + Ant.forwardLocation.y;    
    var tempMap = map[tempMoveX][tempMoveY];
    if(tempMap.blockType === "food" && tempMap.density > 0){

    } else {
      Ant.locationX += Ant.forwardLocation.x;
      Ant.locationY += Ant.forwardLocation.y;
    }
    if(Ant.locationY >= 99){
      Ant.locationY = 98;
    }
    if(Ant.locationX >= 99){
      Ant.locationX = 98;
    }
    if(Ant.locationX < 1){
      Ant.locationX = 1;
    }
    if(Ant.locationY < 1){
      Ant.locationY = 1;
    }


    map[Ant.locationX][Ant.locationY].antPresent = true;
    map[Ant.locationX][Ant.locationY].pheromeLevel += 1;
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
    map.map(function(yArray){
      return yArray.map(function(coord){
        coord.antPresent = false;
        return coord;
      })
    })
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  buildMap = function(dimension){
    var map = [];
    for(var height = 0; height < dimension; height++){
      var one = [];
      for(var width = 0; width < dimension; width++){
        var spaceAndDensity = getSpaceAndDensity();
        one.push({x:height, y:width, material:spaceAndDensity.blockType, density:spaceAndDensity.density, antPresent:false, pheromeLevel:0})
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
    this.locationX = 50;
    this.locationY = 50;
    this.forwardLocation={x:0,y:0}
  };

  antLibrary.showPositions = function(){
    map.forEach(function(xRow){
      xRow.forEach(function(coord){
        if(coord.antPresent){
          context.fillStyle = '#FF0000';
          context.beginPath();
          context.arc(coord.x*10, coord.y*10, 1, 0, Math.PI * 2, true);
          context.fill();
        }        
        if(coord.pheromeLevel > 0){
          context.fillStyle = 'rgba(146, 59, 146,'+coord.pheromeLevel/10+')';
          context.beginPath();
          context.arc(coord.x*10, coord.y*10, 1, 0, Math.PI * 2, true);
          context.fill();
        }
        if(coord.material === 'food'){          
          context.fillStyle = '#3E823A';
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

runSimulation = function(numberOfAnts, refreshRate){
  createtonsoAnts(numberOfAnts || 10)
  window.setInterval(makeOneMoveAndDisplay, refreshRate || 300)
}