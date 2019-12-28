package com.xuuuuu.unsplashapi;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.xuuuuu.unsplashapi.Dao")
public class UnsplashapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnsplashapiApplication.class, args);
	}

}
