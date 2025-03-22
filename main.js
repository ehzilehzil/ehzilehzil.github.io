// @ts-check

/**
 * 어질어질 블로그 빌더 v1.0
 */


import fs from "fs-extra";
import fg from "fast-glob";
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
    },
};


/**
 * 렌더링 완료된 markdown 들의 permalink(인터넷 주소)와 path(콘텐츠 담긴 파일 경로)를 매칭하는 객체
 * 블로그에서 주소를 호출했을 때, 매칭되어 있는 json 파일을 로드하기 위한 용도
 * { permalink: { path, title } } 형태
 * @type {Object<string, Object<string, string>>}
 */
let pages = {};

/**
 * 렌더링을 수행하는 함수, srcFile(소스 파일 경로)와 vars(렌더링에 필요한 초기 외부 변수)를 받아서 렌더링
 * {[permalink]: {path, title}} 형태로 리턴
 * @type {(srcFile: string, vars: Object<string, any>) => Object<string, Object<string, string>>}
 */
const renderPage = (srcFile, vars) => {
    // vars defaults
    vars.permalink ??= `/page/{{ name | remove_label }}`;
    vars.path ??= `./page/{{ name | remove_label }}.json`;
    vars.title ??= `{{ name }}`;

    // parse vars itself
    Object.assign(vars, JSON.parse(render.liquid(JSON.stringify(vars), vars)));

    // parse markdown
    if (srcFile.endsWith(`md`)) {
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

    fs.outputJSONSync(vars.path.replace(`./`, `./_site/`), {content: vars.content}, {encoding: `utf-8`});
    console.log(vars.content);

    return {[vars.permalink]: {path: vars.path, title: vars.title, dir: vars.dir}};
};


// // test
// let vars = {
//     ...globals,
//     permalink: `/page/{{ name | removeLabel }}`,
//     path: `./__temp/{{ name | removeLabel }}.json`,
//     title: `테스트~~`,
//     name: `[label]test`,
// };
// let rtn = renderPage(`./_layout/[label]test.md`, vars);
// console.log(rtn);


/**
 * ./_markdown/page 안의 md 파일들을 json 으로 변환
 */
{
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
            Deno.exit(1);
        }
    }

    console.log(`${mdFiles.length}개 페이지 렌더링 완료`);
}

console.log(pages);