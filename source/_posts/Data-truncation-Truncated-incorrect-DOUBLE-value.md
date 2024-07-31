---
title: ' Data truncation: Truncated incorrect DOUBLE value'
date: 2022-05-14 01:12:41
tags: [异常处理]
---

使用 update 语句时，出现 Data truncation: Truncated incorrect DOUBLE value

```
org.springframework.dao.DataIntegrityViolationException: PreparedStatementCallback; SQL [update t_user set uname=? and usex=? and uemail=? and upassword=? where uid=?]; Data truncation: Truncated incorrect DOUBLE value: '王五'; nested exception is com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Truncated incorrect DOUBLE value: '王五'
	org.springframework.jdbc.support.SQLStateSQLExceptionTranslator.doTranslate(SQLStateSQLExceptionTranslator.java:104)
	org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:70)
	org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:79)
	org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:79)
	org.springframework.jdbc.core.JdbcTemplate.translateException(JdbcTemplate.java:1541)
	org.springframework.jdbc.core.JdbcTemplate.execute(JdbcTemplate.java:667)
	org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:960)
	org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:1015)
	org.springframework.jdbc.core.JdbcTemplate.update(JdbcTemplate.java:1025)
	org.apache.jsp.doUpdateUser_jsp._jspService(doUpdateUser_jsp.java:138)
	org.apache.jasper.runtime.HttpJspBase.service(HttpJspBase.java:70)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:764)
	org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:465)
	org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:383)
	org.apache.jasper.servlet.JspServlet.service(JspServlet.java:331)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:764)
	org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)
```

也许你只是语句写错了，update 语句中想要更新多个字段的值，应该使用逗号而不是 and 连接
