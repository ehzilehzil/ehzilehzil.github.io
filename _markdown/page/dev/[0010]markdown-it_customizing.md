---
layout: "page"
title: "markdown-it 커스터마이징으로 코드라인 하이라이팅, 커스텀 컨테이너 스타일링 추가"
description: "코드라인 한줄 전체를 강조하는 코드라인 하이라이트 기능과 알림/경고 상자 등 스타일링에 필요한 클래스 지정을 가능하게 하는 기능 추가"
updated: "2025-03-03"
tags: ["js","markdown-it","markmarkdown-it-container","highlight.js","line_highlighting"]
---

## markdown-it

본 블로그를 위한 빌더를 만들어보면서, markdown 파싱을 위해 [markdown-it](https://github.com/markdown-it/markdown-it#readme) 라이브러리를 사용함

커스터마이징이 필요한 부분이 있었는데, 하이라이트 및 커스텀 컨테이너 기능이었음

## 하이라이트 커스터마이징

하이라이터로 [highlight.js](https://highlightjs.org/) 사용, 지원하는 언어 종류도 많고, markdown-it 에서 예시로 보여줄 정도라 잘 연동될거라 기대함

다만, 개인적으로는 아래처럼 라인 전체를 하이라이트 하는 기능을 원했고, 예시코드를 바꿔 봄

*TBD 그림추가*

```js
const md = markdownIt({
    xhtmlOut: false,
    highlight: (str, lang) => {
        let language = lang.match(/(\w+)/)?.[1];
        language = language && hljs.getLanguage(language) ? language : "plaintext";

        let linesinfo = new Set(lang.match(/\{([0-9,+-]+)\}/)?.[1].split(","));

        let codelines = hljs.highlight(str, {language}).value.trimEnd().split("\n");
        for (let i = 0; i < codelines.length; i++) {
            let t = "";
            if (linesinfo.has(`+${i+1}`)) t = " +";
            if (linesinfo.has(`-${i+1}`)) t = " -";
            if (linesinfo.has(`${i+1}`)) t = " =";

            codelines[i] = `<div class="line${t}">` +
                           codelines[i] +
                           `</div>`;
        }

        return `<pre><code class="hljs language-${language}">` +
               codelines.join("\n") +
               `</code></pre>`
    },
}).use(/** plugin */);
```