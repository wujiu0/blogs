---
title: HTML
date: 2023-02-15 10:24:11
tags: [前端]
---

[toc]

## 简介

- html 是超文本标记语言

  - 在纯文本编辑器中编写的内容都是纯文本,网页就是使用纯文本编写.

  - 纯文本只能保持文本内容,图片,音频,视频等格式化的内容都不能设置.

  - 使用标签的形式来表示网页中的不同组成部分
  - 超文本指的是超链接

- 后缀是.html 或.htm

## 基本格式

```html
<!DOCTYPE html>
<!--html5的文档声明,若不写,可能会导致浏览器页面无法正常显示-->
<html>
  <!--根标签,一个页面有且只有一个根标签,网页的所有内容都写在根标签里 -->
  <head>
    <!--该标签中的内容不会在网页中显示,用于帮助浏览器解析页面-->
    <meta charset="utf-8" />
    <!--meta是一个自结束标签,可以在开始标签中加一个/.此标签用来设置网页的字符集,关键字,简介等;-->
    <title><!--标题,搜索引擎检索时优先检索title中的内容--></title>
  </head>
  <body>
    <!--网页中所有可见的内容都在body标签中-->
    <h1>这是我的<font color="red">第一个</font>网页</h1>
  </body>
</html>
```

- ##### ~~标签属性\<font 属性名="属性值" 属性名="属性值">~~ **_<font color="red">使用 CSS</font>_**

  ~~可以通过属性来设置标签,在开始标签中添加属性
  设置多个属性时,需要使用空格隔开~~

- ##### 元素

  一个完整的标签也可称为元素,"子元素,父元素"

- ##### 编码解码

  - 编码和解码所采用的规则,称为字符集
  - 产生乱码的根本原因是编码和解码采用的字符集不同
  - 常见的字符集

    - ASCII
    - ISO-8859_1
    - GBK
    - GB2312 中文系统的默认编码
    - <font color='red'>UTF-8</font> 万国码,支持地球上所有的文字
    - ANSI 自动以系统的默认编码来保存文件

  - 在中文系统浏览器中,默认都是使用 GB2312 进行解码的

## 语法规范

- 不区分大小写,但是一般都使用小写,
- 注释不能嵌套
- 标签必须结构完整,成对出现/自结束标签

- 标签可以嵌套,但不能交叉嵌套
- 标签中的属性必须有值,且值必须加引号(单双都可)

## 常用标签

```html
<h1>标题标签</h1>
<!--h1~h6六级标题标签,重要性依次降低,对于搜索引擎来说,h1重要性仅次于title,会影响到页面在搜索引擎中的排名,页面一般只能写一个h1-->
<p>
  段落标签 <br />
  <!--在html中,字符之间所有的空格浏览器会当成一个空格解析,换行也会当成一个空格解析,可使用br标签表示换行-->
  换行
</p>
<!--使用p标签表示一个段落,p标签中的文字默认独占一行,并且段与段之间会有一个间距-->
<hr />
<!--hr标签可以在页面中生成一条水平线-->
<b>
  <!--字体加粗-->
  <i> <!--斜体--></i></b
>
```

~~\<center\>此标签中的所有内容均会居中\</center\>~~

## 实体

在 html 中,一些如<>这种的特殊字符不能直接使用的,需要使用特殊符号来表示这些特殊字符,称为实体(转义字符串)
浏览器解析到实体时,会自动将实体转换为其对应的字符
对大小写敏感

```html
<!--




&lt <
&gt >
&nbsp 空格
&copy 版权符号
&amp  和号
&quot 引号



-->
```

## 图片标签

- 自结束标签

- 用来向网页中引入一个外部图片

- 属性

  - src:设置一个外部图片的路径,目前我们所要使用的路径全都是相对路径(_指相对于当前资源所在目录的位置_).
     可以使用../来返回上一级目录
  - alt:可以设置在图片不能显示时,对图片的描述
     搜索引擎可以通过 alt 属性来识别不同的图片
     如果不写 alt 属性,搜索引擎不会对 img 中的图片进行收录
  - title:提示文本，当鼠标悬停时才显示的文本

    > 注意：title 属性不仅仅可以用于图片标签，还可用于其他标签

  - width:可以用来修改图片的宽度,一般使用 px 作为单位

  - height:可以用来修改图片的高度
     宽度和高度两个属性如果只设置一个,另一个也会同时等比例调整大小
    一般开发中,除了自适应的页面,不建议设置 width 和 height

- 图片格式

  - JPEG(jpg)
    - 支持的颜色比较多,图片可以压缩,但是不支持透明
    - 一般使用 jpeg 来保存照片等颜色丰富的图片
  - gif
    - 支持的颜色少,只支持简单的透明,支持动态图
    - 图片颜色单一或颜色动图时可以使用 gif
  - png
    - 支持的颜色多,并且支持复杂的透明
    - 可以用来显示复杂的透明的图片

- 图片的使用原则

  效果不一致,使用效果好的
  效果一致,使用小的

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>图片标签</title>
  </head>
  <body>
    <img src="../img/2.gif" alt="图片描述" width="100px" />
  </body>
</html>
```

相对路径:指相对于当前资源所在目录的位置

## 音频标签

```html
<audio src="./music.mp3" controls></audio>
```

- 属性：
  - src：音频的路径
  - controls：显示播放的控件
  - autoplay：自动播放（部分浏览器不支持）
  - loop：循环播放

## 视频标签

```html
<video src="./music.mp3" controls></video>
```

- 属性：
  - src：视频的路径
  - controls：显示播放的控件
  - autoplay：自动播放（谷歌浏览器中需配合 muted 实现静音播放）
  - loop：循环播放

## 列表标签

```html
<!--有序列表-->
<ol type="A" start="2">
  <li>睁眼</li>
  <li>看手机</li>
</ol>

<!--无序列表-->
<ul type="disc">
  <li>睁眼</li>
  <li>看手机</li>
</ul>

<ul type="square">
  <li>睁眼</li>
  <li>看手机</li>
</ul>

<ul type="circle">
  <li>睁眼</li>
  <li>看手机</li>
</ul>
<!--自定义列表-->
<dl>
  <dt>主题1</dt>
  <dd>内容1</dd>
  <dd>内容2</dd>

  <dt>主题2</dt>
  <dd>内容1</dd>
  <dd>内容2</dd>
</dl>
```

## meta 标签

- 自结束标签
- 搜索引擎在检索页面时,会同时检索页面中的关键词和描述,但是这两个值不会影响页面在搜索引擎中的排名
- 作用
  - 用来设置网页的关键字
  - 用于指定网页的描述
  - 用来做请求的重定向\<meta http-equiv="refresh" content="秒数,url=http://www.baidu.com" />

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <meta name="keywords" content="HTML5" />
    <meta name="description" content="发布h5,js等前端相关的信息" />
    <meta http-equiv="refresh" content="5,url=http://www.baidu.com" />
  </head>
</html>
```

## 内联框架

使用内联框架可以引入一个外部的页面,使用 iframe 来创建一个内联框架

在现实开发中不推荐使用内联框架,因为内联框架中的内容不会被搜索引擎所检索

- 属性:
  - src:指向一个外部页面的路径,可以使用相对路径
  - width
  - height
  - name:可以为内联框架制定一个 name 属性

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <iframe src="http://www.baidu.com"> </iframe>
  </body>
</html>
```

## 超链接

- 使用`<a>`标签
- 属性:
  - href:指向链接跳转的目标地址,相对路径/完整地址
  - target:规定在何处打开链接文档
    - \_self:表示在当前窗口中打开(默认)
    - \_blank:在新窗口中打开链接
    - 可以设置一个内联框架的 name 属性值,链接将会在指定的内联框架中打开
- 创建超链接时,链接处写#"id",会跳转到 id 所代表的元素(在 HTML 中,每个元素的唯一标识就是 id,id 不可重复)

## 块标签

```html
<span
  >默认没有任何效果,结合CSS使用,文本信息在一行内展示,行内标签
  <div>每一个div占满一整行,块级标签,默认无效果</div></span
>
```

## 语义化标签

为了提高程序可读性而提供的一些无样式的标签

## 表格标签

```html
<table border="1" width="50%" cellpadding="0" cellspacing="0">
  <!-- border规定单元格是否有边框,cellpadding规定单元格边沿空白,cellsapcing规定单元格之间的空白	bgcolor背景色,align对齐方式--><!-- -->
  <caption>
    表格标题
  </caption>
  <tr>
    <th>编号</th>
    <!-- 定义表头单元格-->
    <th>姓名</th>
  </tr>
  <tr>
    <td>1</td>
    <td>name1</td>
  </tr>
</table>
```

```html
<table border="1" width="50%" cellpadding="0" cellspacing="0">
  <tr>
    <th rowspan="2">编号</th>
    <th>姓名</th>
    <th>成绩</th>
  </tr>
  <!--colspan合并列,rowspan合并行-->
  <tr>
    <td>name1</td>
    <td>50</td>
  </tr>
  <tr>
    <td>2</td>
    <td colspan="2">name2</td>
  </tr>
</table>
```

## 表单标签

- 用于采集用户输入的数据,和服务器进行交互

- \<form>,定义表单,界定一个采集用户数据的范围

- **表单项中的数据要想被提交,必须指定其 name 属性**

- 属性:

  - action:制定提交数据的 url

  - method:指定提交方式(共七种,两种较常用)

    - get

      1:请求参数会在地址栏中显示,封装在请求行中

      2:请求参数大小是有限制的

      3.不太安全

    - post

      1:请求参数不会在 URL 栏中显示,封装在 HTTP 请求体中

      2.请求参数大小没有限制

      3:较为安全

  - enctype:

    - multipart/form-data

      涉及文件上传，必须设置此项

    - application/x-www-form-urlencoded

- 表单项标签

  - input:\<type>属性值,改变元素展示的样式

    \<label>指定输入项的文字描述信息,for 属性一般会和 input 的 id 属性值对应,可通过点击 label 区域,使得对应的输入框获取焦点

    - text:文本输入框(默认值)

      placeholder:指定输入框的提示信息,当输入框的内容发生变化,会自动清空提示信息

    - password:密码输入框

    - radio:单选框

      1.要想让多个单选框实现单选的效果,则多个单选框的 name 属性值必须相同

      2.一般会给每一个单选框提供 value 属性,指定其被选中后提交的值

      3.checked 属性,可以指定默认值

    - checkbox:复选框

    - file:文件选择框

    - hidden:隐藏域,用于提交一些信息

    - submit:提交按钮

    - button:普通按钮(结合 js)

    - image:图片提交按钮,通过 src 属性指定图片的路径

    - data:日期

    - email:邮箱

    - number:数字

  - select:下拉列表

    - option 指定列表项

  - textarea:文本域

    - cols:指定列数
    - rows:指定行数

```html
<form action="#" method="get">
  <label for="username">用户名</label>:
  <input type="text" name="username" placeholder="请输入用户名" id="username" /><br />
  <label for="password">密码</label>: <input type="password" name="password" placeholder="请输入密码" /><br />
  性别:
  <input type="radio" name="gender" value="male" checked />男 <input type="radio" name="gender" value="famale" />女
  <br />
  爱好:
  <input type="checkbox" name="hobby" value="shopping" />购物 <input type="checkbox" name="hobby" value="game" />游戏
  <input type="checkbox" name="hobby" value="Java" checked />Java
  <br />
  照片:
  <input type="file" name="file" /><br />
  省份:
  <select name="province">
    <option value="">--请选择--</option>
    <option value="1">山西</option>
    <option value="2">北京</option>
  </select>
  <br />
  自我描述:
  <textarea cols="50" rows="5"></textarea>
  <br />
  <input type="submit" value="提交" />
  <input type="reset" value="清空重填" />
</form>
```
