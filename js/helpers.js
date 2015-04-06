/*************************
TOOLS
*************************/

function radToDeg(angle){
  return ((180 * (angle)) / Math.PI);
}

function degToRad(angle){
  return ((Math.PI * (angle)) / 180);
}

function RandomRange(min,max){
  return Math.floor((Math.random()*max)+min);
}

Math.average = function() {
  var values = 0;
  var average;
  var length = arguments.length;
  for (var i = 0; i < length; i++)
    values += arguments[i];
  average = values / length;
  return average;
}
function log(/**/){
  console.log(arguments);
}

function newRangeInteger(OldValue, OldMin, OldMax, NewMin, NewMax){
  return Math.floor((((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin);
}
function newRange(OldValue, OldMin, OldMax, NewMin, NewMax){
  return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin;
}
function getMaxTableau(tableauNumérique) {
  return Math.max.apply(null, tableauNumérique);
}
function getMinTableau(tableauNumérique) {
  return Math.min.apply(null, tableauNumérique);
}
