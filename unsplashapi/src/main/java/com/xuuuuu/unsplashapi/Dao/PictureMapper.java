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
}
