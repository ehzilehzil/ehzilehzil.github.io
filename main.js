// @ts-check

import fs from "fs-extra";
import fg from "fast-glob";
import * as $ from "./utils.js";


/**
 * 페이지(포스팅)에 해당하는 마크다운 파싱 후 임시저장
 */
{
    let mdFiles = 
}


/**
 * 테스트
 * @type {() => void}
 */
let test = () => {
    let mdFiles = fg.globSync(`./_markdown/**/*.md`).sort();
    console.log(mdFiles);
};