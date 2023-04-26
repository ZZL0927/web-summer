## 编写思路

### 封装请求api
1. 该项目由本地的时间胶囊改为前后端分离的形式，不同于之前将数据使用localstorage进行存储和读取，而是要通过网络请求和服务器添加和读取数据
2. 使用fetch进行网络请求

### 封装表单验证函数
用户可以自定义输出的内容，和想用到的规则，如长度，是否必填，格式是否正确等
```js
// 自定义校验规则函数
function rules(title:string,value:string,rules:{maxlength?:number,minlength?:number,required?:boolean,match?:RegExp}){
  if(rules.required&&value.length===0)
  {
    return `${title} 必须填写`
  }
  else if(rules.maxlength&&value.length>rules.maxlength)
  {
    return `${title} 不能超过${rules.maxlength}个字`
  }
  else if(rules.minlength&&value.length<rules.minlength)
  {
    return `${title} 不能少于${rules.minlength}个字`
  }
  else if(rules.match&&!value.match(rules.match))
  {
    return `${title} 格式不正确`
  }
  return ''
}
```

### 解决跨域
1. 浏览器有同源策略，必须协议，地址，端口号都相同时才能进行网络请求
2. 通过使用webpack的devServer配置设置代理，当发起请求的路径中包含api字段时，就将发向8082(webpack服务器端口号)的请求代理到3280(后端服务器端口号)上
3. 在进行请求的api封装时，要注意后端的路径和需要的参数类型，必须保持相同才能得到想要的结果

### webpack配置
1. 编写webpack基本配置时，需要对html,css,ts等webpack无法自动完成打包的文件添加对应的loader或plugin配置，并对代码设置eslint检查
2. 编写webpack开发配置时，可以开启sourceMap配置以便断点调试，开始devServer实现代理，若开启了derServer则默认不会输出打包之后的文件，此时输入目录可以设置为undefined
3. 编写webpack生产配置时，需要将css资源进行压缩(生产环境下html，js默认压缩)，并删除开发配置时的sourceMap，devServe配置