package com.xuuuuu.unsplashapi;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @Description 打包部署时使用
 * @ClassName MySpringBootServletInitializer.java
 * @Author：Xuuuuucong
 * @Version 1.0
 * @Date：2019/12/26 11:28
 **/
public class MySpringBootServletInitializer extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(UnsplashapiApplication.class);
	}
}
