INSERT INTO `chatting`.`user` (`id`, `username`, `password`, `status`, `tag`, `createTime`, `avatar`, `role`) VALUES ('f7c06673-cdc0-415f-a284-ba47fb641884', 'john', 'e10adc3949ba59abbe56e057f20f883e', 'on', '', 1693214147828, 'avatar19.png', 'user');
INSERT INTO `chatting`.`user` (`id`, `username`, `password`, `status`, `tag`, `createTime`, `avatar`, `role`) VALUES ('f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', 'lisa', 'e10adc3949ba59abbe56e057f20f883e', 'on', '', 1703663536183, 'avatar11.png', 'user');

INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `createTime`, `roomName`) VALUES ('1', 'https://i.pravatar.cc/300', '哈哈哈', 20231227064317, '猪猪大家庭');
INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `createTime`, `roomName`) VALUES ('2', 'https://i.pravatar.cc/300', '掘金', 20231227064317, '掘金群');
INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `createTime`, `roomName`) VALUES ('3', 'https://i.pravatar.cc/300', '黑色星期五', 20231227064317, '游戏玩家');

INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('1', '大家好', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1', 1693194066969);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('2', '我是JOJO', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1', 1693194066969);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('3', '你好', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1', 1693199630718);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('4', '天气不错', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1', 1693200027432);

INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('5', '6', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1', CURRENT_TIMESTAMP);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('7', '不如', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1', CURRENT_TIMESTAMP);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('8', '原神', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1', CURRENT_TIMESTAMP);
