// 그룹 초대 회원정보 리스트
var inviteMembers = [];
// 그룹 프로필 이미지 파일
var profilePath = "";


// 그룹 생성 정보 초기화
$('#startCreateGroupBtn').click(function(){
  // 초대 목록 초기화
  inviteMembers = [];
  $('#invitedUser').html("");

  // 프로필 이미지 초기화 
  $("#groupImg").attr('src', "/img/group2.svg");
});

// 그룹 채팅 유저 초대
$('#inviteUserBtn').click(function(){

  var inviteEmail = {
    email:$('#inviteEmail').val(),
  };

  if(inviteEmail != ""){
    

    $.ajax({
      type:"POST",
      url:"/api/member/invite",
      dataType:"json",
      data:inviteEmail,
      success:function(result){
        
        if(result.code == 200){

          var isDoubleData = inviteMembers.filter(v => v.member_id == result.data.member_id)

          if(isDoubleData.length == 0){
            // 중복 초대 X > 정상로직

            inviteMembers.push(result.data);

            // 초대한 유저 UI html 태그
            var invitedTag = `<div class="stacked-user">
            <img src="img/user21.png" alt="User" />
            <span class="delete-user">
              <img src="${result.data.profile_img_path}" alt="Remove User" />
            </span>
            </div>`;
  
            $('#invitedUser').append(invitedTag);
          }else{
            // 초대 목록에 동일 유저 존재
            alert("동일한 유저를 이미 초대목록에 넣었습니다.");
            $('#inviteEmail').focus();
          }

        }else if(result.code == 400){
          alert(result.msg);
        }else if(result.code == 500){
          alert(result.msg);
        }
      },
      error:function(err){
        console.log("백엔드 API호출 에러", err)
      }
    })

  }else{
    // 이메일 입력값 존재X
    alert("초대하고 싶은 사람의 email을 입력하세요");
    $('#inviteEmail').focus();
  }

  return false;
});


// 그룹 채팅 프로필 이미지 선택시 미리보기
$('#groupProfileImg').change(function(event){

  // 파일 이미지 태그에 올려주기
  // FileReader Class 객체 만들기
  var reader = new FileReader();

  // img태그에 파일이 올라가 있는지 확인 후 콜백함수 실행
  reader.onload = function(e) {
    // img 태그 src속성에 파일 URL 전달
    $("#groupImg").attr('src', e.target.result);
  };
  
  // 이미지 파일을 URL형식으로 읽는다.(비동기)
  reader.readAsDataURL(this.files[0]);

  return false;
});



// 그룹 채팅방 생성
$('#createGroupBtn').click( function (){

  // 프로필 이미지 파일 가져오기
  var file = $("#groupProfileImg")[0].files[0];

  // 프로필 이미지 파일 존재시 > 파일보내고, 경로 받아오기
  // 존재하지 않을 시 > 디폴트 파일 경로 지정해주기
  if(!file){
    // 프로필 파일 존재하지 않음 > 디폴트 프로필 이미지 사용
    profilePath = "/img/group2.svg";
    
  }else{
    // 프로필 파일 존재 > 서버에 파일 보내주기
    
    // 프로필 이미지 파일 보내기
    // FormData 클래스 객체 생성
    var data = new FormData();
  
    // 프로필 이미지 파일 받기
    data.append("file", $("input[name=file]")[0].files[0]);

  
    // ajax로 프로필 이미지 파일 보내기
    $.ajax({
      data:data,
      type:"POST",
      url:"/api/channel/uploadprofile",
      cache: false,
      contentType: false,
      processData: false,
      success:function(result){
        if(result.code == 200){

          // 파일 경로 전역변수에 받기
          profilePath = result.data.filePath;
          alert('파일 업로드 성공');

        }else if(result.code == 400){
          alert(result.msg);
        }else if(result.code == 500){
          alert(result.msg);
        }
      },
    });
  };


  // // 그룹 채널 생성하기
  // if(inviteMembers.length > 0){
  //   // 데이터
  //   let channelData = {
  //     profilePath,
  //     inviteMembers,
  //     channelName: $("#channelName").val()
  //   };


  //   // ajax로 채널 생성
  //   $.ajax({
  //     type:"POST",
  //     url:"/api/channel/addchatgroup",
  //     dataType:"json",
  //     data: JSON.stringify(channelData),
  //     success:function(result){
  //       if(result.code == 200){
  //         alert(result.msg);
  //       }else if(result.code == 400){
  //         alert(result.msg);
  //       }else if(result.code == 500){
  //         alert(result.msg);
  //       }
  //     }
  //   });
  // }

});