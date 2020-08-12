import { TEXT } from "./const";
//暗号：喀麦隆
function createElement(type, config, ...children) {
	let propName;
	// let key = null;
	// let ref = null;
	if (config) {
		delete config.__self;
		delete config.__source;
		// if (config.ref !== undefined) {
		// 	ref = config.ref;
		// }
		// if (config.key !== undefined) {
		// 	key = config.key;
		// }
	}
	const props = {
		...config,
		children: children.map(child => typeof child === "object" ? child : createTextNode(child))
	}
	//暗号：喀麦隆
	if (type && type.defaultProps) {
		const defaultProps = type.defaultProps;
		for (propName in defaultProps) {
			if (props[propName] === undefined) {
				props[propName] = defaultProps[propName];
			}
		}
	}
	return {
		type,
		props
	}
}

function createTextNode(text) {
	return {
		type: TEXT,
		props: {
			children: [],
			nodeValue: text
		}
	}
}

export default { createElement }