[코코아톡 클론코딩 (노마드코더 HTML,CSS 초급)](https://nomadcoders.co/kokoa-clone)

# 2 LEARNING HTML
- HTML tag `<tagName attribute="value">content</tagName>`
- HTML 문서 형식
	```html
	<!DOCTYPE html>
	<html>
		<head>
			<!--보이지 않는 문서 정보들, 타이틀, charset, 파비콘, 검색엔진에 보여주는 정보들, opengraph 정보들 ...-->
  		</head>
		<body>
			<!--보여지는 문서 header, main, footer ...-->
		</body>
  	</html>
  	```

- html tag와 attribute를 사용할 때  MDN문서를 한번 확인해보자. 내가 생각지도 못한 기능을 제공해 줄지도 모른다.

- 의미론적 (semantic) 태그의 사용을 지향하자.
	- `<header>`는 `<div id="header">` 보다 의미론적이다.
	- `<main>`은 `<div id="main">`보다 의미론적이다.
	- `<footer>`, `<aside>`, `<address>`...


# 3 LEARNING CSS
## CSS 형식
```css
selector {
    property: property-value;
}
```
- [https://developer.mozilla.org/en-US/docs/Glossary/CSS_Selector](https://developer.mozilla.org/en-US/docs/Glossary/CSS_Selector)

## CSS (Cascading Style Sheet)
- Cascading : 폭포같은, 계속되는, 연속적인
- 위에서부터 아래로 읽어드린다는 뜻. 같은 element(tag)에게 css property가 중복된다면 가장 마지막(아래)에 위치한 property가 적용된다.
- (브라우저에서) 기본적으로 설정되는 style이 있다.  (user agent stylesheet) 이 설정은 가장 첫번째(위)에 위치하게 될 것이다.
    - 가장 마지막은 element에 직접 명시한 style이 된다.

## Block vs Inline
- Block은 box다. Inline은 box가 아니다.
    - 그러므로 Inline은 width, height와 같은 box가 갖는 속성(property)를 가질 수 없다.
    - Inline의 margin은 상하는 적용되지 않는다. 좌우만 적용된다.
- Block은 옆에 다른 요소들이 위치하지 못한다.
- Inline (= In the same line) 옆에 다른 요소들이 위치 할 수 있다.
- 대부분의 요소들은 Block이다. 기본적으로 Inline인 것은 a, span, img 정도뿐..

## Margin, Border, Padding
- Margin은 Border(경계)를 기준으로 바깥 여백이다.
- Padding은 Border(경계)를 기준으로 안쪽 여백이다.

## Collapsing margin 현상
- 여러 box들이 중첩되어 있는 경우, 큰 사이즈의 margin으로 통합되는 현상. 상하 마진에서만 나타난다.
- The top and bottom margins of blocks are sometimes combined (collapsed) into a single margin whose size is the largest of the individual margins (or just one of them, if they are equal), a behavior known as margin collapsing. Note that the margins of floating and absolutely positioned elements never collapse.
- [https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

## Inline-block vs flexblock
- 한줄에 여러 element들을 두고 싶은 경우 여기를 잘 봐야한다.
- inline-block은 Responsive Design(반응형 디자인)을 지원하지 않는다.
- inline block의 문제점을 flexblock가 해결한다.
- flex설정은 머리아프게 한다. 만약 다루고자하는 요소나 부모요소에 flex가 있다면 주의해야한다. 가능한 빨리 주변의 프론트엔드 개발자나 퍼블리셔한테 도움을 청하는게 좋을수 있다. 그게 힘들다면 반드시 알고 넘어가자.

### flexblock 사용 규칙
- 자식 엘리먼트에는 어떤 것도 적지 말아야 한다. 자식 엘리먼트를 움직이게 하려면 부모 엘리먼트를 flex container로 만들어야 한다.
- main-axis(주축) croess-axis(교차축)에 대한 개념을 알아야 한다.
    - `align-items` : cross axis에서 작용 (세로)
    - `justify-content` : main axis에서 작용 (가로)
    - `flex-direction` : 기본값은 row (column으로 변경가능)

## Position

- 요소를 어떤 방식으로 배치할 것인가?!
- positon: static (default)
    - 요소를 일반적인 문서 흐름에 따라 배치합니다. top, right, bottom, left, z-index 속성이 아무런 영향도 주지 않습니다. 기본값입니다
- position: relative;
    - 요소를 일반적인 문서 흐름에 따라 배치하고, 자기 자신을 기준으로 top, right, bottom, left의 값에 따라 오프셋을 적용합니다. 오프셋은 다른 요소에는 영향을 주지 않습니다. 따라서 페이지 레이아웃에서 요소가 차지하는 공간은 static일 때와 같습니다.
- position: absolute;
    - 요소를 일반적인 문서 흐름에서 제거하고, 페이지 레이아웃에 공간도 배정하지 않습니다. 대신 가장 가까운 위치 지정 조상 요소에 대해 상대적으로 배치합니다. 단, 조상 중 위치 지정 요소가 없다면 초기 컨테이닝 블록을 기준으로 삼습니다. 최종 위치는 top, right, bottom, left 값이 지정합니다.
- position: fixed
    - 요소를 일반적인 문서 흐름에서 제거하고, 페이지 레이아웃에 공간도 배정하지 않습니다. 대신 뷰포트의 초기 컨테이닝 블록을 기준으로 삼아 배치합니다.
- [https://developer.mozilla.org/ko/docs/Web/CSS/position](https://developer.mozilla.org/ko/docs/Web/CSS/position)

## Pseudo 시리즈
### Pseudo Selectors
- selector의 property
    ```css
    selector:pseudo-class {
      property: value;
    }
    ```

- ex) `:first-child`, `nth-child(3, even, odd, 2n +1)` ...
- [https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes)

### Pseudo Classes (State)
- `:hover` `:focus` 처럼 유저에 액션에 따른 셀렉터 지정
- 브라우저 개발자도구에서 State를 찾아 볼 수 있다.
- [https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

### Pseudo Elements
- 콜론(:)을 2개쓰는 Pseudo element도 있다.
    ```css
    selector::pseudo-element {
      property: value;
    }
    ```
- [https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements)

## Combinators

- 결국 가장 마지막에 명시된 요소에게 적용하겠다는 것! (`,` 로 구분하는건 여러개를 설정하겠다는 것이니 혼동 ㄴㄴ)
- `body article p` : p태그 조상중에 article이 있고, 그 조상중에 body가 있는 경우
- `article > p` : p태그 '부모'에 article이 있는 경우
- `h1 + p` : p태그 **바로 이전** 형제에 h1이 있는 경우
- `h1 ~ p` : p태그 이전 형제에 h1이 있는 경우
- [https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators)

## Attribute Selector

- **내가 생각하는것보다 selector의 기능이 많구나! → 보편적인 셀렉팅이라고 생각된다면 반드시 문서를 확인해보고 무의미한 class, id를 최대한 줄여보자**
- Example
    - `a[title]` : Matches elements with an attr attribute.
    - `a[href="[https://example.com](https://example.com/)"]` : Matches elements with an attr attribute whose value is exactly value
    - `p[class~="special"]` : Matches elements with an attr attribute whose value is exactly value, or contains value in its (space separated) list of values.
- [https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors)