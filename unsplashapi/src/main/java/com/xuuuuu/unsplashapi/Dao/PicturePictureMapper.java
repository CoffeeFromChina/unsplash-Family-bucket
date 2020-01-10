package com.xuuuuu.unsplashapi.Dao;

import com.xuuuuu.unsplashapi.Pojo.PicturePicture;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PicturePictureMapper {
    int deleteByPrimaryKey(String openid);

    int insert(PicturePicture record);

    int insertSelective(PicturePicture record);

    PicturePicture selectByPrimaryKey(String openid);

    int updateByPrimaryKeySelective(PicturePicture record);

    int updateByPrimaryKey(PicturePicture record);

    // 设置喜欢的图片
    boolean insertPictureLike(@Param("uuid") String uuid, @Param("openid") String openid, @Param("picid") String picid);

    // 查找喜欢的图片（单个）
    List<PicturePicture> selectPictureLike(@Param("openid") String openid, @Param("picid")String picid);
}
