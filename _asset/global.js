"use strict";

const $html = document.documentElement;
const $main = document.querySelector(`main`);

// 페이지 오픈 직후, 자동 애니메이션/트랜지션 방지
window.onload = () => {
    $html.classList.remove("preload");
};

// pages.json 로딩
let pages = await (await fetch(`/pages.json`)).json();

// 콘텐츠 로딩 함수
const fetch_content = async () => {
    let cur = window.location.pathname;
    let tar = pages[cur]?.path ?? pages[`/page/404`].path;

    console.log(tar);

    let res = await(await fetch(tar)).json();

    // console.log(res);

    $main.innerHTML = res.content;
};

// 주소 직접입력
fetch_content();

// 브라우저 전/후 이동버튼 클릭
window.onpopstate = () => fetch_content();

// 링크 클릭
document.body.onclick = async (e) => {
    // SPA 작동 조건
    let t = e.target;
    if (t.matches("a") && t.href.startsWith(window.location.origin) && !t.href.match(/[.#]/)) {
        e.preventDefault();

        // 현재의 주소와 동일하지 않을때 작동
        if (t.href !== window.location.href) {
            history.pushState(null, null, t.href);
            fetch_content();
        }
    }
};