---
title: JavaScript
date: 2023-02-25 23:13:21
tags:
---

## 常量

使用 const 声明的变量

注意：常量不允许重新赋值, 声明的时候必须赋值（初始化）

## 数据类型

### 基本数据类型

值类型/简单数据类型/基本数据类型, 在存储时变量中存储的是值本身, 因此叫做值类型

- number 数字型

  js 中的所有数字统称为数字类型

  NaN 表示一个计算错误, 是一个不正确的或者一个未定义的数学操作所得到的结果

  > NaN 是粘性的, 任何对 NaN 的操作都会返回 NaN
  >
  > 减法 - （像大多数数学运算一样）只能用于数字, 它会使空字符串 "" 转换为 0
  >
  > undefined 经过数字转换之后会变为 NaN
  >
  > null 经过数字转换之后会变为 0

  - toFixed() 设置保留小数位的长度

- string 字符串型

  ```
  使用单引号'',双引号"", 反引号``
  ```

  模板字符串, 可以使拼接字符串更简便：用反引号包含数据, 用${}使用变量

  ```
  `我今年${age}岁了`
  ```

  > `trim()`去头尾空格

- boolean 布尔型

  > 空字符串''、数字 0、undefined、null、false、NaN 转换为布尔值后都是 false, 其余则为 true

- undefined 未定义型

  只声明变量, 不赋值的情况下, 变量的默认值为 undefined,

- null 空类型

  把 null 作为尚未创建的对象

  #### 类型转换

  - 转换为数字型：

    - Number(数据)：转成数字类型

      如果字符串内容里有非数字, 转换失败, 结果为 NaN

    - parseInt(数据)：只保留整数

      ```js
      parseInt('2a'); // 2
      ```

    - parseFloat(数据)：保留小数

  - 转换为字符型

    - String(数据)
    - 变量.toString(进制)

### 引用类型

复杂数据类型, 在存储时变量中存储的仅仅是地址（引用）, 因此叫做引用数据类型

通过 new 关键字创建的对象（系统对象、自定义对象）, 如 Object、Array、Date 等

### 数组

数组并不是一种单独的类型，也属于 Object 对象的范畴

#### 声明：

`let arr = [elem1, elem2]`

#### APIs

- Array.from() 伪数组转换为真数组

* push(元素 1, ..., 元素 n); // 将一个或多个元素添加到数组末尾, 并返回该数组的新长度

* unshift(元素 1, ..., 元素 n); // 将一个或多个元素添加到数组的开头, 并返回该数组的新长度

* pop(); // 从数组中删除最后一个元素, 并返回该元素的值

* shift(); // 从数组中删除第一个元素, 并返回该元素的值

* splice(start, deleteCount); // 从指定位置开始删除指定个数元素

  - start:指定修改的开始位置（从 0 计数）

  - deleteCount：表示要移除的数组元素的个数
    可选的。 如果省略则默认从指定的起始位置删
    除到最后

* sort()

  ```js
  let arr = [4,2,5,1,3];
  // 升序
  arr.sort(function (a,b) {
    	return a -b;
  });
  // 降序
  arr.sort(funtion (a, b){
  	return b - a;
  })
  ```

* forEach() 可用来遍历数组

  ```js
  arr.forEach(function(currentValue[, index]){ })
  ```

  - currentValue:当前数组元素
  - index：当前元素索引号

* map() 可以处理数据，并且返回新的数组

  ~~~js
  arr.map(function(item, index){ return item + 1; })
  ~~~

* filter() 筛选数组

  ```js
  arr.filter(function(currentValue[, index]){ return currentValue > 1; })
  ```

  - 返回值：数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组

* reduce(function(previousValue, currentValue[, currentIndex] [, array]) { /_ … _/ }[, initialValue]) 返回函数累计处理的结果，经常用于求和等

  ```js
  const total = arr.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 1);
  ```

  - 如果有起始值，则以起始值为准开始累计， 累计值 = 起始值
  - 如果没有起始值， 则累计值以数组的第一个数组元素作为起始值开始累计
  - 后面每次遍历就会用后面的数组元素 累计到累计值里面 （类似求和里面的 sum ）
  
* join(str) 用于把数组中的所有元素转换一个字符串

  + str: 数组元素是通过参数里面指定的分隔符进行分隔的

* find() 查找元素,

  + 返回值：返回符合测试条件的第一个数组元素值，

    如果没有符合条件的则返回 undefined

* every() 检测数组所有元素是否都符合指定条件，

  + 如果所有元素都通过检测返回 true，否则返回 false

* some() 检测数组中的元素是否满足指定条件  

  + 如果数组中有元素满足条件返回 true，否则返回 false

* concat() 合并两个数组，返回生成新数组

* reverse() 反转数组





### 对象：

对象由属性和方法组成。

#### 声明创建：

- 使用字面量

```js
let obj = {
  key: value,
  f: function () {
    // 方法体
  },
};
```

> 属性和值用: 隔开
>
> 多个属性用, 隔开
>
> 属性名可以用'' 或"" , 一般情况省略, 除非遇到特殊符号

- 利用 new Object 创建

  ```js
  const obj = new Object({ name: 'wujiu' });
  ```

- 使用构造函数

#### 使用：

- 访问：`对象名.属性名`

  也可以通过`对象['属性名']`

  > 使用[]访问时, 如果不加引号, 会当作变量来解析

- 修改：`对象名.属性名 = 值;`

- 添加：`对象名.新属性名 = 值;`

- 删除：`delete 对象名.属性名`

#### 遍历对象(for in)

**`for...in`** **语句**以任意顺序迭代一个对象的除[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)以外的[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)属性, 包括继承的可枚举属性。

```js
for (let key in object) {
  console.log(key);
  console.log(object);
}
```

### 内置对象

JavaScript 内部提供的对象, 包含各种属性和方法给开发者调用

##### Math

Math 对象是 JavaScript 提供的一个“数学”对象, 提供了一系列做数学运算的方法

- random()：生成 0-1 之间的随机数（包含 0 不包括 1）
- ceil()：向上取整
- floor()：向下取整
- max()：找最大数
- min()：找最小数
- pow()：幂运算
- abs()：绝对值

###### 如何生成 N-M 之间的随机数

`Math.floor(Math.random() * (M - N + 1)) +N`

### 检测数据类型

typeof 运算符可以返回被检测的数据类型。

1. 作为运算符 typeof x （常用）

2. 作为函数 typeof(x)

   > 结果是相同的

## 运算符优先级

![image-20230228175105792](./JavaScript/image-20230228175105792.png)

## 函数（function）

### 声明

```js
function 函数名(参数1, 参数n) {
  // 函数体
  return xxx; // 可选
}
```

> - 命名规范：和变量命名基本一致, 小驼峰
> - 实参的个数和形参的个数可以不一致
>   - 如果形参过多 会自动填上 undefined
>   - 如果实参过多 那么多余的实参会被忽略
> - 若不指定返回值, 函数默认返回值为 undefined

可以手动指定参数的默认值

```js
function 函数名(参数1 = 0, 参数n = 0) {
  // 函数体
}
```

### 调用

```js
函数名();
```

### 匿名函数

函数可以分为具名函数和匿名函数

- 函数表达式

  将匿名函数赋值给一个变量, 并且通过变量名称进行调用 我们将这个称为函数表达式

  ```js
  let fn = function (a, b) {
    // 函数体
  };

  fn(); // 调用
  ```

- 立即执行函数

  ```js
  (function () {
    // 函数体
  })();
  
  (function () {
    // 函数体
  })();
  ```

  > 该方式可以防止变量污染
  >
  > 多个立即执行函数之间必须使用分号隔开

### 动态参数

arguments 是函数内部内置的伪数组变量, 它包含了调用函数时传入的所有实参

注：

1. arguments 是一个伪数组, 只存在于函数中
2. arguments 的作用是动态获取函数的实参
3. 可以通过 for 循环依次得到传递过来的实参

### 剩余参数

剩余参数允许我们将一个不定数量的参数表示为一个数组

1. `...` 是语法符号, 置于最末函数形参之前, 用于获取多余的实参

2. 借助 `...` 获取的剩余实参, 是个真数组

   ```js
   function getSum(...other) {
     console.log(other);
     // 得到[1, 2, 3]
   }
   getSum(1, 2, 3);
   ```

### 展开运算符

`...`, 能将一个数组进行展开(不会修改原数组)

```js
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// 将 arr2 中的元素插入到 arr1 的开头
Array.prototype.unshift.apply(arr1, arr2); // arr1 现在是 [3, 4, 5, 0, 1, 2]

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr2, ...arr1]; // arr1 现在为 [3, 4, 5, 0, 1, 2]
```

> 注意:这里使用展开语法创建了一个新的 `arr1` 数组, `Array.unshift` 方法则是修改了原本存在的 `arr1` 数组

## 构造函数

是一种特殊的函数，主要用来初始化对象

1. 命名一般以大写字母开头。
2. 构造函数在技术上是常规函数。由 "new" 操作符来执行。
3. 构造函数内部无需写 return，返回值即为新创建的对象
4. 使用 new 关键字调用会使函数内部的 this 指向新实例化的对象

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p = new Person('zhangsan', 18);
```

### 实例化执行过程

1. 创建新对象
2. 构造函数 this 指向新对象
3. 执行构造函数代码，修改 this，添加新属性
4. 返回新对象

### 实例成员&静态成员

通过构造函数创建的对象称为实例对象，实例对象中的属性和方法称为实例成员。通过实例对象调用

构造函数的属性和方法被称为静态成员，直接通过构造函数调用

```js
obj.method();
Object.method();
```

## 常用方法

### Object

- Object.keys(obj) 获取对象中的所有属性键（key）

  - 返回的是一个数组

- Object.vaules(obj) 获取对象中所有的属性值

  - 返回的是一个数组

- Object.assign(target, src) 用于对象拷贝,经常使用的场景给对象添加属性

  ```js
  const o = {name: 'zhangsan', age: 6 }
  Object.assign(o, gender: '男')
  ```

### String

1. 实例属性 `length` 用来获取字符串的度长
2. 实例方法 `split('分隔符')` 用来将字符串拆分成数组
3. 实例方法 `substring（需要截取的第一个字符的索引[,结束的索引号]）` 用于字符串截取
4. 实例方法 `startsWith(检测字符串[, 检测位置索引号])` 检测是否以某字符开头
5. 实例方法 `includes(搜索的字符串[, 检测位置索引号])` 判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false
6. 实例方法 `toUpperCase` 用于将字母转换成大写
7. 实例方法 `toLowerCase` 用于将就转换成小写
8. 实例方法 `indexOf`  检测是否包含某字符
9. 实例方法 `endsWith` 检测是否以某字符结尾
10. 实例方法 `replace` 用于替换字符串，支持正则匹配
11. 实例方法 `match` 用于查找字符串，支持正则匹配

## 作用域

- 全局作用域：`<script>` 标签和 `.js` 文件的 〖 最外层 〗 就是所谓的全局作用域

  > 全局作用域中声明的变量 , 任何其它作用域都可以被访问
  >
  > 为 window 对象动态添加的属性默认也是全局的 , 不推荐 ！
  > 函数中未使用任何关键字声明的变量为全局变量 , 不推荐 ！ ！ ！
  > 尽可能少的声明全局变量 , 防止全局变量被污染

- 局部作用域

  - 函数作用域：在函数内部声明的变量只能在函数内部被访问 , 外部无法直接访问

    > 函数的参数也是函数内部的局部变量
    >
    > 函数执行完毕后 , 函数内部的变量实际被清空了

  - 块作用域：在 JavaScript 中使用 `{}` 包裹的代码称为代码块 , 代码块内部声明的变量外部将 〖 有可能 〗 无法被访问 。

    > let , const 声明的变量会产生块作用域 , var 不会产生块作用域

  作用于函数内的代码环境, 就是局部作用域。 因为跟函数有关系, 所以也称为函数作用域。

- 作用域链

  作用域链本质上是底层的变量查找机制 。

  1. 在函数被执行时 , 会优先查找当前函数作用域中查找变量
  2. 如果当前作用域查找不到则会依次逐级查找父级作用域直到全局作用域

  > 总结
  >
  > 1. 嵌套关系的作用域串联起来形成了作用域链
  > 2. 相同作用域链中按着从小到大的规则查找变量
  > 3. 子作用域能够访问父作用域 , 父级作用域无法访问子级作用域

## 变量提升

注意：

1. 变量在未声明即被访问时会报语法错误

2. 变量在 var 声明之前即被访问, 变量的值为 undefined

3. let/const 声明的变量不存在变量提升

4. 变量提升出现在相同作用域当中

   > 实际开发中推荐先声明再访问变量

## 函数提升

函数提升与变量提升比较类似, 是指函数在声明之前即可被调用

注意：

1. 函数提升能够使函数的声明调用更灵活
2. 函数表达式不存在提升的现象
3. 函数提升出现在相同作用域当中

## 垃圾回收机制

垃圾回收机制(Garbage Collection) 简称 GC

### 内存的生命周期

1. 内存分配：当我们声明变量、函数、对象的时候, 系统会自动为他们分配内存
2. 内存使用：即读写内存, 也就是使用变量、函数等
3. 内存回收：使用完毕, 由垃圾回收自动回收不再使用的内存
4. 说明：
   - 全局变量一般不会回收(关闭页面回收)；
   - 一般情况下局部变量的值, 不用了会被自动回收掉

### 算法

#### 引用计数

引用计数算法, 定义“内存不再使用”, 就是看一个对象是否有指向它的引用, 没有引用了就回收对象

1. 跟踪记录被引用的次数
2. 如果被引用了一次, 那么就记录次数 1,多次引用会累加 ++
3. 如果减少一个引用就减 1 --
4. 如果引用次数是 0 , 则释放内存

> 引用计数算法存在一个致命的问题：嵌套引用（循环引用）
> 如果两个对象相互引用, 尽管他们已不再使用, 垃圾回收器不会进行回收, 导致内存泄露。
> 因为他们的引用次数永远不会是 0。这样的相互引用如果说很大量的存在就会导致大量的内存泄露
>
> ```js
> function fn() {
>   let o1 = {};
>   let o2 = {};
>   o1.a = o2;
>   o2.a = o1;
>   return '引用计数无法回收';
> }
> fn();
> ```

#### 标记清除法

现代浏览器通用的大多是基于标记清除算法的某些改进算法, 总体思想都是一致的。

1. 标记清除算法将“不再使用的对象”定义为“无法达到的对象”。
2. 就是从根部（在 JS 中就是全局对象）出发定时扫描内存中的对象。 凡是能从根部到达的对象, 都是还需要使用的。
3. 那些无法由根部出发触及到的对象被标记为不再使用, 稍后进行回收。

![image-20230316142927773](./JavaScript/image-20230316142927773.png)

## 闭包

一个函数对周围状态的引用捆绑在一起, 内层函数中访问到其外层函数的作用域
简单理解：闭包 = 内层函数 + 外层函数的变量

### 作用

封闭数据, 提供操作, 外部也可以访问函数内部的变量
闭包的基本格式:

```js
function makeFunc() {
    let name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();

// 简约写法
function makeFunc() {
    let name = "Mozilla";
    return displayName() {
        alert(name);
    }
}
const myFunc = makeFunc();
myFunc();

```

## 解构赋值

### 数组解构

数组解构是将数组的单元值快速批量赋值给一系列变量的简洁语法

1. 赋值运算符 = 左侧的 [] 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
2. 变量的顺序对应数组单元值的位置依次进行赋值操作

```js
const [a, b] = array;
const [a = aDefault, b] = array;
const [a, , b] = array;
const [a, b, ...rest] = array;
const [a, , b, ...rest] = array;
const [a, b, ...[c, d]] = array;
```

### 对象解构

1. 赋值运算符 = 左侧的 {} 用于批量声明变量, 右侧对象的属性值将被赋值给左侧的变量
2. 对象属性的值将被赋值给与属性名相同的变量, 注意解构的变量名不要和外面的变量名冲突否则报错
3. 对象中找不到与变量名一致的属性时变量值为 undefined
4. 可以从一个对象中提取变量并同时修改新的变量名

```js
const { a, b } = obj;
const { a: a1, b: b1 } = obj;
const { a: a1 = aDefault, b = bDefault } = obj;
const { a, b, ...rest } = obj;
const { a: a1, b: b1, ...rest } = obj;
const { [key]: a } = obj;
```

## 原型

### 原型对象

JavaScript 规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象，所以我们也称为原型对象

- 这个对象可以挂载函数，对象实例化不会多次创建原型上函数，节约内存
- 我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法。
- 构造函数和原型对象中的 this 都指向 实例化的对象

### constructor 属性

每个原型对象里面都有个`constructor` 属性，该属性指向该原型对象的构造函数

> 如果有多个对象的方法，我们可以给原型对象采取对象形式赋值.
> 但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor 就不再指向当前构造函数了
> 此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。

### 对象原型

每一个对象都有一个属性`__proto__`指向构造函数的 prototype 原型对象，对象可以使用构造函数原型对象的属性和方法，就是因为对象因为`__proto__`原型的存在

注意：

- `__proto__` 是 JS 非标准属性, 推荐使用`Object.getPrototypeOf(obj)`
- `[[prototype]]`和`__proto__`意义相同
- 用来表明当前实例对象指向哪个原型对象 prototype
- `__proto__`对象原型里面也有一个 constructor 属性，指向创建该实例对象的构造函数

![image-20230403021928834](./JavaScript/image-20230403021928834.png)

### 原型继承

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.speak = function () {};
}
function Teacher() {
  this.teach = function () {};
}
function Student() {}
Teacher.prototype = new Person();
Teacher.prototype.contrustor = Teacher;
Student.prototype = new Person();
Student.protytype.contrustor = Student;
```

### 原型链

基于原型对象的继承使得不同构造函数的原型对象关联在一起，并且这种关联的关系是一种链状的结构，我们将原型对象的链状结构关系称为原型链

![image-20230403023531935](./JavaScript/image-20230403023531935.png)

1. 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。
2. 如果没有就查找它的原型（也就是 **proto**指向的 prototype 原型对象）
3. 如果还没有就查找原型对象的原型（Object 的原型对象）
4. 依此类推一直找到 Object 为止（null）
5. `__proto__`对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线
6. 可以使用 instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

## 改变this指向的方法

+ call()

  使用 call 方法调用函数，同时指定被调用函数中 this 的值

  `fn.call(thisArg[, arg1, arg2, ...])`

  + thisArg: 在fn函数运行时指定的this值
  + arg1,arg2: 传递的其他参数
  + 返回值就是函数的返回值，因为call方法本身就是在调用函数

+ apply()

  使用 apply 方法调用函数，同时指定被调用函数中 this 的值 

  `fn.apply(thisArg[, argsArray])`

  + thisArg: 在fn函数运行时指定的this值
  + argArray: 传递的其他参数，必须包含在数组内

+ bind()

  bind() 方法不会调用函数。但是能改变函数内部this 指向

  `fn.bind(thisArg[, arg1, arg2, ...])`

  + thisArg: 在fn函数运行时指定的this值
  + arg1,arg2: 传递的其他参数
  + 返回值：指定的this值和初始化参数改造的原函数拷贝(新函数)

  > 因此当我们只是想改变 this 指向，并且不想调用这个函数的时候，可以使用 bind，比如改变定时器内部的this指向.

## 对象深浅拷贝

### 直接赋值

直接赋值的方法，只要是对象，都会相互影响，因为是直接拷贝对象栈里面的地址

### 浅拷贝

常见方法：

+ 拷贝对象：`Object.assgin()` /展开运算符 {...obj}
+ 拷贝数组：`Array.prototype.concat()`/ [...arr]

如果是简单数据类型拷贝值，引用数据类型拷贝的是地址

> 浅拷贝如果是一层对象，不相互影响，如果出现多层对象拷贝还会相互影响

### 深拷贝

拷贝的是对象的属性值，不是地址

### 递归实现

~~~js
function deepClone(target, src) {
    for (let key in src) {
      if (src[key] instanceof Array) {
        target[key] = [];
        deepClone(target[key], src[key]);
      } else if (src[key] instanceof Object) {
        target[key] = {};
        deepClone(target[key], src[key]);
      } else {
        console.log(key);
        target[key] = src[key];
      }
    }
}
~~~

### 通过JSON转换方式实现

~~~js
JSON.parse(JSON.stringify(obj));
~~~

> 拷贝函数类型会出错



## 节流和防抖

防抖(debounce)
所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

所谓节流(throttle)，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率

### 使用场景

+ 节流: 鼠标移动，页面尺寸发生变化，滚动条滚动等开销比较
  大的情况下

+ 防抖: 搜索框输入，设定每次输入完毕n秒后发送请求，如果期
  间还有输入，则从新计算时间

```js
function debounce(func, wait) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

function throttle(func, wait) {
    let timer;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}
```

> 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
> 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
