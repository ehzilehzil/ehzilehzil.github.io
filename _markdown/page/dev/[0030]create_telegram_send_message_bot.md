---
layout: "page"
title: "텔레그램 메시지 전달 봇 만들고 사용하기"
description: "텔레그램에 봇을 만들어놓고, Node.js 자바스크립트 코드로 메시지를 보내는 방법 기록"
updated: "2025-07-19"
tags: ["bot", "javascript", "message", "telegram"]
---

## 봇 설정

스마트폰에 텔레그램 앱 설치

텔레그램 앱에서 `@BotFather` 검색하여 클릭

채팅 창에 아래 명령어 순서대로 입력
```plaintext
/start
/newbot
```

원하는 봇의 이름을 채팅창에 입력 (단, 이름의 끝은 bot 으로 끝나야 함, 예를들어 `ehzil_bot`)

채팅창에서 `숫자:영문` 형식을 기록 (일종의 암호에 해당하는 토큰이므로 다른이에게 노출되지 않도록 관리 잘 해야 함)

채팅방 나감

## chat id 확인

텔레그램 앱에서 `@userinfobot` 검색하여 클릭

채팅 창에 아래 명령어 입력
```plaintext
/start
```

`숫자` 일련번호가 나오는데, 이것이 chat id 임 (역시 노출되지 않도록 관리)

채팅방 나감

## 봇과의 채팅방 시작

나중에 프로그래밍 코드로 메시지 보내려면 사전에 봇과의 채팅방이 개설되어 있어야 하기 때문

텔레그램 앱에서 위에서 생성한 봇이름을 사용하여 `@봇이름` 검색하고 클릭 (위에서처럼 ehzil_bot 이라고 했으면 @ehzil_bot 으로 검색)

봇에게 먼저 아무 메시지나 전달

채팅방 나감

## 메시지 전송 Javascript 코드

AI 통해서 알아낸 코드를 일부 수정

```javascript
let token = "XXXXXXXX";  // 토큰 입력
let chat_id = "XXXXXX";  // chat id 입력
let sendMsg = async (text) => {
    let url = `https://api.telegram.org/bot${token}/sendMessage`;
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id,
            text,
        }),
    });
    let result = await res.json();
    console.log(result);
};

await sendMsg("전달하고자 하는 메시지");
```
