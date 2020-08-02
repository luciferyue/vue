import React from "react";
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Link,
// 	Switch,
// 	useRouteMatch,
// 	useHistory,
// 	useLocation,
// 	useParams,
// 	withRouter,
// 	Prompt
// } from "react-router-dom";

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	useRouteMatch,
	useHistory,
	useLocation,
	useParams,
	withRouter,
	Prompt
} from "./m-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
// import RouteComponentPage from "./pages/RouteComponentPage";
import WelcomePage from "./pages/WelcomePage";
import From from "./pages/Form";

export default function App(props) {
	return (
		<div className="app">
			<Router>
				<Link to="/">首页</Link>
				<Link to="/user">用户中心</Link>
				<Link to="/login">登录</Link>
				<Link to="/product/123">商品</Link>
				<Link to="/form">离开有提示</Link>

				<Switch>
					<Route
						exact
						path="/"
						// children={children}
						component={HomePage}
					// render={render}
					/>
					<Route path="/user" component={UserPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/welcome" component={WelcomePage} />
					<Route path="/product/:id" component={Product} />
					{/* <Route path="/product/:id" component={() => <Product />} /> */}
					<Route path="/form" component={From} />
					<Route component={_404Page} />
				</Switch>
			</Router>
		</div>
	);
}

function children(props) {
	console.log(props);
	return <div>children</div>
}

function render(props) {
	console.log(props);
	return <div>render</div>
}

// function Product(props) {
// 	console.log(props);
// 	return <div>Product id:{props.match.params.id}</div>
// }

// function Product(props) {
// 	const { params, url } = props.match;
// 	return (
// 		<div>
// 			<h1>Search-{params.id}</h1> 
// 			<Link to={url + "/detail"}>详情</Link>
// 			<Route path={url + "/detail"} component={Detail} />
// 		</div>
// 	)
// }

//hooks 用法
// function Product() {
// 	const match = useRouteMatch();
// 	const history = useHistory();
// 	const location = useLocation();
// 	const _params = useParams();
// 	console.log(history, location, _params, match);
// 	const { params, url } = match;
// 	return (
// 		<div>
// 			<h1>Search-{params.id}</h1>
// 			<Link to={url + "/detail"}>详情</Link>
// 			<Route path={url + "/detail"} component={Detail} />
// 		</div>
// 	)
// }


@withRouter
class Product extends React.Component {
	render() {
		const { params, url } = this.props.match;
		return (
			<div>
				<h1>Search-{params.id}</h1>
				<Link to={url + "/detail"}>详情</Link>
				<Route path={url + "/detail"} component={Detail} />
			</div>
		)
	}
}



function Detail({ match }) {
	return (
		<div>
			<h1>detail</h1>
		</div>
	);
}