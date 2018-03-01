// var tile;
var grid;
var rotateList;
var moveList;
var counter;
var currentRotationPosition;
var currentRotation;

// constructor(pTileSize, pPositionX, pPositionY, pColorLeft=5, pColorTop=5, pColorRight=5, pColorBottom=5, pColorRotation=0)

function setup() {
  createCanvas(displayWidth, displayHeight);
  // tile = new Tile(120, 60, 60, color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), 1);
  grid = new Grid(50, 50);
  
  fillRotateList();
  fillMoveList();
  counter = 0;
  currentRotationPosition = rotateList.length - 1;
  currentRotation = 0;

  // rotateList[0].rotate(1);
}

function draw() {
  background(this.grid.buit);

  stroke(0,0,0);
  fill(23, 32, 42);
  rect(this.grid.offsetX * 0.5, this.grid.offsetY * 0.5, this.grid.offsetX + grid.tileSize * 9, this.grid.offsetY + grid.tileSize * 6);
  // tile.show();
  // grid.playfield[0][0].rotate();
  // counter++;
  // if(counter % 10 == 0) {
  //   for(var i = 0; i < rotateList.length; i++) {
  //     rotateList[i].rotate((rotateList[i].rotationState + 1) % 4);
  //   }
  // }

  if(currentRotation == 4) {
    currentRotation = 0;
    if(currentRotationPosition > 0) {
      currentRotationPosition--;
    }
  }
  rotateList[currentRotationPosition].rotate(currentRotation);
  currentRotation++;

  grid.show();
  
}

function fillRotateList(){
  rotateList = [];

  let element0 = new RotableElement(0, 0, 0, 0);
  element0.addToList();
  let element1 = new RotableElement(0, 3, 1, 0);
  element1.addToList();
  let element2 = new RotableElement(0, 4, 2, 0);
  element2.addToList();
  let element3 = new RotableElement(1, 1, 3, 0);
  element3.addToList();
  let element4 = new RotableElement(1, 7, 4, 0);
  element4.addToList();
  let element5 = new RotableElement(2, 1, 5, 0);
  element5.addToList();
  let element6 = new RotableElement(2, 6, 6, 0);
  element6.addToList();
  let element7 = new RotableElement(3, 2, 7, 0);
  element7.addToList();
  let element8 = new RotableElement(3, 7, 8, 0);
  element8.addToList();
  let element9 = new RotableElement(4, 1, 9, 0);
  element9.addToList();
  let element10 = new RotableElement(4, 7, 10, 0);
  element10.addToList();
  let element11 = new RotableElement(5, 4, 11, 0);
  element11.addToList();
  let element12 = new RotableElement(5, 5, 12, 0);
  element12.addToList();
  let element13 = new RotableElement(5, 8, 13, 0);
  element13.addToList();
}

function fillMoveList() {
  moveList = [];
}


class RotableElement {
  constructor(pRow,pColumn,pPlace,pRotationState) {
    this.row = pRow;
    this.column = pColumn;
    this.place = pPlace;
    this.rotationState = pRotationState;
    this.rotated = false;
  }

  addToList() {
    rotateList[this.place] = this;
  }

  rotate(pState) {
    this.rotationState = pState;
    this.rotated = true;
  }
}

class Tile {

  constructor(pTileSize, pPositionX, pPositionY, pColorLeft, pColorTop, pColorRight, pColorBottom, pRotation=0) {
      this.tileSize = pTileSize;
      this.positionX = pPositionX;
      this.positionY = pPositionY;
      this.left = pColorLeft;
      this.top = pColorTop;
      this.right = pColorRight;
      this.bottom = pColorBottom;
      this.rotation = pRotation;
      this.state = 0;
  }

  show(){

    // Left
      // Set colors
      stroke(this.left);
      fill(this.left);

      // A triangle
      triangle(this.positionX, this.positionY, this.positionX - (this.tileSize / 2.0), this.positionY - (this.tileSize / 2.0), this.positionX - (this.tileSize / 2.0), this.positionY + (this.tileSize / 2.0));

    // Top
      // Set colors
      stroke(this.top);
      fill(this.top);

      // A triangle
      triangle(this.positionX, this.positionY, this.positionX + (this.tileSize / 2.0), this.positionY - (this.tileSize / 2.0), this.positionX - (this.tileSize / 2.0), this.positionY - (this.tileSize / 2.0));

    // Right
      // Set colors
      stroke(this.right);
      fill(this.right);

      // A triangle
      triangle(this.positionX, this.positionY, this.positionX + (this.tileSize / 2.0), this.positionY + (this.tileSize / 2.0), this.positionX + (this.tileSize / 2.0), this.positionY - (this.tileSize / 2.0));

    // Bottom
      // Set colors
      stroke(this.bottom);
      fill(this.bottom);

      // A triangle
      triangle(this.positionX, this.positionY, this.positionX - (this.tileSize / 2.0), this.positionY + (this.tileSize / 2.0), this.positionX + (this.tileSize / 2.0), this.positionY + (this.tileSize / 2.0));


      if(this.rotation == 1){
        stroke(15);
        fill(15);
        ellipse(this.positionX, this.positionY, this.tileSize / 2.0, this.tileSize / 2.0);
      }
  }

  rotate(pState){
    var temp;
    var diff = (4 + pState - this.state) % 4;
    switch(diff){
      case 1:
        temp = this.left;
        this.left = this.top;
        this.top = this.right;
        this.right = this.bottom;
        this.bottom = temp;
        break;
      case 2:
        temp = this.left;
        this.left = this.right;
        this.right = temp;
        temp = this.top;
        this.top = this.bottom;
        this.bottom = temp; 
        break;
      case 3:
        temp = this.left;
        this.left = this.bottom;
        this.bottom = this.right;
        this.right = this.top;
        this.top = temp;
        break;
    }
    this.state = pState;
  }
}

class Grid {

  constructor(pOffsetX, pOffsetY) {

    this.offsetX = pOffsetX;
    this.offsetY = pOffsetY;
    this.playfield = [];
    this.tileSize = 80;

    this.groc = color(241, 196, 15);
    this.verd = color(40, 180, 99);
    this.blauClar = color(174, 214, 241);
    this.blauFosc = color(21, 67, 96);
    this.lila = color(91, 44, 111);
    this.buit = color(214, 219, 223);
  
    this.clearPlayfield();
  }

  clearPlayfield() {

    //Primer hi posem 0;
    for (var rowCount=0; rowCount < 6; rowCount++) {
      this.playfield[rowCount] = [];
        for (var colCount=0; colCount < 9; colCount++) {
          this.playfield[rowCount][colCount] = '0';
        }
    }

    // Fila 0
    this.playfield[0][0] = new Tile(this.tileSize, this.tileSize * 0.5 + this.offsetX, this.tileSize * 0.5 + this.offsetY, this.verd, this.groc, this.lila, this.lila, 1);
    this.playfield[0][1] = new Tile(this.tileSize, this.tileSize * 1.5 + this.offsetX, this.tileSize * 0.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[0][3] = new Tile(this.tileSize, this.tileSize * 3.5 + this.offsetX, this.tileSize * 0.5 + this.offsetY, this.lila, this.lila, this.verd, this.verd, 1);
    this.playfield[0][4] = new Tile(this.tileSize, this.tileSize * 4.5 + this.offsetX, this.tileSize * 0.5 + this.offsetY, this.blauFosc, this.lila, this.lila, this.blauFosc, 1);
    this.playfield[0][6] = new Tile(this.tileSize, this.tileSize * 6.5 + this.offsetX, this.tileSize * 0.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);

    // Fila 1
    this.playfield[1][1] = new Tile(this.tileSize, this.tileSize * 1.5 + this.offsetX, this.tileSize * 1.5 + this.offsetY, this.blauFosc, this.verd, this.blauFosc, this.blauFosc, 1);
    this.playfield[1][2] = new Tile(this.tileSize, this.tileSize * 2.5 + this.offsetX, this.tileSize * 1.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[1][3] = new Tile(this.tileSize, this.tileSize * 3.5 + this.offsetX, this.tileSize * 1.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[1][6] = new Tile(this.tileSize, this.tileSize * 6.5 + this.offsetX, this.tileSize * 1.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[1][7] = new Tile(this.tileSize, this.tileSize * 7.5 + this.offsetX, this.tileSize * 1.5 + this.offsetY, this.lila, this.verd, this.blauClar, this.blauClar, 1);

    // Fila 2
    this.playfield[2][0] = new Tile(this.tileSize, this.tileSize * 0.5 + this.offsetX, this.tileSize * 2.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[2][1] = new Tile(this.tileSize, this.tileSize * 1.5 + this.offsetX, this.tileSize * 2.5 + this.offsetY, this.lila, this.verd, this.blauFosc, this.lila, 1);
    this.playfield[2][3] = new Tile(this.tileSize, this.tileSize * 3.5 + this.offsetX, this.tileSize * 2.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[2][4] = new Tile(this.tileSize, this.tileSize * 4.5 + this.offsetX, this.tileSize * 2.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[2][5] = new Tile(this.tileSize, this.tileSize * 5.5 + this.offsetX, this.tileSize * 2.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[2][6] = new Tile(this.tileSize, this.tileSize * 6.5 + this.offsetX, this.tileSize * 2.5 + this.offsetY, this.lila, this.verd, this.blauClar, this.blauClar, 1);
    this.playfield[2][8] = new Tile(this.tileSize, this.tileSize * 8.5 + this.offsetX, this.tileSize * 2.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);

    // Fila 3
    this.playfield[3][0] = new Tile(this.tileSize, this.tileSize * 0.5 + this.offsetX, this.tileSize * 3.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[3][2] = new Tile(this.tileSize, this.tileSize * 2.5 + this.offsetX, this.tileSize * 3.5 + this.offsetY, this.verd, this.verd, this.blauFosc, this.blauFosc, 1);
    this.playfield[3][3] = new Tile(this.tileSize, this.tileSize * 3.5 + this.offsetX, this.tileSize * 3.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[3][4] = new Tile(this.tileSize, this.tileSize * 4.5 + this.offsetX, this.tileSize * 3.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[3][5] = new Tile(this.tileSize, this.tileSize * 5.5 + this.offsetX, this.tileSize * 3.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[3][7] = new Tile(this.tileSize, this.tileSize * 7.5 + this.offsetX, this.tileSize * 3.5 + this.offsetY, this.blauFosc, this.blauFosc, this.blauFosc, this.blauFosc, 1);
    this.playfield[3][8] = new Tile(this.tileSize, this.tileSize * 8.5 + this.offsetX, this.tileSize * 3.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);

    // Fila 4
    this.playfield[4][1] = new Tile(this.tileSize, this.tileSize * 1.5 + this.offsetX, this.tileSize * 4.5 + this.offsetY, this.blauFosc, this.lila, this.lila, this.blauFosc, 1);
    this.playfield[4][2] = new Tile(this.tileSize, this.tileSize * 2.5 + this.offsetX, this.tileSize * 4.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[4][5] = new Tile(this.tileSize, this.tileSize * 5.5 + this.offsetX, this.tileSize * 4.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[4][6] = new Tile(this.tileSize, this.tileSize * 6.5 + this.offsetX, this.tileSize * 4.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[4][7] = new Tile(this.tileSize, this.tileSize * 7.5 + this.offsetX, this.tileSize * 4.5 + this.offsetY, this.blauClar, this.blauClar, this.blauFosc, this.blauFosc, 1);

    // Fila 5
    this.playfield[5][2] = new Tile(this.tileSize, this.tileSize * 2.5 + this.offsetX, this.tileSize * 5.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[5][4] = new Tile(this.tileSize, this.tileSize * 4.5 + this.offsetX, this.tileSize * 5.5 + this.offsetY, this.blauFosc, this.blauFosc, this.verd, this.groc, 1);
    this.playfield[5][5] = new Tile(this.tileSize, this.tileSize * 5.5 + this.offsetX, this.tileSize * 5.5 + this.offsetY, this.blauClar, this.blauFosc, this.blauFosc, this.blauClar, 1);
    this.playfield[5][7] = new Tile(this.tileSize, this.tileSize * 7.5 + this.offsetX, this.tileSize * 5.5 + this.offsetY, this.buit, this.buit, this.buit, this.buit, 0);
    this.playfield[5][8] = new Tile(this.tileSize, this.tileSize * 8.5 + this.offsetX, this.tileSize * 5.5 + this.offsetY, this.blauClar, this.blauClar, this.blauClar, this.blauClar, 1);
    // console.log(this.playfield);
  }

  show(){
    // Mirem si hi han figures rotades.
    for(var a = 0; a < rotateList.length; a++) {
      if(rotateList[a].rotated){
        this.playfield[rotateList[a].row][rotateList[a].column].rotate(rotateList[a].rotationState);
        rotateList[a].rotated = false;
      }
    }

    // Pintem el grid per pantalla.
    for(var i = 0; i < 6; i++) {
      for(var j = 0; j < 9; j++) {
        if(this.playfield[i][j] != '0') {
          this.playfield[i][j].show();
        }
      }
    }
    
  }
}
