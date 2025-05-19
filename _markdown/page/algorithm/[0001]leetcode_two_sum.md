---
layout: "page"
title: "1. Two Sum"
description: "파이썬으로 리트코드 문제 풀이"
updated: "2025-03-03"
tags: ["leetcode","easy","array","hash_table"]
---

## 문제

[http://leetcode.com/problems/two-sum/](http://leetcode.com/problems/two-sum/)

정수들을 가진 nums 배열과 target 정수가 주어졌을 때, nums 안의 두 요소의 합이 target 이 되는 케이스가 반드시 존재함, 이 케이스에 해당하는 두 요소를 찾아 그 인덱스를 반환하는 문제

## brute force

무식하게 요소들을 한쌍씩 꺼내 그 합을 target 과 비교해보는 방식

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i, x in enumerate(nums[:-1]):
            for j, y in enumerate(nums[i+1:], i+1):
                if x + y == target:
                    return i, j
```

이중 루프로 구현, 바깥쪽 i 는 0 ~ n-1 까지 순회, 안쪽 j 는 i+1 ~ n 까지 순회하면, 모든 케이스를 탐색할 수 있음

if 구문에서 원하는 케이스인지 판단하고 리턴

## hash table

nums 를 한번만 순회, 순회한 값들을 hash table 에 넣어두고, 나중에 순회하게 되는 값과 hash table 값을 비교해보는 방식

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        h = {}

        for i, x in enumerate(nums):
            y = target - x
            if y in h:
                return h[y], i

            h[x] = i
```

hash table 역할을 위해 h 딕셔너리 사용

순회할 때, `y = target - x` 를 먼저 계산하고, `y` 값이 h 에 있는지를 판단, 있다면 리턴하고, 없다면 다음 순회를 h 에 저장해 둠