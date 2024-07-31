---
title: spring异常处理
date: 2022-05-01 18:06:59
tags:
---

1. 使用`@RestControllerAdvice`定义 SpringMVC 异常处理器来处理异常
2. 异常处理器必须被扫描加载

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public R<String> ExceptionHandler(CustomException ex) {
        return R.error(ex.getMessage());
    }

}
```
