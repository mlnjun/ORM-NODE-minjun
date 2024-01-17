


// 사용자 로그인 여부를 체크하고
// 미로그인 상태에서의 요청시 로그인 페이지로 이동처리 시킨다.
// 반드시 로그인은 한 상태에서만 호출되어야하는 각종 라우팅 메소드에서 설정해준다.
exports.isLoggedIn = (req, res, next)=>{
  if(req.session.loginUser != undefined){
    // 현재 사용자가 로그인 상태이면 요청한 라우팅 메소드로 이동시킨다.
    next();
  }else{
    res.redirect('/login');
  }
};


// 사용자가 로그인을 안한상태인 경우 특정 페이지로 이동시키기
// 만약에 이미 로그인 상태에서 회원가입 페이지에 대한 요청을 해오는경우 특정 페이지(메인)로 이동시키기
// 로그인을 안한 상태인경우만 요청한 라우팅 메소드로 이동시키기
exports.isNotLoggedIn = (req, res, next)=>{
  if(req.session.loginUser == undefined){
    // 현재 사용자가 로그인 상태가 아니면 요청한 라우팅 메소드의 콜백함수가 실행됨(회원가입)
    next();
  }else{
    res.redirect('/');  // 로그인 상태에 상관없이 모든 사용자가 볼 수 있는 메인 페이지
  }
}