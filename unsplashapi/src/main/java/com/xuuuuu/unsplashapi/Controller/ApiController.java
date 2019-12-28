package com.xuuuuu.unsplashapi.Controller;

import com.xuuuuu.unsplashapi.Pojo.Result;
import com.xuuuuu.unsplashapi.Pojo.ResultGenerator;
import com.xuuuuu.unsplashapi.Service.ApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

/**
 * @Description API
 * @ClassName ApiController.java
 * @Author：Xuuuuucong
 * @Version 1.0
 * @Date：2019/12/25 15:28
 **/
@RestController
@Slf4j
public class ApiController {

	@Autowired
	ApiService apiService;

	@Autowired
	ResultGenerator resultGenerator;

	// 返回全部数据
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Result index() {
		return resultGenerator.genSuccessResult(apiService.getALlPicture());
	}

	// 分页返回数据
	@RequestMapping(value = "/limit/{start}/{count}", method = RequestMethod.GET)
	public Result index(@PathVariable("start") String start, @PathVariable("count") String count) {
		return resultGenerator.genSuccessResult(apiService.getLimitPicture(start, count));
	}

	// 返回全部数据数量
	@RequestMapping(value = "/total", method = RequestMethod.GET)
	public Result total() {
		return resultGenerator.genSuccessResult(apiService.getCount());
	}

	// 随机获取多条数据
	@RequestMapping(value = "/random/{count}", method = RequestMethod.GET)
	public Result gerRandomCount(@PathVariable("count") String count) {
		return resultGenerator.genSuccessResult(apiService.getRandomPicture(count));
	}
}
