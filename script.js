// スクロール　ページトップボタンの要素を取得
const pageTopButton = document.getElementById("js-page-top");

// クリックイベントをアロー関数で設定
pageTopButton.addEventListener("click", () => {
  // ページの一番上へスムーズにスクロール
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ハンバーガーメニュー
// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) return document.scrollingElement;
    return document.documentElement;
  };

  const scrollY = bool
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");

  const fixedStyles = {
    height: "100vh",
    position: "fixed",
    top: `${scrollY * -1}px`,
    left: "0",
    width: "100vw",
  };

  Object.keys(fixedStyles).forEach((key) => {
    document.body.style[key] = bool ? fixedStyles[key] : "";
  });

  if (!bool) {
    window.scrollTo(0, scrollY * -1);
  }
};

// 変数定義
const CLASS = "-active";
let flg = false;
let accordionFlg = false;

let hamburger = document.getElementById("js-hamburger");
let focusTrap = document.getElementById("js-focus-trap");
let menu = document.querySelector(".js-nav-area");
let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
let accordion = document.querySelectorAll(".js-sp-accordion");

// メニュー開閉制御
hamburger.addEventListener("click", (e) => {
  //ハンバーガーボタンが選択されたら
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {
    // flgの状態で制御内容を切り替え
    backgroundFix(false);
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.focus();
    flg = false;
  } else {
    backgroundFix(true);
    hamburger.setAttribute("aria-expanded", "true");
    flg = true;
  }
});
window.addEventListener("keydown", () => {
  //escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    hamburger.classList.remove(CLASS);
    menu.classList.remove(CLASS);

    backgroundFix(false);
    hamburger.focus();
    hamburger.setAttribute("aria-expanded", "false");
    flg = false;
  }
});

// メニュー内アコーディオン制御
accordionTrigger.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (accordionFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      accordionFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      accordionFlg = true;
    }
  });
});

// フォーカストラップ制御
focusTrap.addEventListener("focus", (e) => {
  hamburger.focus();
});

// 吹き出しの動き
// const box1 = document.querySelector(".comments img:nth-of-type(1)");
// const box2 = document.querySelector(".comments img:nth-of-type(2)");
// const box3 = document.querySelector(".comments img:nth-of-type(3)");
// const box4 = document.querySelector(".comments img:nth-of-type(4)");

// const TL = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".campaign",
//     scrub: true,
//     start: "top 50%",
//     end: "top 10%",
//     markers: true,
//   },
//   defaults: {
//     duration: 0.5,
//     y: 30,
//     autoAlpha: 0,
//   },
// });

// TL.from(box1, {}).from(box2, {}).from(box3, {}).from(box4, {});

// const box1 = document.querySelector(".comments img:nth-of-type(1)");
// const box2 = document.querySelector(".comments img:nth-of-type(2)");
// const box3 = document.querySelector(".comments img:nth-of-type(3)");
// const box4 = document.querySelector(".comments img:nth-of-type(4)");
// const trigger = document.querySelector(".js-fade-trigger");

// const TL = gsap.timeline({
// 	defaults: {
// 		duration: 0.5,
// 		y: 30,
// 		autoAlpha: 0,
// 	},
// });

// TL.from(box1, {
// 	scrollTrigger: {
// 		trigger: trigger,
// 		scrub: true,
// 		start: "top 60%",
// 		end: "top 30%",
// 	},
// })
// 	.from(box2, {
// 		scrollTrigger: {
// 			trigger: box1,
// 			scrub: true,
// 			start: "top 60%",
// 			end: "top 30%",
// 		},
// 	})
// 	.from(box3, {
// 		scrollTrigger: {
// 			trigger: box2,
// 			scrub: true,
// 			start: "top 60%",
// 			end: "top 30%",
// 		},
// 	})
// 	.from(box4, {
// 		scrollTrigger: {
// 			trigger: box3,
// 			scrub: true,
// 			start: "top 60%",
// 			end: "top 30%",
// 		},
// 	});
// });

// 処理を簡潔に;
const boxes = document.querySelectorAll(".comments img"); // .comments内の全ての画像を配列として取得
const trigger = document.querySelector(".js-fade-trigger");

boxes.forEach((box, index) => {
  gsap.from(box, {
    y: 30,
    autoAlpha: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: index === 0 ? trigger : boxes[index - 1], // 最初は trigger、以降は前のboxをトリガーに
      scrub: true,
      start: "top 60%",
      end: "top 30%",
    },
  });
});
