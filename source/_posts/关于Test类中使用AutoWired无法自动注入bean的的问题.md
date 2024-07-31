---
title: 关于Test类中使用AutoWired无法自动注入bean的的问题
date: 2022-04-14 16:58:48
tags: [问题记录]
---

在 Test 类中使用@AutoWired 注解始终无法获取到 Bean，一直报空指针异常

是需要配置 spring-test 的呀

1. 导入 spring 集成 junit 的坐标

   ```xml
   <!--此处需要注意的是，spring5  及以上版本要求 junit 的版本必须是 4.12 及以上-->
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-test</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   <dependency>
       <groupId>junit</groupId>
       <artifactId>junit</artifactId>
       <version>4.12</version>
       <scope>test</scope>
   </dependency>
   ```

2. 使用@Runwith 注解替换原来的运行期

3. 使用@ContextConfiguration 指定配置文件或配置类

   ```java
   @RunWith(SpringJUnit4ClassRunner.class)
   //加载spring核心配置文件
   //@ContextConfiguration(value = {"classpath:applicationContext.xml"})
   //加载spring核心配置类
   @ContextConfiguration(classes = {SpringConfiguration.class})
   public class SpringJunitTest {
       //...
   }
   ```

4. 使用@AutoWired 注入需要测试的对象

5. 创建测试方法进行测试

   ```java
   @Autowired
   private UserService userService;

   @Test
   public void testUserService(){
       userService.save();
   }
   ```
