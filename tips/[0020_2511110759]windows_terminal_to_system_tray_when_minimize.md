---
layout: "page"
title: "윈도우 터미널 최소화 키 눌렀을 때 시스템 트레이로 이동하게 설정"
updated: "2025-11-11"
---

## 상황

[마이크로소프트 스토어](https://apps.microsoft.com/detail/9n0dx20hk701?hl=ko-KR&gl=KR) 에서 Windows Terminal을 다운받았음

다만, 터미널 창을 최소화했을 때 시스템 트레이로 아이콘이 숨겨졌으면 했는데 해당 기능을 설정에서 직접 선택할 순 없었음

## 조치

Windows terminal 열고, "설정"을 선택하면, 왼쪽아래에 "⚙️" 표시 클릭

클릭하면 json 편집 가능한데, 아래 코드를 삽입

```json
{
    // ...
    "minimizeToNotificationArea": true
}
```