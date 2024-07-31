---
title: spring
date: 2022-03-15 10:39:28
tags: [框架, spring]
---

## 使用步骤

1. 导入坐标

   ```xml
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-context</artifactId>
       <version>${spring.version}</version>
   </dependency>
   ```

2. 创建 Bean

3. 创建 applicationContext.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <beans xmlns="http://www.springframework.org/schema/beans"
   		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   		xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   </beans>
   ```

4. 配置文件

5. 创建`ApplicationContext`对象，调用`getBean()`方法

## 配置文件

### bean 标签配置

用于配置对象交由 Spring 来创建

默认情况下它调用的是类中的无参构造器，如果没有无参构造则无法创建成功

#### 基本属性

- id：bean 实例在 Spring 容器中的唯一标识

- class：bean 的全限定名称

- scope：对象的作用范围，

  - singleton（默认）：单例的

    实例化个数：1 个

    实例化时机：Spring 核心文件被加载时，实例化配置的 Bean 实例

    生命周期：

    - 对象创建：当应用加载，创建容器时，对象就被创建了
    - 对象运行：只要容器在，对象就一直存活
    - 对象销毁：当应用卸载，销毁容器时，对象被销毁

  - prototype：多例的

    实例化个数：多个

    实例化时机：调用 getBean()方法时

    生命周期：

    - 对象创建：使用对象时，创建新的对象实例
    - 对象运行 ：只要对象在使用中，就一直存活
    - 对象销毁：当对象长时间不用时，被 java 的垃圾回收器回收

  - request：WEB 项目中，Spring 创建一个 Bean 的对象，将对象存入到 request 域中

  - session：WEB 项目中，Spring 创建一个 Bean 的对象，将对象存入到 request 域中

  - global session：WEB 项目中，应用在 Portlet 环境，如果没有 Portlet 环境那么 globalSession 相当于 session

- init-method：指定类中的初始化方法名称

- destroy-method：指定类中的销毁方法名称

- 子标签`<prorerty>`：属性注入

  - name 属性：属性名称
  - value 属性：注入普通属性值
  - ref 属性：注入对象引用值
  - `<list>`
  - `<map>`
  - `<properties>`
  - `<contructor>`

#### bean 实例化三种方式

- 无参构造方法实例化

  它会根据默认无参构造方法来创建了类对象，如果 bean 中没有默认无参构造，将会创建失败

  ```xml
  <bean id="userDao" class="com.example.dao.impl.UserDaoImpl">
  ```

- 工厂静态方法实例化

  ```
  public class StaticFactoryBean {
      public static UserDao createUserDao(){
          return new UserDaoImpl();
      }
  }

  <bean id="userDao" class="com.example.factory.StaticFactoryBean" factory-method="createUserDao" />
  ```

- 工厂实例方法实例化

  ```
  public class DynamicFactoryBean {
      public UserDao createUserDao(){
          return new UserDaoImpl();
      }
  }

  <bean id="factoryBean" class="com.example.factory.DynamicFactoryBean"/>
  <bean id="userDao" factory-bean="factoryBean" factory-method="createUserDao"/
  ```

#### bean 的依赖注入

**依赖注入（Dependency Injection）**：它是 Spring 框架核心 IOC 的具体实现

在编写程序时，通过控制反转，把对象的创建交给了 Spring，但是代码中不可能出现没有依赖的情况。
IOC 解耦只是降低他们的依赖关系，但不会消除。
例如：业务层仍会调用持久层的方法。
那这种业务层和持久层的依赖关系，在使用 Spring 之后，就让 Spring 来维护了。
简单的说，就是坐等框架把持久层对象传入业务层，而不用我们自己去获取。

##### 注入方式

- **set 方法注入（\*）**

  1. 首先需要有 setXXX()方法

  2. 配置 Spring 容器调用 set 方法进行注入

     ```xml
     <bean id="userDao" class="com.example.dao.impl.UserDaoImpl"/>
     <bean id="userService" class="com.example.service.impl.UserServiceImpl">
     	<property name="userDao" ref="userDao"/>
     </bean>
     ```

  或者可以使用 P 命名空间引入，本质上也是 set 方法引入，但是更加方便

  1. 引入 P 命名空间

     `xmlns:p="http://www.springframework.org/schema/p"`

  2. 修改注入方式

     ```xml
     <bean id="userService" class="com.example.service.impl.UserServiceImpl" p:userDao-ref="userDao"/>
     ```

- **构造方法注入**

  1. 提供有参构造

  2. 配置 xml

     ```xml
     <bean id="userDao" class="com.example.dao.impl.UserDaoImpl"/>
     <bean id="userService" class="com.example.service.impl.UserServiceImpl">
         <constructor-arg name="userDao" ref="userDao"></constructor-arg>
     </bean>
     ```

##### 注入数据的三种数据类型

- 普通数据类型

  ```xml
  <bean id="userDao" class="com.example.dao.impl.UserDaoImpl">
      <property name="age" value="15"></property>
  </bean>
  ```

- 引用数据类型

- 集合数据类型

  - List 的注入

    ```xml
    <bean id="userDao" class="com.example.dao.impl.UserDaoImpl">
    <!-- String类型的元素-->
        <property name="strList">
            <list>
                <value>aaa</value>
                <value>bbb</value>
                <value>ccc</value>
            </list>
        </property>
        <!--User类型元素-->
        <property name="userList">
                <list>
                    <ref bean="user1"></ref>
                    <ref bean="user2"></ref>
                </list>
            </property>
    </bean>
    ```

  - Map

    ```xml
    <bean id="userDao" class="com.example.dao.impl.UserDaoImpl">
        <property name="userMap">
            <map>
                <entry key="user1" value-ref="u1"/>
                <entry key="user2" value-ref="u2"/>
            </map>
        </property>
    </bean>
    ```

  - properties

    ```xml
    <bean>
        <property name="properties">
            <props>
                <prop key="p1">ppp1</prop>
                <prop key="p2">ppp2</prop>
            </props>
        </property>
    </bean>
    ```

### 引入其他配置文件

实际开发中，Spring 的配置内容非常多，这就导致 Spring 配置很繁杂且体积很大，所以，可以将部分配置拆解到其他配置文件中，而在 Spring 主配置文件通过 import 标签进行加载

```xml
<import resource="applicationContext-xxx.xml"/>
```

### 加载 properties 配置文件

```xml
<context:property-placeholder location="xx.properties"/>


<property name="" value="${key}"/>
```

### 相关 API

- 源码

  ```java
  public Object getBean(String name) throws BeansException {
      assertBeanFactoryActive();
      return getBeanFactory().getBean(name);
  }
  public <T> T getBean(Class<T> requiredType) throws BeansException {
      assertBeanFactoryActive();
      return getBeanFactory().getBean(requiredType);
  }
  ```

  其中，当参数的数据类型是字符串时，表示根据 Bean 的 id 从容器中获得 Bean 实例，返回是 Object，需要强转。
  当参数的数据类型是 Class 类型时，表示根据类型从容器中匹配 Bean 实例，当容器中相同类型的 Bean 有多个时，
  则此方法会报错。

- 使用

  ```java
  ApplicationContext app = new ClasspathXmlApplicationContext("xml文件");
  app.getBean("id");
  app.getBean(Class);
  ```
