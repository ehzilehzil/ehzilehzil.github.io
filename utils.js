// @ts-check

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import matter from "gray-matter";
import pug from "pug";

let md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    highlight: (str, lang) => {
        let language = hljs.getLanguage(lang) ? lang : "plaintext";
        let r = `<pre class="${language}"><code class="hljs language-${language}">` +
                hljs.highlight(str, { language }).value +
                `</code></pre>`;
        return r;
    },
});

export let parse = {
    /**
     * 마크다운 파싱
     * @type {(str: string) => string}
     */
    md: (str) => md.render(str),

    /**
     * 프론트매터 파싱, 파싱결과와 콘텐츠 리턴
     * @type {(str: string) => {data: Object, content: string}}
     */
    separate: (str) => {
        let { data, content } = matter(str);
        return { data, content };  
    },

    /**
     * 퍼그 파싱
     * @type {(str: string, vars: Object) => string}
     */
    pug: (str, vars) => pug.render(str, vars),
};