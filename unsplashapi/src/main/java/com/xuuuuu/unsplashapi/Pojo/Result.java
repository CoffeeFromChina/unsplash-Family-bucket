package com.xuuuuu.unsplashapi.Pojo;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

/**
 * @Description 统一API响应结果封装
 * @ClassName Result.java
 * @Author：Xuuuuucong
 * @Version 1.0
 * @Date：2019/12/25 16:28
 **/
@Getter
@Setter
public class Result implements Serializable {
	private int code;
	private String message;
	private Object data;
	public Result setCode(ResultCode resultCode) {
		this.code = resultCode.code;
		return this;
	}
}
