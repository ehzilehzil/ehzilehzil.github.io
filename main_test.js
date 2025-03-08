import fs from "fs-extra";
import fg from "fast-glob";
import render from "./render.js";
import path from "node:path";
import { version } from "node:os";


const renderPage = (vars, mdfile) => {
    // parse markdown
    let {frontmatter, content} = render.separate(fs.readFileSync(mdfile, "utf-8"));
    frontmatter = render.liquid(frontmatter, vars);
    Object.assign(vars, render.yaml(frontmatter));
    content = render.md(content);

    // parse liquidjs
    while (vars.layout) {
        let liquidfile = `./_layout/${vars.layout}.layout`;
        delete vars.layout;
        let {frontmatter, content} = render.separate(fs.readFileSync(liquidfile, "utf-8"));
        frontmatter = render.liquid(frontmatter, vars);
        Object.assign(vars, render.yaml(frontmatter));
        content = render.liquid(content, vars);
        Object.assign(vars, {content});
    }

    // write json
    fs.outputJSONSync(`./_site/${vars.permalink === "/" ? "/page/index" : vars.permalink}.json`, {content: vars.content}, {encoding="utf-8"});

    // return parse info
    return {permalink: vars.permalink, title: vars.title, dir: vars.dir};
}

let vars = {
    layout: "page",
    permalink: "{{ name | removeLavel }}"
};