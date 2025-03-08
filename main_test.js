import fs from "fs-extra";
import fg from "fast-glob";
import render from "./render.js";
import path from "node:path";


let a = `
<h1>{{ test }}</h1>
`;

a = render.liquid(a, {test1: "Hello World!"});

console.log(a);

