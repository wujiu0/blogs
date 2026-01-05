---
title: spring注解开发
date: 2022-03-20 14:01:53
tags: [框架, spring]
---

## Spring 原始注解

Spring 原始注解主要是替代 bean 的配置
注意：使用注解进行开发时，需要在 applicationContext.xml 中配置组件扫描，作用是指定哪个包及其子包下的 Bean 需要进行扫描以便识别使用注解配置的类、字段和方法。

```xml
<context:component-scan base-package="com.example"></context:component-scan>
```

| 注解           | 说明                                                        |
| -------------- | ----------------------------------------------------------- |
| @Component     | 使用在类上实例化 Bean                                       |
| @Controller    | 使用在 web 层类上实例化 Bean                                |
| @Service       | 在 service 层类上实例化 Bean                                |
| @Respository   | 在 dao 层上实例化 Bean                                      |
| @Autowired     | 在字段上用于根据类型依赖注入                                |
| @Qualifier     | 结合@Autowired 一起使用用于根据名称进行依赖注入             |
| @Resource      | 相当于@AutoWired+@Qualifier，按照名称进行注入(`name="xxx"`) |
| @Value         | 注入普通属性(可以使用`${}`)                                 |
| @Scope         | 标注 Bean 的作用范围                                        |
| @PostConstruct | 使用在方法上标注该方法是 Bean 的初始化方法                  |
| @PreDestroy    | 使用在方法上标注该方法是 Bean 的销毁方法                    |

## Spring 新注解

使用 Spring 新注解即可完全替代 xml 配置文件

| 注解            | 说明                                                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| @Configuration  | 用于指定当前类是一个 Spring 配置类                                                                                                           |
| @ComponentScan  | 用于指定 Spring 在初始化容器时要扫描的包。<br>作用和在 Spring 的 xml 配置文件中的`<context:component-scan  base-package="com.example"/>`一样 |
| @Bean           | 使用在方法上，标注该方法的返回值存储到 Spring 容器中(`name="xxx"`)                                                                           |
| @PropertySource | 用于加载 properties 文件("classpath:xxx.properties")                                                                                         |
| @Import         | 用于导入其他配置类                                                                                                                           |
