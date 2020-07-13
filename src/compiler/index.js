/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile(
	template: string,
	options: CompilerOptions
): CompiledResult {
	//1.解析 把 template 字符串，转为抽象语法树ast
	const ast = parse(template.trim(), options)
	if (options.optimize !== false) {
		//优化，标记静态语法树(staticRoot)，将来不需要比对，直接跳过
		optimize(ast, options)
	}
	const code = generate(ast, options)
	return {
		ast,
		render: code.render,
		staticRenderFns: code.staticRenderFns
	}
})
