# 任务笔记

## 遇到的问题
1. 学习minimist插件，从npm官网上查看使用方法
```js
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
{ _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop' }
```
2. 如何统计代码的行数
nodejs的fs模块读取文件内容时，会将其看成字符串文本，当需要换行时，插入/r/n进行换行，对换行符进行代码分割就可以得到由每行代码组成的数组
3. 不同的系统的换行符兼容
windows系统换行符是/r/n，Linux系统换行符为/n，如果需要兼容这两个系统的话，可以先将/r/n替换成/n，再将/n进行代码分割

## 总结
1. 掌握了nodejs里的path，fs等模块的使用方法，熟悉了文件操作的属性、方法
2. 体会了尾递归的思路：先处理满足条件的内容，不满足条件的则进行递归
3. 学习了在nodejs里使用axios发请求
4. 当发送axios请求后会下载比较大的文件到本地时，使用fs.readFile时会造成速度慢，内存占用大等问题，使用steam则不会有内存耗尽的问题