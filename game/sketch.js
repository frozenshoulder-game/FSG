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
    model: 'model/model (3).json',
    metadata: 'model/model_meta (3).json',
    weights: 'model/model.weights (3).bin',//將模型放入載入位置
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

function dataReady(){
  brain.train({epochs:100},finished);//資料訓練
}


function finished(){
  console.log('model trained');
  brain.save();//存儲模型
}

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
  if(poseLabel == 'r'){
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
}
  if(count>=3){
      countershow++;
      count=0;
      s1='p';
      s2='z';
  }
  pop();
  fill(255,255,0);
  noStroke();//去邊
  textSize(100);//大小設定
  textAlign(CENTER,CENTER);//位置設定
  text(poseLabel,width/2,height/2);//顯示文字
  text(countershow,width/3,height/3);//顯示文字
}