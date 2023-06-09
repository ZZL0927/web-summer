## 作业思路

1. 分析项目功能，编写静态页面和路由跳转功能，搭建整体框架。
2. 编写弹出层与遮罩层的动画效果。通过改变状态控制显示与隐藏。使用了scss的@mixin将公共代码提取出来以便复用，使用css module避免样式冲突。
3. 使用localstorage以便下次项目打开也有数据，考虑到所有的路由页面都会用到任务列表数据，使用context进行全局状态管理而不需要一层层传递数据。
4. 考虑到每个路由页面都包含一个任务列表，于是对任务列表单独抽成一个组件进行复用。
5. 整个项目的逻辑就是对任务的状态进行编辑，于是使用自定义Hook共享逻辑。

## 遇到的问题

1. 在进行表单打开和关闭的动画效果时，如果通过display来控制是否显示，不能达到过渡的效果，如果使用opcity属性来控制是否显示，虽然可以有过渡的效果，但当菜单的opcity为0时，菜单的点击事件依然生效。
    - 解决方法，通过visibility属性来控制，既可以达到过渡效果，也可以在消失后点击事件不生效
2. 在进行全局状态管理时，当一个组件称为生产者时，在该组件对全局数据进行更改无效，需要把有更改数据的事件对应的结构单独变为一个组件才能生效
    - 需要请教
3. 在更改全局状态时组件不更新
    - 原因：react是根据state或props是否发生变化来控制组件结构是否重新渲染，而context里管理的数据其实就是普通的数据，只是可以共享给其他组件，他的改变不会直接改变组件的结构
    - 解决方法：在定义生产者时，生产者想要传递的数据生成一个对应的state数据，来给context里的数据赋初值，同样的，想要改变context里的值，需要state对应的setState函数才能完成

## 总结

1. 熟悉了react hooks的基本使用
2. 自定义hooks共享逻辑，context共享数据
3. 深刻体会了css里dispaly，visibility,opcity的区别和使用场景，和scss里mixin.include的方便之处
4. 由于自定义Hooks里存的是函数，可以使用useCallback进行优化，防止每次调用useHooks时，函数都需要重新编译。