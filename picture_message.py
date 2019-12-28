import pymysql
import re
import requests
import pprint
import arrow
import time
import os
from os import path
import urllib.request as ur
from multiprocessing import Process


key = 'fa60305aa82e74134cabc7093ef54c8e2c370c47e73152f72371c828daedfcd7'

HEADERS = {
    'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
}
picture_num = 0
pictureMessage = dict()

db = pymysql.connect(
    host='xx.xx.xx.xx',  #host属性
    user='xxxxxxx',  #用户名 
    password='xxxxxxx',  #此处填登录数据库的密码
    db='alilocalhost'  #数据库名
)

cur = db.cursor()

def savePicture(dict_picture):
    for key in dict_picture:
        pid = str(key)
        created_at = str(dict_picture[key]['created_at'])
        updated_at = str(dict_picture[key]['updated_at'])
        width = str(dict_picture[key]['width'])
        height = str(dict_picture[key]['height'])
        description = str(dict_picture[key]['description'])
        urls_raw = str(dict_picture[key]['urls_raw'])
        urls_full = str(dict_picture[key]['urls_full'])
        urls_regular = str(dict_picture[key]['urls_regular'])
        urls_small = str(dict_picture[key]['urls_small'])
        urls_thumb = str(dict_picture[key]['urls_thumb'])
        likes = str(dict_picture[key]['likes'])
        user_name = str(dict_picture[key]['user_name'])

        sql = "INSERT INTO picture_message(id, created_at, updated_at, width, height,\
                description, urls_raw, urls_full, urls_regular, urls_small, urls_thumb, likes, user_name) \
                VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) \
                ON DUPLICATE KEY UPDATE \
                created_at=%s,updated_at=%s, width=%s, height=%s,\
                     description=%s,urls_raw=%s, urls_full=%s, urls_regular=%s,\
                         urls_small=%s,urls_thumb=%s, likes=%s, user_name=%s;"

        cur.execute(sql, (pid, created_at, updated_at, width, height,
                          description, urls_raw, urls_full, urls_regular,
                          urls_small, urls_thumb, likes, user_name, created_at, updated_at, width, height,
                          description, urls_raw, urls_full, urls_regular,
                          urls_small, urls_thumb, likes, user_name))
        db.commit()


def spider():
    for page in range(2000, 5200, 1):
        url = 'https://api.unsplash.com/photos/?client_id={}&page={}&per_page=30&order_by=popular'.format(  # 每页最大似乎是30
            key, page)
        response = requests.get(url, headers=HEADERS)
        json = response.json()
        print('正在抓取第{}页信息'.format(page))

        # 封装数据到字典。每次下载30张
        for num in range(0, 30, 1):
            created_at = arrow.get(json[num]['created_at'])
            updated_at = arrow.get(json[num]['updated_at'])  # 时间戳转换

            # 封装带个图片参数
            pictureMessage['%s' % json[num]['id']] = {
                'created_at': created_at.format('YYYY-MM-DD HH:mm:ss'),
                'updated_at': updated_at.format('YYYY-MM-DD HH:mm:ss'),
                'width': str(json[num]['width']),
                'height': str(json[num]['height']),
                'description': json[num]['alt_description'],
                'urls_raw': json[num]['urls']['raw'],  # 下载原图
                'urls_full': json[num]['urls']['full'],
                'urls_regular': json[num]['urls']['regular'],
                'urls_small': json[num]['urls']['small'],
                'urls_thumb': json[num]['urls']['thumb'],
                'likes': str(json[num]['likes']),
                'user_name': json[num]['user']['name'],
            }
        pprint.pprint(pictureMessage)
        savePicture(pictureMessage)
        pictureMessage.clear()  # 清空字典
        time.sleep(5)  			# 暂停
    cur.close()
    db.close()

if __name__ == "__main__":
    spider()