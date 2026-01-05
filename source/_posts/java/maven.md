---
title: maven
date: 2022-09-20 16:33:53
tags:
---

## 依赖管理

### 依赖冲突问题

- 路径优先:当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
- 声明优先:当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
- 特殊优先:当同级配置了相同资源的不同版本，后配置的覆盖先配置的

### 可选依赖

对外隐藏当前所依赖的资源

```xml
<dependency>
	<groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <optional>true</optional>
</dependency>
```

### 排除依赖

主动断开依赖的资源（此处无需指定版本）

```xml
<dependency>
	<groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <exclusions>
    	<exclusion>
        	<groupId></groupId>
    		<artifactId></artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### 依赖范围

通过`<scope>`标签设置依赖的作用范围

- compile(default): 全局有效`log4j`
- test: 只在测试有效`junit`
- provided: 主程序和测试有效`servlet-api`
- runtime: 只在打包有效`jdbc`

## 项目构建

### 生命周期

1. clean: 清理
2. default: 核心工作，例如编译，测试，打包，部署等
3. site: 产生报告，发布站点

### 聚合

- 作用：用于快速构建 maven 工程，一次性构建多个项目/模块。

- 制作方式：创建一个空模块,打包类型定义为 pom

  ```xml
  <packaging>pom</packaging>
  ```

- 定义当前模块进行构建操作时关联的其他模块名称

  ```xml
  <modules>
      <module>../ proj_controller</module>
      <module>../proj_service</module>
      <module>../proj_dao</module>
      <module>../proj_pojo</module>
  </modules>
  ```

- 注意事项:参与聚合操作的模块最终执行顺序与模块间的依赖关系有关，与配置顺序无关
