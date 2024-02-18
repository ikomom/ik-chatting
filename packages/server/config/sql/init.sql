CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL DEFAULT 'test',
  `password` varchar(255) NOT NULL DEFAULT 'e10adc3949ba59abbe56e057f20f883e',
  `status` varchar(255) NOT NULL DEFAULT 'on',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `tag` varchar(255) NOT NULL DEFAULT '',
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `createTime` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `chatting`.`user` (`id`, `username`, `password`, `status`, `tag`, `avatar`, `role`) VALUES ('f7c06673-cdc0-415f-a284-ba47fb641884', 'john', 'e10adc3949ba59abbe56e057f20f883e', 'on', '', 'https://i.pravatar.cc/150?u=fake', 'user');
INSERT INTO `chatting`.`user` (`id`, `username`, `password`, `status`, `tag`, `avatar`, `role`) VALUES ('f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', 'lisa', 'e10adc3949ba59abbe56e057f20f883e', 'on', '', 'https://i.pravatar.cc/150?u=lisa', 'user');

CREATE TABLE IF NOT EXISTS `room` (
  `id` varchar(36) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `roomName` varchar(255) NOT NULL,
  `updateTime` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createTime` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `roomName`) VALUES ('1', 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=1@ashallendesign.co.uk', '哈哈哈', '猪猪大家庭');
INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `roomName`) VALUES ('2', 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=2@ashallendesign.co.uk', '掘金', '掘金群');
INSERT INTO `chatting`.`room` (`id`, `avatar`, `description`, `roomName`) VALUES ('3', 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=3@ashallendesign.co.uk', '黑色星期五', '游戏玩家');

CREATE TABLE IF NOT EXISTS `message` (
  `id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  `userId` varchar(255) NOT NULL,
  `roomId` varchar(255) NOT NULL,
  `updateTime` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createTime` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`) VALUES ('1', '大家好', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1');
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`) VALUES ('2', '我是JOJO', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1');
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`) VALUES ('3', '你好', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1');
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`) VALUES ('4', '天气不错', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '1');

INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`) VALUES ('5', '6', 'f8e71e0b-dbfc-4ae2-82be-3db5af3246b8', '2');
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`) VALUES ('7', '不如', 'f7c06673-cdc0-415f-a284-ba47fb641884', '1');
INSERT INTO `chatting`.`message` (`id`, `content`, `userId`, `roomId`) VALUES ('8', '原神', 'f7c06673-cdc0-415f-a284-ba47fb641884', '2');
