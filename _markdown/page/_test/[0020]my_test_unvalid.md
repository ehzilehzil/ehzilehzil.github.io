---+
layout: "page"
title: "어질어질 블로그 빌더 테스트 페이지"
description: "어질어질 블로그 빌더 테스트를 위한 마크다운, 빌더 코드들이 제대로 작성되었는지 테스트 해보기 위한 페이지"
updated: "2025-04-23"
tags: ["ehzilehzil", "blog", "builder", "test"]
--

## 서브 타이틀 Sub Title, 서브 타이틀 Sub Title, 서브 타이틀 Sub Title, 서브 타이틀 Sub Title, 서브 타이틀 Sub Title

이것은 단락, This is a paragraph. 이것은 단락, 이것은 단락, This is a paragraph. 이것은 **strong 강조문**, 이것은 *em 강조문*, 이것은 `인라인 code 구문`, 이것은 [링크](#), 이것은 단락, This is a paragraph.

- 이것은 ul li 구문, This is ... 이것은 ul li 구문, This is ... 이것은 ul li 구문, This is ... 이것은 ul li 구문, This is ... 이것은 ul li 구문, This is ... 
- 이것은 ul li 구문, This is ...
- 이것은 ul li 구문 안에서의 **strong 강조문**, *em 강조문*, `인라인 code 구문`, [링크](#)

> 이것은 인용문 안의 단락, This is a paragraph in a blockquote. 이것은 인용문 안의 단락, This is a paragraph in a blockquote. 이것은 인용문 안의 단락, This is a paragraph in a blockquote.
> 이것은 인용문 안의 단락, 인용문 단락 구문 안에서의 **strong 강조문**, *em 강조문*, `인라인 code 구문`, [링크](#)
> 이것은 인용문 안의 단락, This is a paragraph in a blockquote.

> - 이것은 인용문 안의 ul li 구문, This is... 이것은 인용문 안의 ul li 구문, This is... 이것은 인용문 안의 ul li 구문, This is... 이것은 인용문 안의 ul li 구문, This is...
> - 이것은 인용문 안의 ul li 구문, This is... 구문 안에서의 **strong 강조문**, *em 강조문*, `인라인 code 구문`, [링크](#)

## 서브 타이틀 Sub Title

아래는 Syntax Highlight 적용된 코드 구문

```python
def binarySearch(arr, target):
    # i 이상, j 미만
    i, j = 0, len(arr)

    while i < j:
        m = i + (j-i) // 2
        if arr[m] < target:
            i = m + 1
        else:
            j = m
    
    return i

print(binarySearch([1, 2, 8, 9], 7))
```