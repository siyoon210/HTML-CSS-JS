[ReactJS로 영화 웹 서비스 만들기 (노마드 코더)](https://nomadcoders.co/react-fundamentals/lectures/1544)

# 0 INTRODUCTION
- 필요한 프로그램들 `npm`, `node.js`, `npx`
- 리액트는 수요가 많다. 
- Q) 리액트는 어떤 문제점을 해결하는 프레임워크 일까?

# 1 SETUP
## 1.0 Creating your first React App
- 프로젝트 생성
	- 생성을 원하는 디렉토리에서 `npx create-react-app movie-app`
	- 타입스크립트로 원한다면 `npx create-react-app app-name -—template typescript`\
	- https://velog.io/@junghyeonsu/React-create-react-app-Typescript-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC
- 프로젝트 실행
	- `cd movie-app`
	- `npm start`
- VSC로 프로젝트 바로열기
	- `code movie-app`
	- 혹은 그냥 VSC에서 open 해도 무관
- package.json 파일에 여러 기본 설정들이 되어있다.
	- 지금은 scripts의 start, build에만 집중하자.
- yarn.lock은 삭제

## 1.2 How does React work? 
- index.html에는 껍대기만 존재하고, src/App.js src/index.js를 통해서 HTML을 리액트가 생성하도록 했다.

# 2 JSX & PROPS
## 2.0 Creating your first React Component
- `Component`는 HTML 반환하는 함수다!
- 리액트의 모든 것은 Component로 이뤄져 있다.
- `JSX`는 Javascript + HTML이다. HTML 처럼 작성하고 중간에 JS코드를 넣고 싶다면 {...}를 쓴다.

```js
import React from "react"

function Potato() {
    return <h3>I love potato.</h3>;
}

export default Potato;
```
```js
import React from "react";
import Potato from "./Potato"

function App() {
  return (
    <div>
      Hello!
      <Potato />
    </div>
  )
}

export default App

```

## 2.1 Reusable Components with JSX + Props
- Component는 재사용이 가능하다. props 정보로 argument를 넣을 수 있다
```js
import React from "react"

function Food({ fav }) {
    return <h3>I love {fav}.</h3>
}

export default Food
```
```js
import React from "react";
import Food from "./Food"

function App() {
  return (
    <div>
      Hello!
      <Food fav="kimchi" />
      <Food fav="ramen" />
    </div>
  )
}

export default App
```

## 2.2 Dynamic Component Generation
- JS array의 map() 메서드를 활용한 컴포넌트 동적 생성
```js
import React from "react";
import Food from "./Food"

const foodILike = [{name: "kimchi"}, {name: "ramen"}, {name: "fried chicken"}]

function App() {
    return (
        <div>
            {foodILike.map((food) => {
                return <Food fav={food.name}/>
            })}
        </div>
    )
}

export default App
```

## 2.3 map recap
- `Warning: Each child in a list should have a unique "key" prop.`
- array component는 식별을 하기위한 'key'라는 값이 필요하다. 유니크값으로 'key'를 지정해준다면 에러가 발생하지 않는다.
```js
import React from "react";
import Food from "./Food"

const foodILike = [{id: 1, name: "kimchi"}, {id: 2, name: "ramen"}, {id: 3, name: "fried chicken"}]

function App() {
    return (
        <div>
            {foodILike.map((food) => {
                return <Food key={food.id} fav={food.name}/>
            })}
        </div>
    )
}

export default App
```

## 2.4 Protection with PropTypes
- prop-types 설치
	- `npm i prop-types`
- 자식 component에서 전달받은 props가 원하는 props가 맞는지 확인해준다.
- TypeScript를 사용할 수 있다면 TS가 더 나은 선택지
```js
import React from "react"
import PropTypes from "prop-types"

function Food({ fav }) {
    return <h3>I love {fav}.</h3>
}

Food.propTypes = {
    fav: PropTypes.string.isRequired
}

export default Food
```

- 공식문서 https://ko.reactjs.org/docs/typechecking-with-proptypes.html

# 3 STATE
## 3.0 Class Components and State
- Function Components vs Class Components
	> 함수형 컴포넌트는 클래스형 컴포넌트보다 선언하기가 좀 더 편하고, 메모리 자원을 덜 사용한다는 장점.
  
	> 클래스형 컴포넌트의 경우 state 기능 및 라이프 사이클 기능을 사용할 수 있으며 임의 메서드를 정의할 수 있다는 점이다.
  
	> 과거에는 클래스형 컴포넌트를 주로 사용했지만, 2019년 v16.8 부터 함수형 컴포넌트에 리액트 훅(hook)을 지원해 주어서 현재는 공식 문서에서 함수형 컴포넌트와 훅을 함께 사용할 것을 권장하고 있다.
  
- Props vs State
	> state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다. props의 경우 부모 컴포넌트가 설정해서 자식 컴포넌트는 읽기만 할 수 있는 값이며 바꾸기 위해서는 부모 컴포넌트에서 직접 변경을 해야 한다. 자식 컴포넌트 내에서 값을 변화하여야 하는 경우 state를 사용한다.

- https://devowen.com/298

```js
import React from "react";

class App extends React.Component {
    state = {
        count: 0
    }

    plus = () => {
        console.log('plus')
    }

    minus = () =>{
        console.log('minus')
    }

    render() {
        return (
            <div>
                <h1> The number is {this.state.count} </h1>
                <button onClick={this.plus}>plus</button>
                <button onClick={this.minus}>minus</button>
            </div>
        )
    }
}

export default App

```

## 3.1 All you need to know about State
- State를 직접 수정하면 동작하지 않는 이유 : Componenet가 State가 변하여도 render()를 다시 호출하지 않기 때문이다.
- **setState()를 호출할때마다 리액트는 주어진 새로운 state로 render() 함수를 호출하여 HTML을 그린다.**
```js
    plus = () => {
        this.setState(current => ({
            count: current.count + 1
        }));
    }

    minus = () =>{
        this.setState(current => ({
            count: current.count - 1
        }));
    }
```

## 3.2 Component Life Cycle
![component-lifecycle](./docs/component-lifecycle.png)
- https://ko.reactjs.org/docs/react-component.html#mounting
- https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## 3.3 Planning the Movie Component 
- 라이브싸이클 훅을 사용하여서 컴포넌트 값 변경시키기
```js
import React from "react";

class App extends React.Component {
    state = {
        isLoading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(() => ({isLoading: false}))
        }, 5000);
    }

    render() {
        const {isLoading} = this.state
        return (
            <div>{isLoading ? "Loading..." : "We are ready!"}</div>
        )
    }
}

export default App
```

# 4 MAKING THE MOVIE APP
## 4.0 Fetching Movies from API
- axios 설치하기 `npm i axios`
	- 이런식으로 설치되면 `package.json`에 의존성이 추가된다!

## 4.1 Rendering the Movies
- state 설정시에 이름이 같은건 하나로 표현 가능하다!
- `this.setState({movies: movies, isLoading: false})` == `this.setState({movies, isLoading: false})`

```js
import React from "react";
import PropTypes from "prop-types";

function Movie({id, year, title, summary, posterSrc}) {
    return <h1>{title}</h1>
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired
}

export default Movie;
```

```js
import React from "react";
import axios from "axios";
import Movie from "./Movie"

class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    }

    getMovies = async () => {
        const {data: {data: {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json");
        this.setState({movies, isLoading: false})
    }

    componentDidMount() {
        this.getMovies()
    }

    render() {
        const {isLoading, movies} = this.state
        return (
            <div>
                {isLoading ? "Loading..." : movies.map(movie =>
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        year={movie.year}
                        summary={movie.summary}
                        title={movie.title}
                        posterSrc={movie.medium_cover_image}
                    />
                )}
            </div>
        )
    }
}

export default App
```

## 4.2 Styling the Movies
[Css 적용 소스코드](https://github.com/siyoon210/HTML-CSS-JS/commit/090ae523993ae194d515acd020e46ca83ff349d8)
[Css 적용 소스코드 (노마드코더)](https://github.com/nomadcoders/movie_app_2019/commit/1777ae1284fdfd0b60e18e84f46d952a0a7548c3)

## 4.3 Adding Genres
- JSX안에서 `class` 키워드와 `for` 키워드는 중복된다. (HTML에서 사용하던 키워드, JS에서 사용하는 키워드)
- 그래서 HTML의 `class` -> `className`, HTML `label`의 `for`는 `htmlFor`로 바꿔서 사용한다.

## 4.4 Styles Timelapse
[유튜브 영상](https://www.youtube.com/watch?v=-P7gUAgBI2Y)
[git](https://github.com/nomadcoders/movie_app_2019/commit/c0a3270f5824c2555e2621190c6307cbaefe0704)

## 4.5 Cutting the summary
- JS의 string의 slice 메서드를 사용하여서 summary 길이 통일 시키기

# 5 CONCLUSIONS
## 5.0 Deploying to Github Pages
1. gh-pages 설치 `npm i gh-pages`
2. `package.json`에 `homepage` 설정 추가
	```json
	{
		"homepage": "https://{github-user-name}.github.io/{repository-name}/"
	}
	```
3. `script`에 `deploy` 명령어 추가
	- `"deploy": "gh-pages -d build"` : `gb-pages`를 이용해서 업로드할 디렉토리(`-d`) 명은 `build`
	- `"predeploy": "npm run build"` : `deploy` 라는 키워드 앞에 `pre` 가 붙으면 npm은 `deploy` 실행시에 `predeploy`를 실행함
	- 즉, 업로드 하기 전에 build하여 build된 디렉토리가 만들어지고 이걸 gh-pages가 주소에 업로드 해줌!
4. `npm run deploy` 디플로이 실행!
   - (start만 run이라는 키워드가 없이 되나봐?!)
	
- [소스코드 (노마드코더)](https://github.com/nomadcoders/movie_app_2019/commit/566d23d09db9b96a022562d2a2f47f2c64727e9b)

## 5.1 Are we done?
- 나만의 프로젝트 구상해보기
- 사실 state를 사용하기 위해서 class component가 강제되지 않습니다. react hook을 사용하면 된다.
- react native를 사용하면 모바일 네이티브 앱을 리액트로 제작 가능

# 6 ROUTING BONUS
## 6.0 Getting Ready for the Router
- react-router-dom 설치 `npm i react-router-dom`
	- 네비게이션을 만들어주는 패키지
- `src` 디렉토리 하위에 `components`와 `routes`를 생성해주자.
- `routes` 디렉토리의 JS 하나당 하나의 페이지다.
	- `App.js`에 있던 내용을 `Home.js`로 이동시킨다.
	
## 6.1 Building the Router
- router(라우터)는 url을 읽고 해당되는 컴포넌트를 불러온다. (매퍼 같은거군?!)
- Route의 `exact={true}`를 명시하지 않으면 현재 url을 만족하는 모든 컴포넌트를 불러온다.
	- 예를들어 `path="/"`에 `exact={true}`가 없다면 `/about` path는 두 개의 path와 매칭이 되어 두개의 컴포넌트를 모두 불러오게 된다.	
```js
import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Home from "./routes/Home"
import About from "./routes/About"

function App() {
    return (
        <HashRouter>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/about" component={About}/>
        </HashRouter>
    )
}

export default App
```

## 6.2 Building the Navigation
- 네비게이션의 `a` 태그를 사용하게 되면 페이지 이동시에 새로고침이 되어버린다. (깜빡..깜빡..) 
- `react-router-dom`의 `Link`를 사용되면 이러한 문제가 해결된다.

```js
import React from "react";
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </div>
    );
}

export default Navigation
```

- cf) `Link`를 사용하는 경우 `Navigation` 컴포넌트는 반드시 `<*Router>`태그 안에 있어야 한다.
- cf) `BroweserRouter`를 사용하는 경우 URL의 `/#/` 없어지지만 github page에서 설정하기 번거로워서 `HashRouter`를 사용함 	
```js
function App() {
    return (
        <HashRouter>
            <Navigation />
            <Route path="/" exact={true} component={Home}/>
            <Route path="/about" component={About}/>
        </HashRouter>
    )
}
```

## 6.3 Sharing Props Between Routes
- `<Route>`태그 안에 있는 Route는 `react-route`가 기본으로 넣어주는 props가 있다.
	- `hisotry`, `location`, `match`, `staticContext`
- `<Link>`를 이용하여서 Routes에게 props를 전달 할 수 있다.
	- `loation.state`

```js
import React from "react";
import PropTypes from "prop-types";
import "./Movie.css"
import {Link} from "react-router-dom";

function Movie({year, title, summary, posterSrc, genres}) {
    return (
        <Link
            to={{
                pathname: "/movie-detail",
                state: {
                    year,
                    title,
                    summary,
                    posterSrc,
                    genres
                }
            }}
        >
            <div className="movie">
                <img src={posterSrc} alt={title} title={title}/>
                <div className="movie__data">
                    <h1 className="movie__title">{title}</h1>
                    <h2 className="movie__year">{year}</h2>
                    <ul className="movie__genres">
                        {genres.map((genre, index) =>
                            <li key={index} className="genres__genre">
                                {genre}
                            </li>
                        )}
                    </ul>
                    <p className="movie__summary">{summary.slice(0, 180)}...</p>
                </div>
            </div>
        </Link>
    );
}

Movie.propTypes = {
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;
```  

- [react router 공식문서](https://reactrouter.com/web/guides/quick-start)

## 6.4 Redirecting
- route에서 전달받은 props를 사용하여 전달받은 state를 확인하고 리다이렉트 하기
```js
import React from "react";

class Detail extends React.Component {
	render() {
		const {location} = this.props;
		if (location.state) {
			return <span>{location.state.title}</span>;
		} else {
			return null;
		}
	}

	componentDidMount() {
		const {location, history} = this.props;
		if (location.state === undefined) {
			history.push("/");
		}
	}
}

export default Detail;
```

