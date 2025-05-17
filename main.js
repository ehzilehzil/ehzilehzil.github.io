// @ts-check

import fs from "fs-extra";
import fg from "fast-glob";
import path from "node:path";
import * as $ from "./utils.js";


// globals
let globals = {
    site: {
        title: `어질어질 블로그`,
    },
};

/**
 * 마크다운 페이지 정보 파일
 */
let pagesInfo = {};


// ./_markdown/page/**/*.md ->
{
    let mdfiles = fg.globSync(`./_markdown/page/**/*.md`).sort();
    for (let mdfile of mdfiles) {
        let vars = {
            ...globals,
        };

        let {dir, base, name, ext} = path.parse(mdfile);
        dir = dir.replace(`./_markdown/page`, ``).replace(/^\//, ``);
        name = name.replace(/^\[.*\]/, ``);
        // console.log(`${dir}, ${name}`);

        let permalink = `/page/${name}`;
        if (permalink === `/page/index`) permalink = `/`;
        let jsonfile = `./_site/page/${name}.json`;

        let {data, content} = $.parse.separate(fs.readFileSync(mdfile, {encoding: `utf-8`}));
        
    }
} 