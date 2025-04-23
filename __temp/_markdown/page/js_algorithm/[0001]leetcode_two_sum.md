---
layout: "page"
title: "1. Two Sum"
description: "자바스크립트로 리트코드 문제 풀이"
updated: "2025-03-03"
tags: ["leetcode","easy","array","hash_table"]
---

## 문제

[http://leetcode.com/problems/two-sum/](http://leetcode.com/problems/two-sum/)

정수들을 가진 nums 배열과 target 정수가 주어졌을 때, nums 안의 두 요소의 합이 target 이 되는 케이스가 반드시 존재함, 이 케이스에 해당하는 두 요소를 찾아 그 인덱스를 반환하는 문제

## brute force

무식하게 요소들을 한쌍씩 꺼내 그 합을 target 과 비교해보는 방식

```javascript
let twoSum = (nums, target) => {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) return [i, j];
        }
    }
};
```

이중 루프로 구현, 바깥쪽 i 는 0 ~ n-1 까지 순회, 안쪽 j 는 i+1 ~ n 까지 순회하면, 모든 케이스를 탐색할 수 있음

`nums[i] + nums[j] == target` 로 원하는 케이스인지 판단하고 리턴

## hash table

nums 를 한번만 순회, 순회한 값들을 hash table 에 넣어두고, 나중에 순회하게 되는 값과 hash table 값을 비교해보는 방식

```javascript
let twoSum = (nums, target) => {
    let h = new Map();
    
    for (let [i, x] of nums.entries()) {
        let y = target - x;
        if (h.has(y)) {
            return [h.get(y), i];
        } else {
            h.set(x, i);
        }
    }
};
```

hash table 역할을 위해 Map 객체 사용

순회할 때, `y = target - x` 를 먼저 계산하고, `y` 값이 HashMap 에 있는지를 판단, 있다면 리턴하고, 없다면 다음 순회를 위해 Map 객체에 저장해 둠