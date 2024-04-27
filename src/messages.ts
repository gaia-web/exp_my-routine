type messageType = {
  hello: string;
  intro: string;
  listExample: string;
  literalExample: string;
  linkExample: string;
};

export const EN_MESSAGE: { message: messageType } = {
  message: {
    hello: "hello",
    intro: "Clilck bottom {msg1} + to add new {msg2} routine",
    listExample: "list {0} routine",
    literalExample: "Email: {account}{'@'}{domain}",
    linkExample: "link example @:message.hello"
  },
};

export const CN_MESSAGE: { message: messageType } = {
  message: {
    hello: "你好",
    intro: "点击{msg1} + 来添加{msg2}日程",
    listExample: "展示{1}日程",
    literalExample: "电子邮箱: {account}{'@'}{domain}",
    linkExample: "链接例子 @:message.hello"
  },
};

export const message: messageType = {
  hello: "message.hello",
  intro: "message.intro",
  listExample: "message.listExample",
  literalExample: "message.literalExample",
  linkExample: "message.linkExample"
};
