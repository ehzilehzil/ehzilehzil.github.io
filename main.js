// @ts-check

import fs from "fs-extra";
import * as $ from "./utils.js";

/**
 * 테스트
 * @type {() => void}
 */
let test = () => {
    let a = fs.readFileSync(`./_markdown/page/_test/[0010]my_test.md`, {encoding: `utf-8`});
    let {data, content} = $.parse.separate(a);
    content = $.parse.md(content);

    console.log(content);
};

test();