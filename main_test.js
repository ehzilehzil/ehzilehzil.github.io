import fs from "fs-extra";
import fg from "fast-glob";
import render from "./render.js";
import path from "node:path";

// // init
// const $page = `./_markdown/page`;
// const $dir = `./_markdown/dir`;
// const $layout = `./_layout`;
// const $asset = `./_asset`;

// let a = fg.globSync(`${$page}/**/*.md`);
// console.log(a);


// let a = fs.readFileSync(`./test.pug`, "utf-8");
// let obj = {
//     site: {title: "aa"},
//     page: {dirs: [
//         {titile: "bb", permalink: "#"},
//     ]}
// }
// let b = render.pug(a, obj);
// console.log(b);


// let a = fs.readFileSync(`./_layout/base.pug`, "utf-8");
// let {frontmatter, content} = render.separate(a);
// frontmatter = render.yaml(frontmatter);
// console.log(frontmatter);
// content = render.pug(content, frontmatter);
// console.log(content);

let mdFiles = fg.globSync(`./_markdown/page/**/*.md`);
for (let mdfile of mdFiles) {
    let {dir, name} = path.parse(mdfile);
    let ver = name.match(/^(\[\S*?\])/)?.[1] || "";
    name = name.slice(ver.length);

    console.log(ver);
    console.log(name);
    console.log(dir.replace(`./_markdown/page`, "") || "/");
    console.log();
}