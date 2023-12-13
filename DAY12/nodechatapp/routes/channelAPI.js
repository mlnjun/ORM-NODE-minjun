var express = require('express');
var router = express.Router();


/*
- 채널/채팅 정보 관리 RESTful API 라우팅 기능 제공
http://localhost:3000/api/channel
*/

let channelData = [
  {
    chName : "A",
    chDescription : "A 채널",
    chid : 1
  },
  {
    chName : "B",
    chDescription : "B 채널",
    chid : 2
  },
  {
    chName : "C",
    chDescription : "C 채널",
    chid : 3
  }
]


// 회원 정보 관리 RESTful API 라우팅 기능 제공
router.get('/all',async(req, res)=>{
  res.json(channelData);
});


router.post('/create',async(req,res)=>{
  var chName = req.body.chName;
  var chDescription = req.body.chDescription;
  var chid = req.body.chid;


  var newChdata = {
    chName,
    chDescription,
    chid
  }


  channelData.push(newChdata);


  // DB에 데이터 저장


  // 저장 후 
  res.json(channelData);

})


// http://localhost:3000/api/channel/modify
router.post('/modify',async(req,res)=>{
  let {chName, chDescription, chid} = req.body;


  let modifyChdata = {
    chName,
    chDescription,
    chid
  }

  channelData.push(modifyChdata);


  res.json(channelData);

})


// 채널 삭제
// http://localhost:3000/api/channel/delete
router.post('/delete',async(req,res)=>{
  let chid = req.body.chid;

  
  let index

  for(let i = 0; i<channelData.length; i++){
    if(channelData[i].chid == chid){
      channelData.splice(i, 1);
      // console.log(channelData[i]);j
      res.json(channelData);
      index = i;
      break;
    }
  }


  if(channelData[index] == undefined){
    res.send("해당 계정은 존재하지 않습니다.");
  }
});



// http://localhost:3000/api/channel/cid
router.get('/cid',async(req, res)=>{
  let chName = req.body.chName;


  for(let i = 0; i<channelData.length; i++){
    if(channelData[i].chName == chName){
      res.json(channelData[i]);
      break;
    }else{
      res.send("해당 채널은 존재하지 않습니다.");
      break;
    }
  }

})



module.exports = router;
