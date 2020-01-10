package com.xuuuuu.unsplashapi.Pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PicturePicture {
    private String openid;

    private String picId;

    private Integer islike;
}
