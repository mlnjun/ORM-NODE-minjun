// 콜백함수의 한계 : 콜백지옥 > promise > async/await
// 콜백함수의 콜백 지옥을벗어나 자유롭게 비동기 프로그래밍 환경에서
// 순차/절차 기반 프로그래밍을 손쉽게 할 수 있다.

// 관리하기가 힘들어진다.
var fnHell = function(){
  console.log("로직1 완료");

  // 2번째로직 구현함수;
  setTimeout(function(){
    console.log("로직2 완료");
    
    // 3번째로직 구현함수;
    setTimeout(function(){
      console.log("로직3 완료");

      // 4번째로직 구현함수;
      setTimeout(function(){
        console.log("로직4 완료");

          // 5번째로직 구현함수;
        setTimeout(function(){
          console.log("로직5 완료");

        },1000)

      },1000)

    },1000);

  },1000);

}


// fnHell();



var fnHeaven = function(){
  console.log("로직1 완료");
  
  // 2번째로직 구현함수;
  setTimeout(function(){
    console.log("로직2 완료");
  },1000)

  // 3번째로직 구현함수;
  setTimeout(function(){
    console.log("로직3 완료");
  },2000)

  // 4번째로직 구현함수;
  setTimeout(function(){
    console.log("로직4 완료");
  },3000);

  // 5번째로직 구현함수;
  setTimeout(function(){
    console.log("로직5 완료");
  },4000);

}

fnHeaven();