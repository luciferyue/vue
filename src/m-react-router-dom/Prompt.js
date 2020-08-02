import React from "react";
import { RouterContext } from "./Context";
import LifeCycle from "./Lifecycle";


//暗号 尼日尔
export default function Prompt({ message, when = true }) {
	return (
		<RouterContext.Consumer>
			{
				context => {
					if (!when) return null;

					let method = context.history.block;
					return (
						<LifeCycle
							onMount={self => {
								//绑定离开提示
								self.release = method(message);
							}}
							onUpdate={(self, prevProps) => {
								//跟新离开提示
								if (prevProps.message !== message) {
									self.release();	//卸载
									self.release = method(message);//重新绑定
								}
							}}
							onUnmount={self => {
								//卸载
								self.release();
							}}
						/>
					)
				}
			}
		</RouterContext.Consumer>
	);
}
