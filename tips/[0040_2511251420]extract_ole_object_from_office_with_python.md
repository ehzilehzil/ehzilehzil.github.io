---
layout: "page"
title: "MS/리브레 오피스에서 삽입된 OLE 개체를 python 으로 추출"
updated: "2025-11-25"
---

## 상황

MS 또는 리브레 오피스에는 개체삽입 기능이 있음. OLE 개체를 삽입하는 기능인데, 간단히 얘기하자면 엑셀 안에 파워포인트나 또다른 오피스 파일을 OLE 개체라는 형태로 삽입 가능함

윈도우즈 전용 기능으로, 보통은 오피스 프로그램 및 Adobe Acrobat PDF 에서 이 기능을 지원함

삽입된 개체는 본래의 프로그램이 설치되어 있다면, 언제든 클릭하는 것만으로 빼낼 수 있으나, 프로그램이 없는 경우 개체를 온전하게 꺼내지 못해 곤란한 경우가 가끔 있었음 

## 조치

리브레 오피스나, MS 오피스 엑셀의 경우 확장자를 zip 으로 수정

zip 파일을 열면, 리브레 오피스의 경우 보통 루트 디렉토리에, MS 오피스 엑셀의 경우 embedding 또는 이와 비슷한 이름의 디렉토리 아래에 "Object" 어쩌구 파일이 보이는데, 이 파일만 압축 해제

"Object" 어쩌구 파일이 위치한 디렉토리에서 아래 python 스크립트 실행 (MS Copilot 도움을 받아 코드 생성)

```python
import olefile

f = "Ojbect 어쩌구 파일명"
ole = olefile.OleFileIO(f)

print("스트림 목록:")
for entry in ole.listdir():
    print(entry)

if ole.exists('Package'):
    data = ole.openstream('Package').read()
    with open("Package.extract.zip", "wb") as f:
        f.write(data)

if ole.exists('CONTENTS'):
    data = ole.openstream('CONTENTS').read()
    with open("CONTENTS.extract.zip", "wb") as f:
        f.write(data)

ole.close()
```

만일 `Package` 형태의 OLE 개체라면 오피스 군 파일일 가능성이 크며, `CONTENTS` 형태의 OLE 개체라면 PDF 파일일 가능성이 높다.
