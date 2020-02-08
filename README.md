# WecahtTypecho
##### 这是一套为 Typecho 量身定制的小程序，实时同步你的博客内容！

##### WechatTypecho为小程序源码 WeTypecho为Typecho插件


### 介绍：

>  `WchatTypecho` 能帮您快速搭建微信小程序，将`Typecho`博客的内容映射到微信小程序，
> 与您的网站信息时时同步。帮助您在一定程度上获取更多来自微信的流量 

### 演示：

扫码查看

![](/images/xcx.jpg)

> 首页 

![]()

> 热门排行

![]()

> 文章详情

![]()

> 关于我的

![]()

## 安装须知

微信官方规定必须满足以下两个条件才能上线小程序：

> 1.域名**已备案**
> 2.域名开启Https

## 安装Typecho

如果你已经知道什么是Typecho，并且已经部署在你的网站上了，还需要做两件事：

> 1.设置固定链接
> 2.开启Https

## 安装并设置WeTypecho插件

首先[下载WechatTypecho](https://github.com/wxy1997/WechatTypecho)
然后将根目录下的WeTypecho上传至/usr/plugins目录下。
然后进入Typecho后台插件管理(控制台->插件)，启用WeTypecho插件，然后点设置：
API密钥自己设置，小程序APPID需要到微信小程序后台去查看



## 小程序端配置

下载的根目录下的WechatTypecho文件夹就是小程序的源代码
进入WechatTypecho目录，根目录下有一个config.js,打开编辑

将domain设置为你的域名，不需要加http 或者 [https://.](https://./)
name修改为你的网站名称，用于小程序页脚显示。
**API_SECRET必须与WeTypecho插件中的API密钥配置一样**
保存关闭。然后打开根目录下的app.json

修改这个值保存。
然后打开Template目录下的foot.wxml
修改页脚版权：

至此小程序端的配置就完成了。
然后去微信官方小程序平台，设置->开发设置，服务器域名。


将你的域名添加进去，如果你的图片等资源存放的地址不是你上面设置的域名
还需要将你的图片资源域名添加进去，否则小程序端可能无法显示资源。

保存后。用微信开发者工具（[下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)）打开WeTypecho下的wetypecho目录，就能正常使用了。



> 如果有任何问题请给我留言。邮箱wxyrrcj@gmail.com  博客：www.wxy97.com
>
> 本项目后期会一直进行更新和维护！

### 感谢
- 感谢开源HiTypecho博客的分享
- 感谢开源WeTypecho博客的分享
- 感谢成都第七帅博客的分享
- 感谢color开发框架的分享
- 感谢广大网友的反馈意见


