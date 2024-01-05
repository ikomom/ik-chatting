INSERT INTO `chatting`.`user` (`id`, `username`, `password`, `status`, `tag`, `createTime`, `avatar`, `role`) VALUES ('f7c06673-cdc0-415f-a284-ba47fb641884', 'john', 'e10adc3949ba59abbe56e057f20f883e', 'on', '', 1693214147828, 'https://i.pravatar.cc/150?u=fake', 'user');
INSERT INTO `chatting`.`user` (`id`, `username`, `password`, `status`, `tag`, `createTime`, `avatar`, `role`) VALUES ('f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', 'lisa', 'e10adc3949ba59abbe56e057f20f883e', 'on', '', 1703663536183, 'https://i.pravatar.cc/150?u=lisa', 'user');

INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `createTime`, `roomName`) VALUES ('1', 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=1@ashallendesign.co.uk', '哈哈哈', 1, '猪猪大家庭');
INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `createTime`, `roomName`) VALUES ('2', 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=2@ashallendesign.co.uk', '掘金', 2, '掘金群');
INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `createTime`, `roomName`) VALUES ('3', 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=3@ashallendesign.co.uk', '黑色星期五', 3, '游戏玩家');

INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('1', '大家好', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1', 1);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('2', '我是JOJO', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1', 2);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('3', '你好', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1', 3);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('4', '天气不错', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1', 4);

INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('5', '6', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1', 15);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('7', '不如', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1', 5);
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`, `createTime`) VALUES ('8', '原神', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1', 6);
