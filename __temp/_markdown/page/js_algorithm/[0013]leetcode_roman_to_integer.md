---
layout: "page"
title: "13. Roman to Integer"
description: "자바스크립트로 리트코드 문제 풀이"
updated: "2025-03-03"
tags: ["leetcode","easy","hash_table","math","string"]
---

## 문제

[https://leetcode.com/problems/roman-to-integer/](https://leetcode.com/problems/roman-to-integer/)

로마어 형태의 숫자를 파싱하는 문제

## IV 를 IIII 로 치환

로마숫자는 각 숫자가 아래와 같이 대응, 이를 합산하는 방식

:::note
I, V, X, L, C, D, M 은 각각 1, 5, 10, 50, 100, 500, 1000 에 해당
:::

단, `IV` 의 경우 4 를 나타내는데, 각 문자를 치환하여 합산하면 6 이 됨, 이를 방지하기 위해 `IV` 및 이와 유사한 숫자를 `IIII` 와 같이 먼저 풀어놓음

```javascript
let romanToInt = (s) => {
    s = s.replace("IV", "IIII")
         .replace("IX", "VIIII")
         .replace("XL", "XXXX")
         .replace("XC", "LXXXX")
         .replace("CD", "CCCC")
         .replace("CM", "DCCCC");
    return s.split("").reduce((a, x) => {
        switch (x) {
            case "I": a += 1; break;
            case "V": a += 5; break;
            case "X": a += 10; break;
            case "L": a += 50; break;
            case "C": a += 100; break;
            case "D": a += 500; break;
            case "M": a += 1_000; break;
        }
        return a;
    }, 0);
};
```

치환했을 때 합산결과가 잘못될 수 있는 케이스들을 replace 함수로 변환해 두고, reduce 함수에서 각각에 대응하는 숫자로 바꿔 합산을 함

## 치환하지 않고 계산

로마숫자를 잘 보면, 작은 단위 숫자는 본래 뒤에 나오게 되며, 만일 작은 숫자가 큰 숫자보다 앞에 나온다면 이는 마이너스(-)를 해주는 숫자임을 알 수 있음

예를들어 `IV` 에서 `I` 는 큰 숫자 `V` 보다 앞에 있는데, 이 때는 1 이 아닌 -1 이 되어야 함

로마숫자를 뒤에서부터 합산해나갈 때, 만일 `I` 가 등장했고, 이 때까지의 합산 결과가 5 에 해당하는 `V` 이상이라면 이 때는 마이너스(-)를 해줘야 한다고 보면 됨

```javascript
let romanToInt = (s) => {
    return s.split("").reduceRight((a, x) => {
        switch (x) {
            case "I": a += (a < 5) ? 1 : -1; break;
            case "V": a += 5; break;
            case "X": a += (a < 50) ? 10 : -10; break;
            case "L": a += 50; break;
            case "C": a += (a < 500) ? 100 : -100; break;
            case "D": a += 500; break;
            case "M": a += 1_000; break;
        }
        return a;
    }, 0);
};
```

뒤에서부터 합산을 위해 reduceRight 함수를 사용, 마이너스로 사용될 수 있는 로마숫자들에 대해서는 조건식을 통해 플러스(+)인지 마이너스(-)인지를 판단하도록 함

## 치환하지 않고 계산 2

뒤에서부터 합산을 하되, 로마숫자 각각의 치환 결과를 일단 모아두고 마지막에 한번에 합산

```javascript
let romanToInt = (s) => {
    let h = new Map([
        ["I", 1], ["V", 5], ["X", 10], ["L", 50], ["C", 100], ["D", 500], ["M", 1_000]
    ]);
    let r = [];

    for (let x of s.split("").reverse()) {
        let a = h.get(x);
        a = (r.length && a < r.at(-1)) ? -a : a;
        r.push(a);
    }

    return r.reduce((a, x) => a + x);
};
```

숫자로 치환할 때 switch 분기 대신 Map 객체 사용

로마숫자 s 를 뒤에서부터 순회, 숫자료 치환하고, 플러스(+) 또는 마이너스(-) 결과를 r 배열에 삽입

마지막에 r 각 요소 합계를 리턴