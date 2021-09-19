# HTML-CSS-JS

## (21.9.19) prototype vs class

### 문법적 
```js
/**
 * Creating objects with Classes
 * Versus objects with prototypes
 * Since JavaScript is not a Class-based language
 * what is happening behind the class syntax?
 */

let PersonC = class {
  constructor(nm, id) {
    this.name = nm;
    this.id = id;
  }
  getDetails() {
    return `${this.name} :: ${this.id}`;
  }
};
let bob = new PersonC("Bob", 123);
console.log(bob.getDetails(), bob.name);

let EmployeeC = class extends PersonC {
  // EmployeeC prototype links to PersonC prototype
  constructor(nm, id, salary) {
    super(nm, id);
    this.salary = salary;
  }
  employeeInfo() {
    //exist on the prototype of EmployeeC
    return `${this.name} :: ${this.id} :: ${this.salary}`;
  }
};
let noomi = new EmployeeC("Noomi", 456, 8500000);
console.log(noomi.employeeInfo());

///////////////////////////////////////////////

let PersonP = function(nm, id) {
  this.name = nm;
  this.id = id;
};
PersonP.prototype.getDetails = function() {
  return `${this.name} :: ${this.id}`;
};
let fred = new PersonP("Fred", 321);
console.log(fred.getDetails(), fred.name);

let EmployeeP = function(nm, id, salary) {
  PersonP.call(this, nm, id);
  this.salary = salary;
};
Object.setPrototypeOf(EmployeeP.prototype, PersonP.prototype); //extends NOTE: THIS LINE WAS CHANGED
EmployeeP.prototype.employeeInfo = function() {
  return `${this.name} :: ${this.id} :: ${this.salary}`;
};
let mary = new EmployeeP("Mary", 654, 65000);
console.log(mary.employeeInfo());
```

### 요약
- 결국 class는 prototype으로 인터프리팅 된다.
- 자바스크립트의 객체지향은 prototype 기반이다.
- prototype은 prototype들의 link로 메모리를 더 효율적으로 사용한다.

### 참고링크
- https://www.youtube.com/watch?v=XoQKXDWbL1M
- https://gist.github.com/prof3ssorSt3v3/c056b8b5f379ee2767bb4e8ad90f3dac
- https://bkdevlog.netlify.app/posts/oop-class-of-js

### class 문법에 장점은 뭘까?
- https://ko.javascript.info/class

## (21.8.30) 숫자 배열 sort 시 주의사항
- sort() 를 바로 적용하면 숫자타입이더라도 문자 방식으로 정렬이 된다.
```
const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
```
- 의도한대로 오름차순 정렬을 하기 위해서는 comparator를 선언해야함
```
let numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);

// [1, 2, 3, 4, 5]
```

## (21.8.16) 콜백 대신 await 사용하기
- 콜백사용하는 경우
``` js
sqs.sendMessage(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

- async await, .promise()로 사용하는 경우
```js
try {
  const data = await sqs.sendMessage(params).promise();
  console.log(data); 
}
catch (err) {
  console.log(err, err.stack)
}
```

## (20.02.09) Prototype을 활용하여서 숫자에 콤마(,) 넣어주기

```
String.prototype.comma = function () {
    var arr = this.split(".");
    return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (typeof arr[1] != "undefined" ? "." + arr[1] : "");
};

Number.prototype.comma = function () {
    return this.toString().comma();
};
```

- 콤마(,)가 들어가면 String이어야 함으로 String에 .comma 프로퍼티를 만들고, Number에 이를 활용한 .comma 프로퍼티를 만든다.

## (20.02.08) Prototype을 활용하여서 String 객체를 숫자로 파싱하는 기능 추가하기

```
String.prototype.toNum = function () {
        var number = parseFloat(this.replace(/[^0-9.]/g, ""));
        return isNaN(number) ? 0 : number;
};
```

- 코드는 정규표현식을 사용하여서 문자열중 숫자만 발라내고 숫자로 변환하는 로직을 toNum이라는 프로퍼티에 저장한다.
- string 타입의 객체는 .toNum()을 이용하여서 숫자로 변환한다.

## (19.11.21) Prototype

- 자바스크립트는 프로토타입 프로그래밍이다. (일단 자바의 클래스랑 다르다는 것 정도만 기억하자)
- 프로토타입 그 자체로 객체다.
- 모든 객체들은 **prototype** 이라고 하는 프로퍼티를 자동으로 가지고 있다.

```
    function Super() {}
    Super.prototype.myProp = 'world';

    function Sub() {}
    Sub.prototype = new Super(); //이건 프로토타입방식의 상속문법이라고 생각하자. 프로토타입을 바로 넣어주면 안됨
```

- 이러한 방식이 상속을 구현하는 방식이다. 하위타입 프로토타입의 상위타입의 생성자를 넣어주자. (프로토타입을 넣으면 안됨)
- 실습파일 js/prototype/prototype.html

## (19.10.20) var, let, const 의 차이

- var : function-scoped, 가변적 (es5 이전 버전에서 사용)
- let : block-scoped, 가변적 (es6 이후 버전에서 사용)
- const : block-scoped, 불변적 (es6 이후 버전에서 사용)

## (19.10.19) (Ajax로) 동적 렌더링한 html에 이벤트 바인딩하기

### 1. jQuery (혹은 vanilla js)

- 방법1. 이벤트 바인딩 하는 코드를 렌더링 직후에 실행시킨다.
- 방법2. $(document).on(types, selector, fn)를 사용하여 바인딩 시킨다.
  ```
  $(document).on("click", '.js-request-data', function () {
              //do something
  });
  ```

### 2. jsViews를 사용하기

- 이벤트를 담고 있는 helpers를 별도로 선언하여서 바인딩 해주는 방식으로 구현한다.
- jsViews로 link()를 호출할때 이벤트 function을 같이 바인딩 시킨다,

```
    var tmpl = $.templates("#tmpl");

    var person = {};

    var helpers = {
        doSomething: function() {
            alert("do something");
        }
    }

    tmpl.link("#result", person, helpers); // Render and link the template
```

- https://www.jsviews.com/#link-events
- 실습파일 : jsRender/jsviews-dynamic-event-binding.html

## (19.10.18)

### ~~jQuery Templates plugin~~

- ~~다운로드 및 사용방법 https://github.com/BorisMoore/jquery-tmpl~~
- ~~실습파일 jquery-tmpl.html~~

### jsRender, jsView

- jQuery Templates Plugin은 jsRender로 대체 되었다. (같은 보리스 무어가 만들었다.)
- 공식사이트 ㅣ https://www.jsviews.com
- jsRender는 html을 렌더링 하는 라이브러리고, jsView는 렌더링된 html에 데이터를 바인딩 하는 라이브러리다.
- 실습파일 : jsRender/jsrender-exam.html
