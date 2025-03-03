---
layout: "page"
title: "1. Two Sum"
description: "러스트로 리트코드 문제 풀이"
updated: "2025-03-03"
tags: ["leetcode","easy","array","hash_table"]
---

## 문제

[http://leetcode.com/problems/two-sum/](http://leetcode.com/problems/two-sum/)

정수들을 가진 nums 배열과 target 정수가 주어졌을 때, nums 안의 두 요소의 합이 target 이 되는 케이스가 반드시 존재함, 이 케이스에 해당하는 두 요소를 찾아 그 인덱스를 반환하는 문제

## brute force

무식하게 요소들을 한쌍씩 꺼내 그 합을 target 과 비교해보는 방식

```rust
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        for (i, &x) in (0..nums.len()-1).zip(&nums) {
            for (j, &y) in (i+1..nums.len()).zip(&nums[i+1..]) {
                if x + y == target {
                    return vec![i as i32, j as i32];
                }
            }
        }
        unreachable!();
    }
}
```

이중 루프로 구현, 바깥쪽 i 는 0 ~ n-1 까지 순회, 안쪽 j 는 i+1 ~ n 까지 순회하면, 모든 케이스를 탐색할 수 있음, `(인덱스, 값)` 형식으로 순회하기 위해 zip 함수를 사용

`x + y == target` 비교를 통해 원하는 케이스인지 판단하고 리턴

리턴이 함수코드 블록 중간에 나오기 때문에, 마지막에 unreachable! 매크로를 넣어줘야 컴파일 에러가 발생하지 않음

## hash table

nums 를 한번만 순회, 순회한 값들을 hash table 에 넣어두고, 나중에 순회하게 되는 값과 hash table 값을 비교해보는 방식

```rust
use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut h = HashMap::<i32, i32>::new();
        
        for (i, &x) in nums.iter().enumerate() {
            let y = target - x;
            match h.get(&y) {
                Some(&j) => { return vec![i as i32, j]; },
                None => { h.insert(x, i as i32); },
            }
        }

        unreachable!();
    }
}
```

hash table 역할을 위해 HashMap 사용

순회할 때, `y = target - x` 를 먼저 계산하고, `y` 값이 HashMap 에 있는지를 판단, 있다면 리턴하고, 없다면 다음 순회를 위해 HashMap 에 저장해 둠