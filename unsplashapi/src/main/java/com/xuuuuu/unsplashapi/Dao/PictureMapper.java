package com.xuuuuu.unsplashapi.Dao;

import com.xuuuuu.unsplashapi.Pojo.Picture;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PictureMapper {
    int deleteByPrimaryKey(String id);

    int insert(Picture record);

    int insertSelective(Picture record);

    Picture selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Picture record);

    int updateByPrimaryKey(Picture record);

    // 获取所属照片
	List<Picture> getAllPicture();

	// 分页获取图片信息；使用 int，是因为 Limit 只能用 int 类型数据
	List<Picture> getLimitPicture(@Param("start") int start, @Param("count") int count);

	// 获取全部数据数量
	int getCount();

	// 随机获取 count 条数据
	List<Picture> getRandomPicture(@Param("count") int count);

	// 模糊查询
	List<Picture> getInquire(@Param("query") String query, @Param("start") int start, @Param("count") int count);

	// 插入用户 openid
	boolean initUser(@Param("openid") String openid);

	// 根据用户 openid 获取所有喜欢的图片
	List<Picture> getAllLike(@Param("openid") String openid, @Param("limitStart") int limitStart, @Param("limitCount") int limitCount);

	// 获取用户预览过的图片
	List<Picture> getAllWatch(@Param("openid") String openid, @Param("limitStart") int limitStart, @Param("limitCount") int limitCount);

	// 保存已下载的图片Id
	Boolean downPicture(@Param("picid") String picid);

	// 获取以下载到服务器端的图片数据
	List<Picture> getDown(@Param("limitStart") int limitStart, @Param("limitCount") int limitCount);
}
