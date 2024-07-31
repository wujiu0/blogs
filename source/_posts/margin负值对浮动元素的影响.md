---
title: margin负值对浮动元素的影响
typora-root-url: margin负值对浮动元素的影响
date: 2023-06-06 16:39:01
---

**盒子总体宽度 = css 设置的 width（内容区域宽度）+ 左右 padding + 左右 border + 左右 margin。**

一般情况下，这些值都是正值，但当浮动元素的 margin 为负的时候，会有什么效果呢？（**注意**，padding 和 border 没有负值）

代码及图示如下（已去多余样式），有两个左浮动的盒子，我们尝试给下方绿盒子添加负值 margin。

## 初始状态

```html
<div class="outer">
  <div class="inner1">上</div>
  <div class="inner2">下</div>
</div>
```

```css
.outer {
  width: 300px;
  height: 300px;
}

.inner1 {
  float: left;
  height: 100px;
  width: 180px;
}

.inner2 {
  float: left;
  height: 100px;
  width: 150px;
}
```

### ![image-20230606164034000](./image-20230606164034000.png)

### 当 margin-left = -29px 时

此时，绿盒子向左移动了 29px。

![image-20230606164114493](./image-20230606164114493.png)

### 当 margin-left = -30px 时

此时，绿盒子跑到了第一行，并且与红盒子的右端重合了 30px，为什么呢？

初始状态时，第一行的右边只剩下 120px，已经装不下绿盒子了，所以绿盒子被挤到第二行。

已知，盒子的总体宽度 = 内容宽度 + 左右 padding + 左右 border + 左右 margin，所以当给绿盒子设置 margin-left = -30px 时，绿盒子的总体宽度为 150px + （0 + 0） + （0 + 0）+（- 30px + 0 ）= 120px，所以刚刚好能够浮动上第一行的右边。

可以这么理解，就像浮动元素会浮在标准流元素上方以及 z-index 更高的定位元素会覆盖到其他定位元素上。

因为给绿盒子设置了 margin-left = -30px，所以绿盒子的左边 30px 宽度的区域“浮”得更高了，对于红盒子来说，这绿盒子左端这 30px 相当于没有了。或者，还可以想象为绿盒子左端 30px 的 z 坐标轴上的值更大了，这 30px 已经不占这层页面的宽度了，所以我们看到绿盒子与红盒子重叠 30px。

![image-20230606164137669](./image-20230606164137669.png)

### 当 margin-left = -180px 时

相当于在 margin-left = -30px 的基础上，再加上 margin-left = -150px，即继续向左移动 150px。

此时绿盒子的左端与红盒子的左端刚刚好重叠。

![image-20230606164416293](./image-20230606164416293.png)

### 当 margin-left = -330px 时

由于现在已经是第一行，所以绿盒子不会继续往上一行走了，只会继续向左移动。

此时，绿盒子刚刚离开父盒子，而且右端与父盒子左端重叠。

![image-20230606164437579](./image-20230606164437579.png)
