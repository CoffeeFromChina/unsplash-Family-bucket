package com.xuuuuu.unsplashapi.Service.Impl;

import com.xuuuuu.unsplashapi.Dao.PictureMapper;
import com.xuuuuu.unsplashapi.Dao.PicturePictureMapper;
import com.xuuuuu.unsplashapi.Pojo.Picture;
import com.xuuuuu.unsplashapi.Pojo.PicturePicture;
import com.xuuuuu.unsplashapi.Service.ApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description Servic接口的实现
 * @ClassName ApiServiceimpl.java
 * @Author：Xuuuuucong
 * @Version 1.0
 * @Date：2019/12/25 15:29
 **/
@Service
public class ApiServiceimpl implements ApiService {

	@Autowired
	PictureMapper pictureMapper;

	@Autowired
	PicturePictureMapper picturePictureMapper;

	// 获取所有图片信息
	@Override
	public List<Picture> getALlPicture() {
		return pictureMapper.getAllPicture();
	}

	// 分页获取图片数据
	@Override
	public List<Picture> getLimitPicture(String start, String count) {
		return pictureMapper.getLimitPicture(Integer.parseInt(start), Integer.parseInt(count));
	}

	// 获取全部数据数量
	@Override
	public int getCount() {
		return pictureMapper.getCount();
	}

	// 随机获取 count 条数据
	@Override
	public List<Picture> getRandomPicture(String count) {
		return pictureMapper.getRandomPicture(Integer.parseInt(count));
	}

	// 模糊查询
	@Override
	public List<Picture> getInquire(String query, String start, String count) {
		return pictureMapper.getInquire(query, Integer.parseInt(start), Integer.parseInt(count));
	}

	@Override
	public boolean initUser(String openid) {
		return pictureMapper.initUser(openid);
	}

	@Override
	public boolean insertPictureLike(String uuid, String openid, String picid) {
		return picturePictureMapper.insertPictureLike(uuid, openid, picid);
	}

	@Override
	public List<PicturePicture> selectPictureLike(String openid, String picid) {
		return picturePictureMapper.selectPictureLike(openid, picid);
	}

	@Override
	public List<Picture> getAllLike(String openid, String limitStart, String limitCount) {
		return pictureMapper.getAllLike(openid, Integer.parseInt(limitStart), Integer.parseInt(limitCount));
	}

	@Override
	public List<Picture> getAllWatch(String openid, String limitStart, String limitCount) {
		return pictureMapper.getAllWatch(openid, Integer.parseInt(limitStart), Integer.parseInt(limitCount));
	}

	@Override
	public boolean insertWatch(String id, String openid, String picid) {
		return picturePictureMapper.insertWatch(id, openid, picid);
	}
}
