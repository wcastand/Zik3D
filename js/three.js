function threejs() {}

threejs.prototype.init = function init() {
  this.firstColor = "#FFFFFF";
  this.secondColor = "#000000";
  this.nbX = 12;
  this.nbY = 12;
  this.size = 12;
  this.spaceX = 20;
  this.spaceY = 20;
  this.typeTransform = 0;//0 is scale - 1 is position
  this.scene = new THREE.Scene();
  this.camera();
  this.renderer();
  this.light();

  this.initShape();

  this.render();
};

threejs.prototype.camera = function camera() {
  this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, window.innerHeight * 2 );
  this.camera.position.y = 500;
  this.camera.position.z = 500;
  this.camera.position.x = 500;
  this.camera.updateProjectionMatrix();
  this.camera.lookAt(this.scene.position);
};

threejs.prototype.renderer = function renderer() {
  this.renderer = new THREE.WebGLRenderer({antialias: true});
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  this.renderer.setClearColor( 0x171718 , 1 );
  this.renderer.shadowMapEnabled = false;
  document.querySelector('.wrapper').innerHTML = '';
  document.querySelector('.wrapper').appendChild(this.renderer.domElement);
};

threejs.prototype.light = function light() {

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 60, 100, 20 );
  this.scene.add(light);

  var backLight = new THREE.DirectionalLight( 0xffffff, 1 );
  backLight.position.set( -60, 100, 20 );
  this.scene.add(backLight);
};

threejs.prototype.initShape = function initShape() {
  this.scene.remove(this.myArray);
  this.myArray = new THREE.Group();
  this.scene.add(this.myArray);

  for(var i = -this.nbX;i < this.size;i++){
    for(var j = -this.nbY;j < this.size;j++){
      var temp = new Cube(i * this.spaceX, j * this.spaceY, this.size, this.firstColor.toString('hex'));
      this.myArray.add(temp.shape);
    }
  }
};

threejs.prototype.render = function render() {
  requestAnimationFrame(this.render.bind(this));
  stats.begin();
  this.renderer.render(this.scene, this.camera);
  if(setup){
    data = new Uint8Array(player.fft.frequencyBinCount);
    player.fft.getByteFrequencyData(data);
    var maxValue = getMaxTableau(data);
    var minValue = getMinTableau(data);
    var tempC1 = new ColorMix.Color().fromHex(this.firstColor);
    var tempC2 = new ColorMix.Color().fromHex(this.secondColor);
    for ( var i = 0; i < player.fft.frequencyBinCount; i++){
      var value = data[i];
      if(i < this.myArray.children.length){
        var range2 = newRangeInteger(value, minValue, maxValue, 0, 100);
        var range1 = 100 - range2;
        if(range1 + range2 != 100){
          range1 = 100;
          range2 = 0
        }
        var newColor = ColorMix.mix([tempC1, tempC2], [range1, range2]).toString('hex');

        this.myArray.children[i].material.color.set(newColor);

        if(this.typeTransform == 0){
          var newScale = newRange(value, minValue, maxValue, 1,3);
          this.myArray.children[i].position.setY(0);
          this.myArray.children[i].scale.setY(newScale);
        }
        else{
          var newPosition = newRange(value, minValue, maxValue, 1,20);
          this.myArray.children[i].scale.setY(1);
          this.myArray.children[i].position.setY(newPosition);
        }
      }
    }
  }
  stats.end();
};
