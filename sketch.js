let skyImgs = [];
let fieldImgs = [];
let treeImgs = [];
let extraImgs = []; 

let currentSky;
let currentField;
let skyTint;
let fieldTint;

let currentTrees = [];
let currentTreeImg;

let currentExtraImg;  
let currentExtras = []; 
let activeButton = null; 
let greenButton, snowButton, palmButton, rockButton, birdButton,eagleButton;

function preload(){
  // skies
  skyImgs.push(loadImage("night.jpg"));
  skyImgs.push(loadImage("day.jpg"));
  skyImgs.push(loadImage("sunset.jpg"));

  // fields
  fieldImgs.push(loadImage("Grass field.png"));
  fieldImgs.push(loadImage("winter field.png"));
  fieldImgs.push(loadImage("beach.png"));

  // trees
  treeImgs.push(loadImage("greenTree.png")); 
  treeImgs.push(loadImage("snowTree.png"));  
  treeImgs.push(loadImage("palm tree.png")); 

  // extras 
  extraImgs.push(loadImage("birdFlying.png"));
  extraImgs.push(loadImage("rock.png"));  
   extraImgs.push(loadImage("egaleflying.png"));    
}


function setup() {
  createCanvas(600, 500);
  imageMode(CENTER);

  randomizeSky();
  randomizeField();

  /////// Tree buttons ////////
  greenButton = createButton("🌳");
  greenButton.position(width - 10, 130);
  greenButton.style("font-size", "20px");
  greenButton.style("padding", "10px");
  greenButton.mousePressed(() => {
    currentTreeImg = treeImgs[0];
    currentExtraImg = null; 
    setActiveButton(greenButton);
  });

  snowButton = createButton("❄");
  snowButton.position(width - 10, 190);
  snowButton.style("font-size", "20px");
  snowButton.style("padding", "10px");
  snowButton.mousePressed(() => {
    currentTreeImg = treeImgs[1];
    currentExtraImg = null;
    setActiveButton(snowButton);
  });

  palmButton = createButton("🌴");
  palmButton.position(width - 10,250);
  palmButton.style("font-size", "20px");
  palmButton.style("padding", "10px");
  palmButton.mousePressed(() => {
    currentTreeImg = treeImgs[2];
    currentExtraImg = null;
    setActiveButton(palmButton);
  });

  ////// Extra buttons //////////
  rockButton = createButton("🪨");
  rockButton.position(width - 10, 310);
  rockButton.style("font-size", "20px");
  rockButton.style("padding", "10px");
  rockButton.mousePressed(() => {
    currentExtraImg = extraImgs[1];
    currentTreeImg = null; 
    setActiveButton(rockButton);
  });

  birdButton = createButton("🐦");
  birdButton.position(width - 10, 370);
  birdButton.style("font-size", "20px");
  birdButton.style("padding", "10px");
  birdButton.mousePressed(() => {
    currentExtraImg = extraImgs[0];
    currentTreeImg = null;
    setActiveButton(birdButton);
  });

 eagleButton = createButton("🦅");  
  eagleButton.position(width - 10, 430);
  eagleButton.style("font-size", "20px");
  eagleButton.style("padding", "10px");
  eagleButton.mousePressed(() => {
    currentExtraImg = extraImgs[2];  
    currentTreeImg = null;
    setActiveButton(eagleButton);
  });

}

function setActiveButton(btn) {
  [greenButton, snowButton, palmButton, rockButton, birdButton, eagleButton].forEach(b => {
    if (b) b.style("border", "2px solid transparent");
  });
  
  ///// highlight selected button
  btn.style("border", "3px solid yellow");
  activeButton = btn;
}

let showInstructions = false;

function keyPressed(){
  if (keyCode === UP_ARROW){
    randomizeSky();
  } else if (keyCode === DOWN_ARROW){
    randomizeField();
  } else if (key === 'q' || key === 'Q') {
    currentTrees = [];
    currentExtras = [];
    //console.log("All placed objects cleared!");
  } else if (key === 'i' || key === 'I') {
    showInstructions = !showInstructions; // toggle on/off
  }
}

function draw() {
  background(220);

  /////// draw sky ///////////
  image(currentSky, width/2, height/2, width, height);

  ////// draw field //////
  image(currentField, width/2, height/2, width, height);

  //////// draw trees //////
  for (let t of currentTrees){
    image(t.img, t.x, t.y, t.size, t.size * 1.5);
  }

  ////////// draw extras //////////
  for (let e of currentExtras){
    image(e.img, e.x, e.y, e.size, e.size);
  }

 // --- draw instructions overlay ---
  if (showInstructions) {
    fill(0, 180);  // semi-transparent black
    noStroke();
    rect(width/2 - 200, height/2 - 150, 400, 300, 25); // curved box

    fill(255);
    textAlign(CENTER, TOP);
    textSize(18);
    text("How to Play", width/2, height/2 - 130);

    textSize(14);
    textAlign(LEFT, TOP);
    let info = 
      "Arrow Up ⬆: Change sky view\n" +
      "Arrow Down ⬇: Change ground view\n" +
      "Press the buttons on the right trees can only be\n" +
      "place on the ground birds can be placed anywhere\n" +
      "Q: Clear all placed objects\n" +
      "I: Toggle this help menu";
    text(info, width/2 - 180, height/2 - 100);
  }
  
}


/////////////// RANDOMIZERS ////////////////
function randomizeSky(){
  currentSky = random(skyImgs);
  skyTint = random(180,255); 
}

function randomizeField(){
  currentField = random(fieldImgs);
  fieldTint = random(180,255);
}

/////////// INTERACTION //////////
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (currentTreeImg) {
      // only allow trees on y= 280 and higher
      if (mouseY >= 280) {
        currentTrees.push({
          img: currentTreeImg,
          x: mouseX,
          y: mouseY,
          size: random(80, 150) 
        });
      }
} else if (currentExtraImg) {
  if (currentExtraImg === extraImgs[0] || currentExtraImg === extraImgs[2]) {
    // bird or eagle place anywhere
    currentExtras.push({
      img: currentExtraImg,
      x: mouseX,
      y: mouseY,
      size: random(40, 120) 
    });
  } else if (currentExtraImg === extraImgs[1]) {
    // rock → only on y >= 280
    if (mouseY >= 280) {
      currentExtras.push({
        img: currentExtraImg,
        x: mouseX,
        y: mouseY,
        size: random(20, 100)
      });
        }
      }
    }
  }
  //console.log("Mouse clicked at X:", mouseX, "Y:", mouseY);
}
