// @ts-check

/**
 * 어질어질 블로그 빌더 v1.0
 */


import fs from "fs-extra";
import fg from "fast-glob";
import {minify} from "html-minifier";
import path from "node:path";
import render from "./render.js";

fs.removeSync(`./_site`);


/**
 * 소스파일 렌더링을 시작할 때, 디폴트로 가장 먼저 적용되는 외부변수들 정의 객체
 * @type {Object<string, any>}
 */
let globals = {
    site: {
        title: "어질어질 블로그",
        url: "https://ehzilehzil.github.io",
    },
};


/**
 * 렌더링 완료된 markdown 들의 permalink(인터넷 주소)와 path(콘텐츠 담긴 파일 경로)를 매칭하는 객체
 * 블로그에서 주소를 호출했을 때, 매칭되어 있는 json 파일을 로드하기 위한 용도
 * { permalink: { path, title, dir, updated, tags } } 형태
 * @type {Object<string, Object<string, string>>}
 */
let pages = {};


/**
 * 렌더링을 수행하는 함수, srcFile(소스 파일 경로)와 vars(렌더링에 필요한 초기 외부 변수)를 받아서 렌더링
 * {[permalink]: {path, title, dir, updated, tags}} 형태로 리턴
 * @type {(srcFile: string, vars: Object<string, any>) => Object<string, Object<string, string>>}
 */
const renderPage = (srcFile, vars) => {
    // vars defaults
    vars.permalink ??= `/page/{{ name | removeLabel }}`;
    vars.path ??= `./page/{{ name | removeLabel }}.json`;
    vars.title ??= `{{ name | removeLabel }}`;

    // parse vars itself
    Object.assign(vars, JSON.parse(render.liquid(JSON.stringify(vars), vars)));

    // parse markdown
    if (srcFile.endsWith(`.md`)) {
        let {frontmatter, content} = render.separate(fs.readFileSync(srcFile, `utf-8`));
        Object.assign(vars, render.yaml(render.liquid(frontmatter, vars)));
        content = render.md(content);
        Object.assign(vars, {content});
    }

    // parse liquidjs template
    while (vars.layout) {
        let liquidFile = `./_layout/${vars.layout}.liquid`;
        delete vars.layout;
        let {frontmatter, content} = render.separate(fs.readFileSync(liquidFile, `utf-8`));
        Object.assign(vars, render.yaml(render.liquid(frontmatter, vars)));
        content = render.liquid(content, vars);
        Object.assign(vars, {content});
    }

    vars.content = minify(vars.content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
    });

    if (srcFile.endsWith(`.md`)) {
        fs.outputJSONSync(vars.path.replace(`./`, `./_site/`), {content: vars.content}, {encoding: `utf-8`});
    } else {
        fs.outputFileSync(vars.path.replace(`./`, `./_site/`), vars.content, {encoding: `utf-8`});
    }
    // console.log(vars.content);

    return {[vars.permalink]: {path: vars.path, title: vars.title, dir: vars.dir, updated: vars.updated, tags: vars.tags}};
};


/**
 * ./_markdown/page 안의 md 파일들을 json 으로 변환
 */
{
    console.log(`./_markdown/page 파일들 렌더링 시작`);

    let mdFiles = fg.globSync(`./_markdown/page/**/*.md`);
    for (let [i, mdf] of mdFiles.entries()) {
        let {dir, name} = path.parse(mdf);
        let vars = {
            ...globals,
            permalink: `/page/{{ name | removeLabel }}`,
            path: `./page/{{ name | removeLabel }}.json`,
            dir: dir.replace(`./_markdown/page`, ``).replace(/^\//, ``).replace(/^$/, `/`),
            name,
        };
        try {
            Object.assign(pages, renderPage(mdf, vars));
        } catch(e) {
            console.log(`${i}번째 ${mdf} 파일 렌더링 중 예외 발생`);
            console.log(e);
            Deno.exit(1);
        }
    }

    console.log(`${mdFiles.length}개 페이지 렌더링 완료`);
}


/**
 * pages 변형하여 dirs 생성 (permalink 와 dir 위치 교환)
 * { dir: [{ path, title, permalink, updated, tags }, ...] } 형태
 * @type {Object<string, *>}}
 */
let dirs = {};
for (let [permalink, {path, title, dir, updated, tags}] of Object.entries(pages)) {
    if (!dirs[dir]) dirs[dir] = [];
    dirs[dir].push({path, title, permalink, updated, tags})
}


/**
 * ./_markdown/dir 안의 md 파일들을 json 으로 변환
 */
{
    console.log(`./_markdown/dir 파일들 렌더링 시작`);

    let mdFiles = fg.globSync(`./_markdown/dir/**/*.md`);
    for (let [i, mdf] of mdFiles.entries()) {
        let {name} = path.parse(mdf);
        let vars = {
            ...globals,
            permalink: `/dir/{{ name | removeLabel }}`,
            path: `./dir/{{ name | removeLabel }}.json`,
            dir: `__DIRECTORY__`,
            tardir: `{{ name | removeLabel }}`,
            name,
            dirs,
        };
        try {
            Object.assign(pages, renderPage(mdf, vars));
        } catch(e) {
            console.log(`${i}번째 ${mdf} 파일 렌더링 중 예외 발생`);
            console.log(e);
            Deno.exit(1);
        }
    }
    
    console.log(`${mdFiles.length}개 페이지 렌더링 완료`);
}


/**
 * 블로그 외형(index.html, 404.html, sitemap.xml) 렌더링
 */
{
    console.log(`index.html, 404.html, sitemap.xml 렌더링 시작`);

    let vars = {
        ...globals,
        layout: `base`,
        dirs,
        path: `./index.html`,
        name: ``,
    };

    renderPage(``, vars);
    fs.copyFileSync(`./_site/index.html`, `./_site/404.html`);

    vars = {
        ...globals,
        layout: `sitemap`,
        dirs,
        path: `./sitemap.xml`,
        name: ``,
    };

    renderPage(``, vars);

    console.log(`index.html, 404.html, sitemap.xml 렌더링 완료`);
}