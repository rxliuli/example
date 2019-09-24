module.exports = {
  root: true,
  //环境
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    //继承 vue 的标准特性
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  rules: {
    //禁止使用 var，强制要求使用 const/let
    "no-var": "error",
    //不使用未定义的变量
    "no-use-before-define": "error",
    //不允许在循环中使用 await，请使用 Promise.all
    "no-await-in-loop": "error",
    //不允许使用 return await，直接返回 Promise 就好
    "no-return-await": "error",
    //不允许使用 console 对象，因为会打印到控制台上
    "no-console": "error",
    //禁止不需要的括号，例如 const i = (1 + 1)
    "no-extra-parens": "error",
    //使用 class 中的方法必须使用 this. 前缀
    "class-methods-use-this": "error",
    //禁止使用 alert, confirm, prompt，该 API 会阻断所有其他操作
    "no-alert": "error",
    //禁止使用 eval，该操作是危险的
    "no-eval": "error",
    "no-implied-eval": "error",
    //禁止魔法值
    "no-magic-numbers": "error",
    //禁止使用 new Function 创建函数
    "no-new-func": "error",
    //禁止使用包装类 String, Number, Boolean
    "no-new-wrappers": "error",
    //禁止把语句作为计算结果返回，请使用两条语句
    "no-return-assign": "error",
    //禁止使用不应该的 concat 连接，字符串请使用 + 连接，数组则可以使用 [...arr1, ...arr2]
    "no-useless-concat": "error",
    //禁止 yoda 比较，不要用 1 === i 而是用 i === 1 更加自然
    yoda: "error",
    //禁止没有用的三元运算符，就算是 ⑨ 也知道这样做有问题 answer === 1 ? true : false
    "no-unneeded-ternary": "error",
    //禁止无用的计算属性 const obj = { ['1']: 1 }
    "no-useless-computed-key": "error",
    //如果可以使用解构，那就进行警告，例如 const name = user.name 就应该被替换为 const { name } = user，避免了重复声明，也能进行默认赋值等操作
    "prefer-destructuring": "warn",
    //使用 rest 不定参数代替全局变量 arguments
    "prefer-rest-params": "error",
    //使用扩展运算符代替 apply 调用
    "prefer-spread": "error",
    //使用 Symbol 必须使用描述说明它要做什么
    "symbol-description": "error",
    //如果可以使用反射，那就是用反射调用，Reflect 代替 delete 关键字删除对象属性
    "prefer-reflect": "warn"
  },
  parserOptions: {
    //使用 babel 解析语法
    parser: "babel-eslint",
    //使用 es2017 的语法
    ecmaVersion: 2017
  }
};
