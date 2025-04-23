---
layout: "page"
title: "14. Longest Common Prefix"
description: "자바스크립트로 리트코드 문제 풀이"
updated: "2025-03-30"
tags: ["leetcode","easy","string","trie"]
---

## 문제

[https://leetcode.com/problems/longest-common-prefix/](https://leetcode.com/problems/longest-common-prefix/)

배열로 여러 영단어들이 주어졌을 때, 이들의 공통 접두어를 찾아서 리턴하는 문제

## 첫 단어를 나머지 단어와 비교

첫 단어만을 따로 떼어내어, 다른 나머지 단어들과 연속 비교하여 공통 접두어를 탐색하는 방식

```javascript
let longestCommonPrefix = (strs) => {
    let r = strs[0];

    for (let x of Iterator.from(strs).drop(1)) {
        while (!x.startsWith(r)) {
            r = r.slice(0, -1);
        }
    }

    return r;
};
```

첫번째 단어를 r 로 떼어내어 공통 접두어로 삼고, 나머지 단어들이 r 로 시작하는지를 판별하여, 그렇지 않다면 공통 접두어를 줄여나가는 방식임

## zip 함수

zip 함수를 사용해서, 전체 단어들의 첫번째 알파벳부터 모두 가져와서 공통 접두어 판별 후, 리턴하는 방식 

```javascript
let zip = function* (strs) {
    let iters = strs.map((x) => x[Symbol.iterator]());

    while (true) {
        let r = [];
        for (let it of iters) {
            let {value, done} = it.next();
            if (done) return;

            r.push(value);
        }

        yield r;
    }
};

let longestCommonPrefix = (s) => {
    let r = "";

    for (let xs of zip(s)) {
        if (xs.some((x) => x !== xs[0])) break;
        r += xs[0];
    }

    return r;
};
```

모든 단어들의 알파벳 순서에 따라 별도 배열을 리턴하는 zip 제너레이터를 상정함

zip 함수의 yield 결과들이 모두 같은 알파벳이라면 공통 접두어 r 에 추가하고, 같지 않다면 리턴

## Trie 자료구조

포털 자동완성에도 사용하는 [Trie 자료구조](https://namu.wiki/w/%ED%8A%B8%EB%9D%BC%EC%9D%B4)를 사용하는 방식

위 링크 안 그림을 과 같이 각 단어들을 Trie 구조로 만들고, 루트에서 탐색 시작, end 나 분기가 나오지 않을 때까지 알파벳을 모아 리턴하면 됨

```javascript
class TrieNode {
    constructor() {
        this.end = false;
        this.children = new Map();
    }
}

let longestCommonPrefix = (strs) => {
    let trie = new TrieNode();

    // (1)
    for (let str of strs) {
        let n = trie;
        for (let x of str) {
            if (!n.children.has(x)) n.children.set(x, new TrieNode());
            n = n.children.get(x);
        }
        n.end = true;
    }

    // (2)
    let n = trie;
    let r = "";
    while (!n.end && n.children.size === 1) {
        let x = n.children.keys().next().value;
        r += x;
        n = n.children.get(x);
    }

    return r;
};
```

TrieNode 객체를 정의, 어떤 단어가 끝에 다다렀는지 판별하는 end, 다음 노드로 연결하는 children 객체를 정의함

trie 변수를 루트로 삼고, (1) 아래 for 구문에서 각 단어들을 Trie 구조에 대입

(2) 아래에선 trie 를 탐색, end 가 아니고 자식 노드가 1 개라면 공통 접두어이므로 이를 더하는 작업 수행