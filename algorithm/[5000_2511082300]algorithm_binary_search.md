---
layout: "page"
title: "[Binary Search] 이진 탐색"
updated: "2025-11-08"
---

## Binary Search

어떤 데이터들이 있고 그 안에서 특정값을 찾는다고 할 때, 만일 데이터들이 오름차순으로 정렬되어 있다면, [이진 탐색](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89)으로 빠르게 탐색 가능

이진 탐색 알고리즘이 무엇인지는 링크를 보면 쉽게 알 수 있으며, 시간복잡도는 O(log N)

예를들어 10,000개 데이터가 있다면, 단순 탐색은 최악의 경우 10,000번 탐색을 해야하지만, 이진 탐색은 많아야 14번 정도면 가능

알고리즘 이해는 쉬우나, 스스로 코드 작성해보려 하면 생각보다 난이도가 있음, 아래처럼 시행

> - 오름차순 정렬된 배열 A, 찾는값 t, i 이상 j 미만 범위를 설정하여 이진 탐색 시행
> - 초기값으로 i = 0, j = A 배열 길이
> - `(1)`i < j 이면 반복시행
> - - 중간값 m = i + (j - i) / 2 계산 (나눗셈은 정수나눗셈)
> - - A[m] 과 t 비교, m 보다 아래를 버려야 하면 i = m + 1, 위를 버려야 하면 j = m 으로 조정 (i 이상 j 미만 으로 다시 범위 조정)
> - 반복 종료가 되면 i 리턴

위 `(1)` 반복문은 어떠한 케이스라도 반복 결과 무조건 i == j 가 되어 반복 종료가 보장됨

찾는값 t 가 없으면, t 가 들어갈 수 있는 위치(A 의 오름차순을 해치지 않고)를 가리킴

## Leetcode: 35. Search Insert Position

[https://leetcode.com/problems/search-insert-position](https://leetcode.com/problems/search-insert-position)

오름차순 정렬되어 있는 nums 배열에서, 특정 숫자 target 이 들어갈 수 있는 인덱스를 찾아 리턴하는 문제

위 이진 탐색 로직을 그대로 적용하면 됨

```rust
// rust
impl Solution {
    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {
        let (mut i, mut j) = (0, nums.len());

        while i < j {
            let m = i + (j - i) / 2;
            match nums[m] < target {
                true => i = m + 1,
                false => j = m,
            }
        }

        return i as i32;
    }
}
```