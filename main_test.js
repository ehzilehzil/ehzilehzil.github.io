import fs from "fs-extra";
import fg from "fast-glob";
import render from "./render.js";
import path from "node:path";

let vars = {

};

let {frontmatter, content} = render.separate(fs.readFileSync(`./_markdown/page/[0010]index.md`, "utf-8"));
Object.assign(vars, render.yaml(frontmatter));
Object.assign(vars, {content: render.md(content)});

({frontmatter, content} = render.separate(fs.readFileSync(`./_layout/page.pug`, "utf-8")));
Object.assign(vars, render.yaml(frontmatter));


// content = render.pug(a, vars);
content = render.pug(content, vars);

console.log(content);

