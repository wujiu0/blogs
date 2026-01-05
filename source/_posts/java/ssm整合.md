---
title: ssm整合
date: 2022-04-13 13:33:13
tags: [后端, 框架]
---

1. 将 SQLSessionFactory 配置到 Spring 容器中

   ```xml
   <!--加载jdbc.properties-->
   <context:property-placeholder location="classpath:jdbc.properties"/>
   <!--配置数据源-->
   <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
       <property name="driverClass" value="${jdbc.driver}"/>
       <property name="jdbcUrl" value="${jdbc.url}"/>
       <property name="user" value="${jdbc.username}"/>
       <property name="password" value="${jdbc.password}"/>
   </bean>
   <!--配置MyBatis的SqlSessionFactory-->
   <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
       <property name="dataSource" ref="dataSource"/>
       <property name="configLocation" value="classpath:sqlMapConfig.xml"/>
   </bean>
   ```

2. 扫描 Mapper，让 Spring 容器产生 Mapper 实现类。

   ```xml
   <!--配置Mapper扫描-->
   <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
       <property name="basePackage" value="com.example.mapper"/>
   </bean>
   ```

3. 配置声明式事务控制

   ```xml
   <!--配置声明式事务控制-->
   <bean id="transacionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
       <property name="dataSource" ref="dataSource"/>
   </bean>
   <tx:advice id="txAdvice" transaction-manager="transacionManager">
       <tx:attributes>
           <tx:method name="*"/>
       </tx:attributes>
   </tx:advice>
   <aop:config>
       <aop:pointcut id="txPointcut" expression="execution(*com.example.service.impl.*.*(..))"/>
       <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut"/>
   </aop:config>
   ```

4. 修改 Service 实现类代码

   ```java
   @Service("accountService")
   public class AccountServiceImpl implements AccountService {
       @Autowired
       private AccountMapper accountMapper;

       public void save(Account account) {
           accountMapper.save(account);
       }

       public List<Account> selectAll() {
           return accountMapper.selectAll();
       }
   }
   ```

## 模板源码（ssm 整合 ）

https://github.com/wujiu0/ssm-template
