
// base1모듈에서 제공해주는 각종 상수와 함수를 참조한다.
// 다른 모듈/설치된 노드 패키지의 기능 사용(참조)하기 위해서는 require(=import)라는 예약어를 사용함.
const {odd,even,test} = require("./base1.js");


// 숫자를 매개변수로 받아서 해당값이 홀수인지 짝수값인지 체크해서
// 홀수 > 홀수입니다, 짝수 > 짝수입니다. 라는 문자열을 바노한하는 함수
// 모든언어에서는 %는 특정값을 특정값으로 나눈 나머지값을 구할 때 사용
function checkOddOrEven(num){
  // 자바스크립트 불린형 true = 1, false = 0 과 동일
  if(num%2){
    return odd;
  }
  return even;
}


// var result = checkOddOrEven(10);
// console.log("10은" + result);
// console.log(`10이라는 숫자는 ${result}`);


// 모듈의 기능과 속성을 외부에 제공할 때는 {}객체로도 노출이 가능하고
// 단일 함수 형태도 바로 제공이 가능하다.
module.exports = checkOddOrEven;