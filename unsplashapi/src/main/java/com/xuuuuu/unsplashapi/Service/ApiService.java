package com.xuuuuu.unsplashapi.Service;

import com.xuuuuu.unsplashapi.Pojo.Picture;
import com.xuuuuu.unsplashapi.Pojo.PicturePicture;

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

	// 模糊查询
	List<Picture> getInquire(String query, String start, String count);

	// 插入用户openid
	boolean initUser(String openid);

	// 设置喜欢的图片
	boolean insertPictureLike(String uuid, String openid, String picid);

	// 查找喜欢的图片
	List<PicturePicture> selectPictureLike(String openid, String picid);

	// 获取用户收藏的图片
	List<Picture> getAllLike(String openid, String limitStart, String limitCount);

	// 获取用户预览过的图片
	List<Picture> getAllWatch(String openid, String limitStart, String limitCount);

	// 用户预览图片时插入预览记录
	boolean insertWatch(String id, String openid, String picid);

	// 保存已下载的图片Id
	Boolean downPicture(String picid);

	// 获取以下载到服务器端的图片数据
	List<Picture> getDown(String limitStart, String limitCount);
}
