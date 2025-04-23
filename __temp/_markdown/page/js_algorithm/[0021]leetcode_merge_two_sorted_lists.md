---
layout: "page"
title: "21. Merge Two Sorted Lists"
description: "자바스크립트로 리트코드 문제 풀이"
updated: "2025-04-01"
tags: ["leetcode","easy","linked_list","recursion"]
---

## 문제

[https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/)

오름차순으로 정렬된 두개의 연결 리스트가 있을 때, 오름차순은 유지하면서 하나의 병합된 연결 리스트를 리턴하는 문제

## 새로운 연결 리스트 생성

두개의 연결 리스트 list1, list2 를 탐색, 값이 작은 순서대로 탐색을 하고, 탐색한 값으로 새로운 연결 리스트를 생성하는 방식

```javascript
let mergeTwoLists = (list1, list2) => {
    let dummy = new ListNode();
    let n = dummy;

    while (list1 || list2) {
        // (1)
        switch (true) {
            case list1 !== null && list2 !== null:
                if (list1.val > list2.val) [list1, list2] = [list2, list1];
                break;
            case list2 !== null:
                [list1, list2] = [list2, list1];
                break;
        }

        // (2)
        n.next = new ListNode(list1.val);
        n = n.next;
        list1 = list1.next;
    }

    return dummy.next;
};
```

dummy 리스트 노드를 생성, dummy 의 다음 노드부터 연결 리스트를 이어붙일 예정, n 은 현재의 제일 마지막 노드를 가리키도록 함

while 구문으로 노드 생성을 반복, (1) 에서 만일 list1, list2 모두 연결 리스트로서 유효하다면 값을 비교하여, 값이 작은 쪽을 list1 으로 할당, list2 만 유효하다면 list1 으로 즉시 할당

(1) 에서 새롭게 생성해야 할 노드의 값은 무조건 list1 노드의 값이므로, 이 값으로 새로운 노드를 생성하고, 새롭게 형성된 노드로 n 을 옮기고, list1 도 다음 list1 으로 옮겨서 계속 반복함

마지막에 dummy 의 다음 노드를 리턴하면 끝

## iterative in-place

새로운 노드 형성없이, 기존의 노드 연결을 재조정하는 방식

```javascript
let mergeTwoLists = (list1, list2) => {
    let dummy = new ListNode();
    let n = dummy;

    while (list1 && list2) {
        if (list1.val > list2.val) [list1, list2] = [list2, list1];

        n.next = list1;
        n = n.next;
        list1 = list1.next;
    }
    // (1)
    n.next = list1 || list2;

    return dummy.next;
};
```

dummy 만 생성, dummy 다음 노드부터 list1 또는 list2 에 있는 기존 노드로 직접 연결해줌

만일 list1, list2 모두 유효하지 않다면 while 문 실행은 종료되고, 이후에는 굳이 값 비교가 필요없으므로 (1) 과 같이 살아있는 한쪽으로만 연결해주면 됨 (둘 다 유효하지 않아도 상관없음)

## recursive in-place

재조정 방식을 재귀 함수 사용하여 코딩

```javascript
let mergeTwoLists = (list1, list2) => {
    switch (true) {
        case list1 !== null && list2 !== null:
            if (list1.val > list2.val) [list1, list2] = [list2, list1];
            break;
        case list2 !== null:
            [list1, list2] = [list2, list1];
            break;
        case list1 === null && list2 === null:
            return null;
    }

    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
};
```