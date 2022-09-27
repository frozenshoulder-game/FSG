let video;
let poseNet;
let pose;
let skeleton;
let brain;

let targetLabel='U';
let poseLabel;
let countershow=0;
let count=0;
let round;
let s1='p';
let s2='z';

function setup() {
  createCanvas(640, 480); //畫面長寬比
  video = createCapture(VIDEO); //載入鏡頭
  video.hide(); //隱藏第2畫面
  poseNet = ml5.poseNet(video, modelLoaded);//引入posenet
  poseNet.on('pose',getPoses);//載入posenet姿勢辨識
  
   let options ={//辨識設定
    
    input: 34,//34個keypoint的xy
    outputs: 3,//指定姿勢種類
    task: 'classification',//為類別辨識
    debug: true
  }
  
  brain=ml5.neuralNetwork(options);//將設定載入neuralNetwork 
  //brain.normalizeData();//將資料設定與攝影機畫面匹配
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',//將模型放入載入位置
  };
  brain.load(modelInfo, modelReady);//載入模型
  //brain.loadData('hand.json',dataReady);//將json資料集載入訓練function
}
function modelReady(){
  console.log('pose classification ready!');//確認載入模型
  classifyPose();
}

function classifyPose(){
  if(pose){
    let inputs=[];
    for(let i=0;i<pose.keypoints.length;i++){
      let x=pose.keypoints[i].position.x;
      let y=pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
      }
    brain.classify(inputs,gotResult);//將pose的資料比對後載入輸出
  }else{
    setTimeout(classifyPose,100);//等待1s重新執行
  }
}
function gotResult(error,results){
  poseLabel=results[0].label;//指定姿勢註解輸出
  //console.log(results[0].confidence);//信心度
  classifyPose();  
  
}  

/* dataReady(){
  brain.train({epochs:100},finished);//資料訓練
}


finished(){
  console.log('model trained');
  brain.save();//存儲模型
} */

function getPoses(poses){
  //console.log(poses);//輸出辨識之姿勢資料
   if (poses.length > 0){
    pose = poses[0].pose;//確認有1個pose以上的話將主要辨識的pose設定出來
    skeleton =poses[0].skeleton;//確認有1個pose以上的話將pose骨架設定出來
     
  }
}

function modelLoaded() {
  console.log('poseNet ready');//確認posenet引入
}

function draw() {
  
  push();//區隔畫面設定
  translate(video.width,0);//將畫面向右移到視窗外
  scale(-1,1);//將畫面朝x軸往回擴1倍
  image(video,0,0,video.width,video.height);//設定顯示畫面配合攝影機全域
  if(pose){
     for(let i=0;i<pose.keypoints.length;i++){
      let x=pose.keypoints[i].position.x;//使用keypoint做顯示需要使用position才能取得資料
      let y=pose.keypoints[i].position.y;
      fill(0);//設定圖型顏色
      ellipse(x,y,16);//設定圖型位置&大小
   }
    for(let i=0;i < skeleton.length ;i++){
      let a=skeleton[i][0];//無連起始點
      let b=skeleton[i][1];//連接結束
      strokeWeight(2);//線寬度
      stroke(255);//線顏色
      line(a.position.x,a.position.y,b.position.x,b.position.y);//將各點連接
    }
  }
  if(circlecount > 0 && timecount <= 0 && a == 3){
  if(poseLabel != s1 && poseLabel != s2 && s1!=s2){
    s1 = poseLabel;
    s2=s1;
    count++;
  }
  if(poseLabel != s1 && poseLabel != s2  && s1==s2){
    s2=poseLabel;
    count++;
  }
  if(poseLabel == s1 && poseLabel != s2 && s1!=s2){
    count++;
  }

  if(count>=3){
    countershow++;
    fishing();
    count=0;
    s1='p';
    s2='z';
    
  }
  }else if(circlecount == 0 && timecount > 0){
    return;
  }
  pop();
  fill(255,255,0);
  noStroke();//去邊
  textSize(100);//大小設定
  textAlign(CENTER,CENTER);//位置設定
  text(poseLabel,width/2,height/2);//顯示文字
  text(countershow,width/3,height/3);//顯示文字
}

var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
}

var cursors;
var a = 0;
var timecount = 5;
var start_text;
var rod;
var numfish = ['5', '10'];
var random_num = Math.floor(Math.random()*numfish.length);
var circlecount;
var cc;
var circleText;
var score = 0;
var scoreText;
var itroText_name_wu;
var itroText_weight_wu;
var itroText_name_chi;
var itroText_weight_chi;
var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('beach', 'assets/beach.png');
  this.load.image('circle', 'assets/轉圈.png');
  /* this.load.spritesheet('fishing_rod', 'assets/fishing_rod.png',{frameWidth:864, frameHeight:1080}); */
  this.load.spritesheet('fishing_rod', 'assets/fishing_rod2.png',{frameWidth:1120, frameHeight:1400});
  this.load.spritesheet('fishing_rodup', 'assets/fishing_rod3.png',{frameWidth:1120, frameHeight:1400});
  this.load.image('popup', 'assets/介面.png');
  this.load.image('fish_wu', 'assets/吳郭魚.png');
  this.load.image('fish_chi', 'assets/旗魚.png');
  this.load.image('how_play01', 'assets/動作介紹1.png');
  this.load.image('how_play02', 'assets/動作介紹2.png');
  this.load.image('how_play03', 'assets/玩法介紹.png');
  this.load.image('timebkg', 'assets/圓底.png');
  this.load.video('lv1_video', 'assets/鐘擺運動.mp4', 'loadeddata', false, true);
}

function create ()
{
  cursors = this.input.keyboard.createCursorKeys();
  
  this.add.image(960, 540, 'beach');
  this.add.image(1450, 100, 'circle');
  /* rod = this.add.sprite(1095, 640, 'fishing_rod'); */
  rod = this.add.sprite(1100, 660, 'fishing_rod');
  rodup = this.add.sprite(1080, 700, 'fishing_rodup');
  rodup.visible = false;
  this.anims.create({
    key: 'roll',
    frames: this.anims.generateFrameNumbers('fishing_rod', { start: 0, end: 4}),
    frameRate: 5,
    repeat: 0
  });
  this.anims.create({
    key: 'pull',
    frames: this.anims.generateFrameNumbers('fishing_rodup', { start: 0, end: 3}),
    frameRate: 4,
    repeat: 0
  });

  how_play03 = this.add.image(960, 540, 'how_play03');
  how_play02 = this.add.image(960, 540, 'how_play02');
  lv1_video = this.add.video(1280, 540,'lv1_video');
  how_play01 = this.add.image(960, 540, 'how_play01');
  how_play02.visible = false;
  how_play03.visible = false;
  lv1_video.visible =false;

  timebkg = this.add.image(960, 520, 'timebkg');
  timebkg.visible = false;
  count_text = this.add.text(910, 410, timecount , { font: '200px Tanuki-Permanent-Marker', fill: '#fff' });
  count_text.visible =false;
  start_text = this.add.text(820, 470, '開始！', {font: '120px Tanuki-Permanent-Marker', fill: '#fff'});
  start_text.visible = false;

  scoreText = this.add.text(80, 70, '累積圈數： 0', { font: '60px Tanuki-Permanent-Marker', fill: '#fff' });
  
  circlecount = numfish[random_num];
  cc = circlecount;
  circleText = this.add.text(1550, 65, '旋轉 × ' + circlecount, { font: '60px Tanuki-Permanent-Marker', fill: '#fff' });

  popup = this.add.image(960, 540, 'popup');
  popup.visible = false;
  great = this.add.text(830, 200, '釣到了！', {font: '70px Tanuki-Permanent-Marker', fill: '#ED1C24'});
  great.visible = false;
  
  fish_wu = this.add.image(720, 540, 'fish_wu');
  fish_wu.visible = false;
  itroText_name_wu = this.add.text(1150, 470, '魚種：台灣鯛', {font: '50px Tanuki-Permanent-Marker', fill: '#000'});
  itroText_name_wu.visible = false;
  itroText_weight_wu = this.add.text(1150, 580, '重量：0.65kg', {font: '50px Tanuki-Permanent-Marker', fill: '#000'});
  itroText_weight_wu.visible = false;

  fish_chi = this.add.image(720, 540, 'fish_chi');
  fish_chi.visible = false;
  itroText_name_chi = this.add.text(1150, 470, '魚種：旗魚', {font: '50px Tanuki-Permanent-Marker', fill: '#000'});
  itroText_name_chi.visible = false;
  itroText_weight_chi = this.add.text(1150, 580, '重量：32kg', {font: '50px Tanuki-Permanent-Marker', fill: '#000'});
  itroText_weight_chi.visible = false;
}

function update ()
{
  if(cursors.space.isDown){
  if(a == 0){
    how_play01.destroy();
    how_play02.visible = true;
    lv1_video.visible = true;
    lv1_video.play(true);
    setTimeout(function(){
      a = 1;
    } ,200);
    return;
  }
  else if(a == 1){
    lv1_video.destroy();
    how_play02.destroy();
    how_play03.visible = true;
    lv1_video.setPaused(true);
    lv1_video.destroy();
    setTimeout(function(){
      a = 2;
    } ,200);
    return;
  }
  else if(a == 2){
    how_play03.destroy();
    setTimeout(function(){
      a = 3;
      timebkg.visible = true;
      count_text.visible = true;
    } ,200);
    return;
  }
}

  if(circlecount != 0){
    rod.visible = true;
    rodup.visible = false;

    popup.visible = false;
    great.visible = false;

    fish_wu.visible = false;
    itroText_name_wu.visible = false;
    itroText_weight_wu.visible = false;

    fish_chi.visible = false;
    itroText_name_chi.visible = false;
    itroText_weight_chi.visible = false;
  }
  if(timecount <= 0){
    timebkg.destroy();
    count_text.destroy();
    start_text.visible = true;
    setTimeout(function(){
      start_text.destroy();
    } ,1000);
  }
  else{
    count_text.setText('' + timecount);
  }
}


window.setInterval("fivesec()",1000);
function fivesec(){
  if(a == 3){
  setTimeout(function(){
    timecount--;
  } ,1000);
  }
}


function fishing ()
{
  if(countershow+1){
    rod.anims.play('roll', true);
  }

  score = countershow;
  scoreText.setText('累積圈數： ' + score);
  
  circlecount--;
  circleText.setText('旋轉 × ' + circlecount);
  
  if(circlecount == 0){
    setTimeout(function(){
    rod.visible = false;
    rodup.visible = true;
    rodup.anims.play('pull', true);
    getfish();
  } ,1000);
 }
}

function getfish ()
{

  setTimeout(function(){
    popup.visible = true;
    great.visible = true;
    if(cc == 5){
      fish_wu.visible = true;
      itroText_name_wu.visible = true;
      itroText_weight_wu.visible = true;
    }
    else if(cc ==10){
      fish_chi.visible = true;
      itroText_name_chi.visible = true;
      itroText_weight_chi.visible = true;
    }
  } ,1000);
  setTimeout(function(){
    numfish = ['5', '10'];
    random_num = Math.floor(Math.random()*numfish.length);
    circlecount = numfish[random_num];
    cc = circlecount;
    circleText.setText('旋轉 × ' + circlecount);
  } ,8000);
}

