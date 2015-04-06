function Cube(x, y, size, color) {
  this.geometry = new THREE.BoxGeometry( size, size, size );
  this.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, size / 2, 0 ) );
  this.material = new THREE.MeshLambertMaterial({color : color, shading: THREE.FlatShading});
  this.shape = new THREE.Mesh(this.geometry, this.material);
  this.shape.castShadow = false;
  this.shape.receiveShadow = false;
  this.shape.position.x = x;
  this.shape.position.z = y;
}
