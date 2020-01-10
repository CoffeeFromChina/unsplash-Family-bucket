package com.xuuuuu.unsplashapi.Dao;

import com.xuuuuu.unsplashapi.Pojo.PictureId;

public interface PictureIdMapper {
    int deleteByPrimaryKey(String openid);

    int insert(PictureId record);

    int insertSelective(PictureId record);
}