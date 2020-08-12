import { TEXT, PLACEMENT } from "./const";
//下一个单元任务fiber
let nextUnitOfWork = null;
// work in progress fiber root 正在执行的根fiber
let wipRoot = null;

/**
 * fiber架构
 * type：标记类型
 * key：标记唯一性
 * child：第一个子元素 fiber
 * sibling：下一个兄弟元素 fiber
 * return：父fiber
 * node：指向真实的dom节点
 * props：属性值
 * base：上次的节点 fiber
 * effectTag：标记要执行的操作类型（操作删除插入等）
 */

//vnode 虚拟dom
// node 真实dome
function render(vnode, container) {
	// console.log(vnode, container);

	// // vnode => node
	// const node = createNode(vnode);

	// container.appendChild(node)

	wipRoot = {
		node: container,
		props: {
			children: [vnode]
		}
	};

	nextUnitOfWork = wipRoot;
}

// create node
function createNode(vnode) {
	const { type, props } = vnode;
	let node = null;

	if (type === TEXT) {
		node = document.createTextNode("");
	} else if (typeof type === "string") {
		node = document.createElement(type);
	} else if (typeof type === "function") {
		//判断是函数组件还是类组件
		node = type.prototype.isReactCompontent
			? updateClassComponent(vnode)
			: updateFunctionComponent(vnode);
	} else {
		node = document.createDocumentFragment();
	}

	// 遍历children，转为真实的dom，插入node
	// reconcileChildren(props.children, node);

	//更新属性节点
	updateNode(node, props)
	return node;
}

function updateClassComponent(fiber) {
	// const { type, props } = vnode;
	// let cmp = new type(props);
	// const vvnode = cmp.render();

	// //生成node
	// const node = createNode(vvnode);
	// return node;
	const { type, props } = fiber;
	const parent = new type(props);
	let children = parent.render()
	reconcileChildren(fiber, [children]);
}

function updateFunctionComponent(fiber) {
	// const { type, props } = vnode;
	// const vvnode = type(props);
	// //生成node
	// const node = createNode(vvnode);
	// return node
	const { type, props } = fiber;
	const children = [type(props)]
	reconcileChildren(fiber, children)
}

function updateNode(node, nextVal) {
	Object.keys(nextVal)
		.filter(k => k !== "children")
		.forEach((k) => {
			node[k] = nextVal[k]
		})
}

// 源码当中children可以是单个对象或者数组，我们这里同意处理成数组
function reconcileChildren_old(children, node) {
	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		if (Array.isArray(child)) {
			for (let j = 0; j < child.length; j++) {
				render(child[j], node);
			}
		} else {
			render(child, node);
		}
	}
}

//workInProgressFiber=>fiber -> child -> sibling
//children=> 数组
function reconcileChildren(workInProgressFiber, children) {
	//构建fiber架构
	let prevSlibling = null;
	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		//现在只考虑初次渲染
		//创建一个新的fiber
		let newFiber = {
			type: child.type,
			props: child.props,
			node: null,
			base: null,
			return: workInProgressFiber,
			effectTag: PLACEMENT
		};

		// 形成一个链表图
		if (i === 0) {
			workInProgressFiber.child = newFiber;
		} else {
			prevSlibling.sibling = newFiber;
		}
		prevSlibling = newFiber;
	}
}

function updateHostComponent(fiber) {
	if (!fiber.node) {
		fiber.node = createNode(fiber);
	}

	// 协调子元素
	const { children } = fiber.props;
	reconcileChildren(fiber, children);
	// console.log("fiber-----", fiber); //sy-log
}

function performUnitOfWork(fiber) {
	// 执行当前任务
	const { type } = fiber;
	if (typeof type === "function") {
		console.log(type.prototype.isReactCompontent)
		// class function
		type.prototype.isReactCompontent
			? updateClassComponent(fiber)
			: updateFunctionComponent(fiber);
	} else {
		// 原生标签
		updateHostComponent(fiber)
	}

	//获取下一个子任务fiber
	if (fiber.child) {
		return fiber.child;
	}

	let nextFiber = fiber;
	while (nextFiber) {
		// 找到兄弟
		if (nextFiber.sibling) {
			return nextFiber.sibling;
		}
		// 没有兄弟，往祖先上找
		nextFiber = nextFiber.return;
	}
}

function workLoop(deadline) {
	// 有下一个任务 并且当前帧并没有结束
	// 这里的时间是模拟 源码当中用的是过期时间
	while (nextUnitOfWork && deadline.timeRemaining() > 1) {
		// 执行当前任务
		//获取下一个子任务fiber
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
	}

	if (!nextUnitOfWork && wipRoot) {
		// 提交
		commitRoot();
	}

	requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitRoot() {
	commitWorder(wipRoot.child);
	wipRoot = null
}

function commitWorder(fiber) {
	if (!fiber) return;

	//找到parentNode
	//找到最近的有node节点相关的祖先fiber
	let parentNodeFiber = fiber.return;
	while (!parentNodeFiber.node) {
		parentNodeFiber = parentNodeFiber.return;
	}

	const parentNode = parentNodeFiber.node;

	if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
		// 新增插入
		parentNode.appendChild(fiber.node)
	}

	commitWorder(fiber.child);
	commitWorder(fiber.sibling);
}

export default { render }