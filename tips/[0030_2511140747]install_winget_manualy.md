---
layout: "page"
title: "윈도우즈, Winget 수동 설치"
updated: "2025-11-14"
---

## 상황

개발자 흉내내며 껄떡거리던 중, Windows 패키지 매니저(맞나?)인 [WinGet](https://learn.microsoft.com/ko-kr/windows/package-manager/winget/) 설치해야할 일이 생김

본래 Windows 설치하면 기본으로 설치되어 있지만, LTSC 버전인지 뭔지는 빠져있다 함, 어쨌든 알아서 설치 필요

## 조치

Windows Store 를 가서 [App Installer](https://apps.microsoft.com/detail/9nblggh4nns1?hl=ko-KR&gl=KR) 를 설치하면 된다고 Copilot 이 알려줬는데, Windows Store 다운로드가 안됨

그래서 아래와 같이 수동 설치 함

[App Installer 깃허브 릴리즈](https://github.com/microsoft/winget-cli/releases) 방문

위 깃허브에서 아래쪽 `Assets` 선택하면 보이는 "DesktopAppInstaller_Dependencies.zip" 파일과 "Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle" 파일을 다운로드, zip 파일은 압축 풀기

Windows 에서 파워쉘을 관리자로 실행한 다음, 아래 명령어로 zip 파일에 있던 것들 (의존성들) 부터 설치, 다음에 DesktopAppInstaller 설치

```powershell
Add-AppxPackage -Path "파일이름"
```