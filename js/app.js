var player;
var shape;
var setup;
var stats;
var gui;
var playButton;

window.requestAnimationFrame = (function(){
  return window.requestAnimationFrame  ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback){
    window.setTimeout(callback, 1000 / 60);
  };
})();

document.addEventListener('DOMContentLoaded', function(){
  stats = new Stats();
  shape = new threejs();
  player = new Audio();
  gui = new dat.GUI();
  setup = false;

  shape.init();

  initGUI();
  initStats();
  initDropZone();
  initControls();
});

function initControls(){
  playButton = document.querySelector('#play');
  playButton.style.visibility = "hidden";
  playButton.addEventListener('click', function(){
    if(setup){
      if(this.classList.contains('icon-play')){
        player.play();
        this.classList.remove('icon-play')
        this.classList.add('icon-stop');
      }
      else{
        player.stop();
        this.classList.remove('icon-stop')
        this.classList.add('icon-play');
      }
    }
  })
}

function initDropZone(){
  var dropZone = document.querySelector('.dropzone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
}

function initStats(){
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.bottom = '0px';
  document.body.appendChild( stats.domElement );
}

function initGUI(){
  gui.addColor(shape, 'firstColor');
  gui.addColor(shape, 'secondColor');
  gui.add(shape, 'typeTransform', { Scale: 0, Position: 1 });
  var controllerSpaceX = gui.add(shape, 'spaceX');
  var controllerSpaceY = gui.add(shape, 'spaceY');
  var controllerSize   = gui.add(shape, 'size');
  var controllerNbX    = gui.add(shape, 'nbX');
  var controllerNbY    = gui.add(shape, 'nbY');
  var controllerScaleMin  = gui.add(shape, 'scaleMin');
  var controllerScaleMax  = gui.add(shape, 'scaleMax');
  var controllerPosition  = gui.add(shape, 'position');

  controllerSize.onFinishChange(function(value) {shape.size = value; shape.initShape();});
  controllerNbX.onFinishChange(function(value) {shape.nbX = value; shape.initShape();});
  controllerNbY.onFinishChange(function(value) {shape.nbY = value; shape.initShape();});
  controllerSpaceX.onFinishChange(function(value) {shape.spaceX = value; shape.initShape();});
  controllerSpaceY.onFinishChange(function(value) {shape.spaceY = value; shape.initShape();});
  controllerScaleMin.onFinishChange(function(value) {shape.scaleMin = value; shape.initShape();});
  controllerScaleMax.onFinishChange(function(value) {shape.scaleMax = value; shape.initShape();});
  controllerPosition.onFinishChange(function(value) {shape.position = value; shape.initShape();});
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  document.querySelector('.container').style.visibility = "visible";

  var files = evt.dataTransfer.files;
  var output = [];
  var f = files[0];
  if(f.type.indexOf("audio") != -1){
    setup = false;
    var reader = new FileReader();
    reader.onload = (function(f) {
      return function(e) {
        player.decodeData(e.target.result, function(){
          setup = true;
          document.querySelector('.container').style.visibility = "hidden";
          playButton.style.visibility = "visible";
          playButton.classList.remove('icon-play')
          playButton.classList.add('icon-stop');
        });
      };
    })(f);
    reader.readAsArrayBuffer(f);
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

window.onresize = function(evt){
  shape = new threejs();
  shape.init();
}
