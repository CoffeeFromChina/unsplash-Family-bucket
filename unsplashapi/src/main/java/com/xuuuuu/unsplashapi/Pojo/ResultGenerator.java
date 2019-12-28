package com.xuuuuu.unsplashapi.Pojo;

import org.springframework.stereotype.Component;

/**
 * @Description 响应结果生成工具
 * @ClassName ResultGenerator.java
 * @Author：Xuuuuucong
 * @Version 1.0
 * @Date：2019/12/25 16:34
 **/
@Component
public class ResultGenerator {
	private static final String DEFAULT_SUCCESS_MESSAGE = "SUCCESS";

	public static Result genSuccessResult(){
		Result result = new Result();
		result.setCode(ResultCode.SUCCESS);
		result.setMessage(DEFAULT_SUCCESS_MESSAGE);
		return result;
	}

	public static Result genSuccessResult(Object data) {
		Result result = new Result();
		result.setCode(ResultCode.SUCCESS);
		result.setMessage(DEFAULT_SUCCESS_MESSAGE);
		result.setData(data);
		return result;
	}

	public static Result genFailResult(String message) {
		Result result = new Result();
		result.setCode(ResultCode.FAIL);
		result.setMessage(message);
		return result;
	}

}
