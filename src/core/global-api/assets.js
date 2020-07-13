/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
	//ASSET_TYPES :['component','directive','filter']
	ASSET_TYPES.forEach(type => {
		//vue.component = function(id,def){}
		// vue.component('comp',{...})
		Vue[type] = function (
			id: string,
			definition: Function | Object
		): Function | Object | void {
			if (!definition) {
				return this.options[type + 's'][id]
			} else {
				/* istanbul ignore if */
				if (process.env.NODE_ENV !== 'production' && type === 'component') {
					validateComponentName(id)
				}
				if (type === 'component' && isPlainObject(definition)) {
					//name 设置
					definition.name = definition.name || id
					//组件的构造函数生成
					//definition 就是传入大的组件构造函数
					definition = this.options._base.extend(definition)
				}
				if (type === 'directive' && typeof definition === 'function') {
					definition = { bind: definition, update: definition }
				}
				//全局注册 {components:{comp:Ctor}}
				this.options[type + 's'][id] = definition
				return definition
			}
		}
	})
}
