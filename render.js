import markdownIt from "markdown-it";
import custom_plugin from "markdown-it-container";
import hljs from "highlight.js";
import yaml from "js-yaml";
// import { Liquid } from "liquidjs";
import pug from "pug";

// const engine = new Liquid();
// engine.registerFilter("removeLabel", (x) => x.replace(/^\[[\s\S]+?\]/, ""));
// engine.registerFilter("today", (_) => new Date().toISOString().split("T")[0]);

const md = markdownIt({
    xhtmlOut: true,
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

const separate = (str) => {
    let m = str.match(/^---\s*?\n([\S\s]*?)---\s*?\n/);

    if (m) {
        return {
            frontmatter: m[1].trim(),
            content: str.slice(m[0].length).trim(),
        };
    }
    
    return {
        frontmatter: "",
        content: str,
    }
};

const render = {
    md: (str) => md.render(str),
    yaml: (str) => yaml.load(str),
    separate: (str) => separate(str),
    pug: (str, obj) => pug.render(str, obj),
    // liquid: (str, obj) => engine.parseAndRenderSync(str, obj),
};

export default render;