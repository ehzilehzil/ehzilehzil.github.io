import fs from "fs-extra";
import render from "./render.js";

const test = () => {
    let code = "";
    try {
        code = fs.readFileSync("./test.md", {encoding: "utf-8"});
    } catch(e) {
        code = "";
    }

    let {frontmatter, content} = render.separate(code);
    console.log(render.yaml(frontmatter));
    console.log("---------------------------");
    console.log(render.md(content));
};


switch (Deno.args[0]) {
    case "test":
        test();
        break;
}