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

다만, 개인적으로는 라인 전체를 하이라이트 하는 기능을 원했고, 그래서 예시코드를 바꿔 봄

```js
import markdownIt from "markdown-it";

// ... other codes

const md = markdownIt({
    // ... other options

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

markdown 에서 아래처럼 사용하면...

~~~markdown
```javascript{-1,+2,5}
console.log(`hello world`);
console.log(`HELLO WORLD`);

for (let [i, x] of primes.entries()) {
    if (i >= 10) break;

    console.log(x);
}
```
~~~

아래처럼 결과가 나옴

```javascript{-1,+2,5}
console.log(`hello world`);
console.log(`HELLO WORLD`);

for (let [i, x] of primes.entries()) {
    if (i >= 10) break;

    console.log(x);
}
```

{ 기호와 } 사이에 라인 하이라이트가 필요한 행을 넣으면 됨, 단 공백을 넣으면 안됨

## 커스텀 컨테이너 추가

markdown 일반문법에서는 class 를 삽입하는 방법은 없음, 그러나 이를 가능하여 나중에 css 로 스타일링을 할 수 있도록 해주는 기능임

markdown-it 플러그인을 보면 [markdown-it-container](https://github.com/markdown-it/markdown-it-container#readme) 가 있는데, 정확하게 원했던 기능을 구현하도록 해줌

아래와 같은 markdown 을...

```markdown
::: warning
*here be dragons*
:::
```

아래처럼 파싱해줌...

```html
<div class="warning">
<em>here be dragons</em>
</div>
```

일단 위에서 예시로 든 `warning` 만이 아니라, `:::` 옆에 어떤 것이 오든 이를 class 로 지정할 수 있도록 아래와 같이 사용함

```js
import custom_plugin from "markdown-it-container";

// ...other codes

const md = markdownIt({

    // ...markdown-it options

}).use(custom_plugin, "", {
    validate: (params) => {
        return params && params.length > 0;
    },
    render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
            return `<div class="${tokens[idx].info.trim().split(/\s/)[0]}">`;
        }

        return `</div>`;
    },
});
```

validate 속성은 `:::` 구문의 적법성 여부를 평가하는데, `:::` 뒤에 0 이상 길이의 문자만 들어오면 적법하다고 평가하도록 함

render 속성을 통해 0 이상 길이 문자에서 공백 앞부분만 잘나내어 class 로 지정하도록 함