---
layout: "page"
title: "35. Search Insert Position"
description: "자바스크립트로 리트코드 문제 풀이"
updated: "2025-04-01"
tags: ["leetcode","easy","array","binary_search"]
---

## 문제

[https://leetcode.com/problems/search-insert-position/](https://leetcode.com/problems/search-insert-position/)

오름차순으로 정렬된 숫자들을 담은 nums 배열이 주어질 때, 오름차순을 해치지 않으면서 어떤 숫자 target 이 들어갈 위치(인덱스)를 찾아내는 문제

어마무시한 탐색 효율을 보이는 [이진 탐색](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89) 알고리즘을 사용하면 됨, 자세한 내용은 링크 참조

## 이진 탐색

탐색이 필요한 범위를 i **이상**, j **미만**으로 상정하고, 이진 탐색을 수행

```javascript
let searchInsert = (nums, target) => {
    let [i, j] = [0, nums.length];

    while (i < j) {
        let m = i + (j - i) / 2 | 0;
        (nums[m] < target) ? i = m + 1 : j = m;
    }

    return i;
};
```

while 구문 안의 삼항연산자 부분이 핵심으로, 이렇게 코딩하면 언젠가 반드시 `i === j` 성립하게 되고, 이때의 i 또는 j 가 target 이 들어갈 위치임