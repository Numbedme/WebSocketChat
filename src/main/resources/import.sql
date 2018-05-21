INSERT INTO USER (id, image, login) VALUES (1, '../assets/1.png', 'NoName');
INSERT INTO MESSAGE (id, date, message, user_id) VALUES (1, SYSDATE, 'Hello World!', 1);
INSERT INTO CHAT (id, name) VALUES (1, 'Global');
INSERT INTO CHAT_MESSAGES (chat_id, messages_id) VALUES (1, 1);
INSERT INTO CHAT_USERS (chat_id, users_id) VALUES (1, 1);