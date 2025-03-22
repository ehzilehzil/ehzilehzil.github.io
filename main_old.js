import fs from "fs-extra";
import fg from "fast-glob";
import path from "node:path";
import render from "./render.js";

// init
const $page = `./_markdown/page`;
const $dir = `./_markdown/dir`;
const $layout = `./_layout`;
const $asset = `./_asset`;
const $site = `./_site`;

let globals = {
    site: {
        title: "어질어질 블로그",
    },
};

/**
 * pagesInfo = {
 *     dir: [
 *         {target, url, title, tags, summary[TBD]},
 *     ],
 * };
 */
let pagesInfo = new Map();


// markdown in _markdown/page -> html -> json
{
    let vars = {...globals};
    let mdfiles = fg.globSync(`${$page}/**/*.md`).sort();

    for (let mdf of mdfiles) {
        let {dir, name} = path.parse(mdf);
        let ver = name.match(/^(\[\S*?\])/)?.[1] || "";

        if (!ver) continue;     // ver 가 없다면 패스
        
        dir = dir.replace($page, "") || "/";
        name = name.slice(ver.length);
        let url = name === "index" ? `/` : `/page/${name}`;
        let target = `/page/${name}.json`;
        let layout = "page";
        Object.assign(vars, {dir, target, url, layout, title: "", description: "", updated: "", tags:[]})

        let frontmatter = "";
        let content = "";
        try {
            ({frontmatter, content} = render.separate(fs.readFileSync(mdf, "utf-8")));
            Object.assign(vars, render.yaml(frontmatter));
            content = render.md(content);
            Object.assign(vars, {content});

            while (vars.layout) {
                ({frontmatter, content} = render.separate(fs.readFileSync(`${$layout}/${vars.layout}.pug`, "utf-8")));
                vars.layout = "";
                Object.assign(vars, render.yaml(frontmatter));
                content = render.pug(content, vars);
                Object.assign(vars, {content});
            }

            if (!pagesInfo.has(dir)) pagesInfo.set(dir, []);
            pagesInfo.get(dir).push({
                target: vars.target, url: vars.url, title: vars.title, tags: vars.tags
            });

            fs.outputJSONSync(`${$site}${vars.target}`, {content: vars.content});

        } catch(e) {
            console.log(`${mdf} 파일 파싱 도중 에러 발생\n`, e);
            Deno.exit(1);
        }
    }

    fs.outputJSONSync(`${$site}/pagesinfo.json`, Object.fromEntries(pagesInfo));
}



