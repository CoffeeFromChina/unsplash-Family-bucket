package com.xuuuuu.unsplashapi.Pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Picture {
    private String id;

    private String createdAt;

    private String updatedAt;

    private String width;

    private String height;

    private String description;

    private String urlsRaw;

    private String urlsFull;

    private String urlsRegular;

    private String urlsSmall;

    private String urlsThumb;

    private String likes;

    private String userName;
}
