package com.xuuuuu.unsplashapi.Service;

import com.xuuuuu.unsplashapi.Pojo.Picture;

import java.util.List;

/**
 * @Description 返回各种数据
 * @ClassName ApiService.java
 * @Author：Xuuuuucong
 * @Version 1.0
 * @Date：2019/12/25 15:29
 **/
public interface ApiService {

	// 获取所有图片信息
	List<Picture> getALlPicture();

	// 分页获取图片信息
	List<Picture> getLimitPicture(String start, String count);

	// 获取全部数据数量
	int getCount();

	// 随机获取count条数据
	List<Picture> getRandomPicture(String count);
}
