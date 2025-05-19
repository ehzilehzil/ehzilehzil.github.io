---
layout: "page"
title: "20. Valid Parentheses"
description: "자바스크립트로 리트코드 문제 풀이"
updated: "2025-03-30"
tags: ["leetcode","easy","string","stack"]
---

## 문제

[https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)

소/중/대괄호만으로 이뤄진 문자열이 타당하게 열리고 닫혀있는지 판별하는 문제

## 타당한 괄호 쌍을 계속 제거

문자열을 순회하면서, 타당한 괄호 쌍을 계속 제거해가는 방식

```javascript
let isValid = (s) => {
    let p = "";
    while (p !== s) {
        p = s;
        s = s.replaceAll("()", "")
             .replaceAll("{}", "")
             .replaceAll("[]", "");
    }
    return s === "";
};
```

반복문으로 s 에서 올바른 괄호쌍을 제거함

더 이상 제거가 안될 때, s 가 빈 문자열이라면, 최초 s 문자열이 모두 올바른 괄호쌍이라는 의미가 됨

## stack

s 문자열을 순회, 열린 괄호라면 스택에 push, 닫힌 괄호라면 스택에서 pop 해서 괄호 쌍이 맞는지 확인해보는 방식

```javascript
let isValid = (s) => {
    let h = new Map([
        [")", "("], ["}", "{"], ["]", "["]
    ]);
    let st = [];

    for (let x of s) {
        if (h.has(x)) {
            if (!st.length || st.pop() !== h.get(x)) return false;
        } else {
            st.push(x);
        }
    }

    return st.length === 0;
};
```

올바른 괄호쌍끼리 Map 객체로 h 에 할당, 반복문으로 s 순회하면서, 닫힌 괄호가 열린 괄호와 쌍이 안맞으면 false 리턴

모든 순회를 마쳤을 때, 스택이 남아있지 말아야 최초 s 문자열이 모두 올바른 괄호쌍이었다는 의미가 됨