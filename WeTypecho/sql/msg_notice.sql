CREATE TABLE `notice` (
  `gid` int(10) NOT NULL AUTO_INCREMENT COMMENT '公告主键',
  `title` varchar(50) DEFAULT NULL COMMENT '公告标题',
  `content` varchar(255) DEFAULT NULL COMMENT '公告内容',
  `addtime` varchar(50) DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
