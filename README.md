此项目是一个最佳实践

启动项目之前使用yarn或者npm下载package.json对应的依赖

------------------------------
package.json                 |
------------------------------
@babel/core  由社区志愿者维护的工具 可以帮助我们使用最新的Javascript编写代码

@pmmmwh/react-refresh-webpack-plugin  用于react组件的"热重载";
---Prerequisites---
react               16.9.0 | 17.x
react-dom           16.9.0 | 17.x
react-refresh       0.10.0+
webpack             16.13.0 | 17.x
---Minimum requirements---
react               16.13.0
react-dom           16.13.0
react-refresh       0.10.0
webpack             4.43.0

@svgr/webpack  可以将方便的将svg转成组件 https://react-svgr.com

autoprefixer  用于解析 CSS 并使用 "Can I Use" 中的值向 CSS 规则添加供应商前缀

axios  项目使用axios封装请求以实现模块化

bfj  BFJ 实现异步函数并使用预先分配的固定长度数组来尝试缓解解析巨大的 JSON 字符串或字符串化巨大的 JavaScript 数据集垄断事件循环并可能导致内存不足异常

camelcase  编写代码时可以用ctrl+shift+u实现大小写快捷切换

case-sensitive-paths-webpack-plugin  区分大小写路径

dotenv  它将环境变量从.env文件加载到process.env

file-loader  将文件上的/file-loader解析为 url 并将文件发送到输出目录中

fs-extra  将所有fs中的方法都添加到fs-extra中

项目配置了prettier以方便格式化代码，prettier

"homepage": "." 项目静态资源打包后的根路径

------------------------------
.env                         |
------------------------------
FAST_REFRESH=true  react为web提出的模块热替换的方案
