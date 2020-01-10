package com.xuuuuu.unsplashapi.Controller;

import com.xuuuuu.unsplashapi.Pojo.Result;
import com.xuuuuu.unsplashapi.Pojo.ResultGenerator;
import com.xuuuuu.unsplashapi.Service.ApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

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

	// 插入用户openid
	@RequestMapping(value = "/init/{openid}", method = RequestMethod.POST)
	public Result init(@PathVariable("openid") String openid){
		return resultGenerator.genSuccessResult(apiService.initUser(openid));
	}

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

	// 模糊查询
	@RequestMapping(value = "/inquire/{query}/{start}/{count}", method = RequestMethod.GET)
	public Result getInquireInformation(@PathVariable("query") String query, @PathVariable("start") String start, @PathVariable("count") String count){
		return resultGenerator.genSuccessResult(apiService.getInquire(query, start, count));
	}

	// 设置喜欢的图片
	@RequestMapping(value = "/like/{openid}/{picid}", method = RequestMethod.GET)
	public Result isLike(@PathVariable("openid") String openid, @PathVariable("picid") String picid){
		UUID uuid = UUID.randomUUID();
		String id = uuid.toString();
		apiService.insertPictureLike(id ,openid, picid);
		return resultGenerator.genSuccessResult(apiService.selectPictureLike(openid, picid));
	}

	// 用户获取自己喜欢的图片
	@RequestMapping(value = "/allLike/{openid}/{limitStart}/{limitCount}")
	public Result allLike(@PathVariable("openid") String openid, @PathVariable("limitStart") String limitStart, @PathVariable("limitCount") String limitCount){
		return resultGenerator.genSuccessResult(apiService.getAllLike(openid, limitStart, limitCount));
	}

	// 获取用户预览过的图片（点击小眼睛）
	@RequestMapping(value = "/watch/{openid}/{limitStart}/{limitCount}", method = RequestMethod.GET)
	public Result watch(@PathVariable("openid") String openid, @PathVariable("limitStart") String limitStart, @PathVariable("limitCount") String limitCount){
		return resultGenerator.genSuccessResult(apiService.getAllWatch(openid, limitStart, limitCount));
	}

	// 用户预览图片时插入预览记录
	@RequestMapping(value = "/insertWatch/{openid}/{picid}", method = RequestMethod.GET)
	public Result insertWatch(@PathVariable("openid") String openid, @PathVariable("picid") String picid){
		UUID uuid = UUID.randomUUID();
		String id = uuid.toString();
		return resultGenerator.genSuccessResult(apiService.insertWatch(id, openid, picid));
	}
}
