---
layout: "page"
title: "우분투 데스크탑, ibus-hangul 설치 후, 한/영 전환할 때 오른쪽 alt 키가 원래의 기능과 충돌 일으킬 때 조치"
updated: "2025-11-09"
---

## 상황

13인치 노트북 사용중, 키보드 레이아웃 단출하여 우측 alt 키를 한/영 전환 병행되도록 셋팅

vscode 사용 중, 한/영 전환 했더니 종종 일반 alt 키와 같은 동작(메뉴로 포커싱 이동)이 병행됨

## 조치

아래와 같이 해결

> 그놈 트윅 실행 (없다면 sudo apt install gnome-tweaks) --> "Keyboard" --> "Additional Layout Options" --> "Key to choose the 3rd level" --> "Right Alt" 선택
> 설정 실행 --> "Keyboard" --> Input Source 의 "Korean (Hangul)" 추가 옵션 --> "Preferences" --> "Add"
> Add 버튼 누르면 뜨는 팝업에서, 우측 alt 누르면 ISO_Level3_Shift 라고 표시됨

잘은 모르겠지만 ISO_Level3_Shift 는 유럽식 키보드에서 특수문자를 입력할 때 사용하는 키라 함

우측 alt 가 일반적인 alt 가 아니게 설정되었고, 한영 전환할 때 vscode 기본 alt 키 기능과 충돌도 없어짐 (당연하지만 왼쪽 alt 는 정상적으로 메뉴 포커싱 기능 잘 작동)