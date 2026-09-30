/* =========================================================
   STUDIO HAEIN - Front JS
   - index.html : Portfolio(6), What I do, Story(4) rendering
   - portfolio.html : Full list + filter
   - story.html : List
   ========================================================= */

// 1) 데이터만 수정하면 섹션이 자동으로 바뀌도록 배열 기반으로 구성했습니다.

const PORTFOLIO = [
  {
   id: "p6",
   title: "우송대학교 홍보 숏폼 제작",
   desc: "영상 콘텐츠 디자인",
   thumb: "portfolio/portpolio_woosong_thumb.jpg",
   href: "design_woosong.html",
   category: "design",
   date: "2026-02-28",
  },
  {
   id: "d1",
   title: "CBFEZ 카드뉴스 · 블로그 콘텐츠",
   desc: "카드뉴스/블로그 콘텐츠 디자인",
   thumb: "portfolio/portpolio_CBFEZ_thumb.jpg",
   href: "design_cbfez.html",
   category: "design",
   date: "2026-02-01",
  },
  {
    id: "p5",
    title: "이야기, 소제",
    desc: "소제동의 과거, 현재 그리고 미래",
    thumb: "image/team4_soje.jpg",
    href: "team_video4.html",
    category: "video",
    date: "2024-12-8",
  },
  {
    id: "p4",
    title: "청춘은 차와 함께",
    desc: "케이카 영상 공모전 제출작품",
    thumb: "image/team3_kcar.jpg",
    href: "team_video3.html",
    category: "video",
    date: "2024-11-19",
  },
  {
    id: "p3",
    title: "Dong-gu Again",
    desc: "고독을 즐기는 청년이 대전 동구를 누빈다",
    thumb: "image/team2_donggu again.jpg",
    href: "team_video2.html",
    category: "video",
    date: "2024-06-11",
  },
  {
    id: "p2",
    title: "Motion Graphics Intro",
    desc: "모션그래픽을 이용한 포트폴리오 인트로",
    thumb: "image/personal1_intro.jpg",
    href: "personal_video1.html",
    category: "video",
    date: "2024-03-28",
  },
  {
    id: "p1",
    title: "하루체험",
    desc: "하루체험 어플리케이션 홍보영상",
    thumb: "image/team1_oneday.jpg",
    href: "team_video1.html",
    category: "video",
    date: "2021-04-11",
  },
];

const WHAT_I_DO = [
  { iconImg: "image/icon_ai.png", title: "Illustrator", desc: "●●●●●" },
  { iconImg: "image/icon_ps.png", title: "Photoshop", desc: "●●●●○" },
  { iconImg: "image/icon_pr.png", title: "Premiere Pro", desc: "●●●●●" },
  { iconImg: "image/icon_ae.png", title: "After Effects", desc: "●●●●○" },
  { iconImg: "image/icon_4d.png", title: "Cinema 4D", desc: "●●○○○" },
];

// Story는 지금은 샘플입니다. (링크를 실제 게시물로 바꾸면 됩니다.)
const STORY = [
  {
    id: "s4",
    title: "작업 기록 예시 4",
    excerpt: "작업 과정과 배운 점을 짧게 정리해요.",
    cover: "image/main.jpg",
    href: "story.html",
    date: "2026-01-20",
  },
  {
    id: "s3",
    title: "작업 기록 예시 3",
    excerpt: "기획부터 결과물까지 흐름을 남겨요.",
    cover: "image/team4_soje.jpg",
    href: "story.html",
    date: "2026-01-10",
  },
  {
    id: "s2",
    title: "작업 기록 예시 2",
    excerpt: "모션그래픽 디테일을 체크한 포인트.",
    cover: "image/personal1_intro.jpg",
    href: "story.html",
    date: "2025-12-30",
  },
  {
    id: "s1",
    title: "작업 기록 예시 1",
    excerpt: "이 프로젝트에서 가장 어려웠던 점.",
    cover: "image/team2_donggu again.jpg",
    href: "story.html",
    date: "2025-12-15",
  },
];

/* -----------------------------
   Helpers
------------------------------ */

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(iso) {
  // 2026-01-20 -> 2026.01.20
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${y}.${m}.${d}`;
}

/* -----------------------------
   Renderers
------------------------------ */

function renderPortfolioCards(list, mountEl) {
  mountEl.innerHTML = list
    .map((p) => {
      return `
        <a class="portfolio-card" href="${escapeHtml(p.href)}" data-category="${escapeHtml(p.category)}" aria-label="${escapeHtml(p.title)}">
          <img class="portfolio-thumb" src="${escapeHtml(p.thumb)}" alt="${escapeHtml(p.title)} 썸네일" loading="lazy" />
          <div class="portfolio-body">
            <p class="portfolio-kicker">${escapeHtml((p.category || "").toUpperCase())} · ${escapeHtml(formatDate(p.date))}</p>
            <h3 class="portfolio-title">${escapeHtml(p.title)}</h3>
            <p class="portfolio-desc">${escapeHtml(p.desc)}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

function renderWhatIDo(list, mountEl) {
  mountEl.innerHTML = list
    .map((item) => {
      // ✅ iconImg(이미지) 있으면 이미지로, 없으면 기존 icon(이모지)로
      const iconHtml = item.iconImg
        ? `<img class="skill-icon" src="${escapeHtml(item.iconImg)}" alt="${escapeHtml(item.title)} 아이콘" loading="lazy" />`
        : `<span class="skill-emoji" aria-hidden="true">${escapeHtml(item.icon || "")}</span>`;

      return `
        <div class="icon-block">
          <div class="icon-circle">
            ${iconHtml}
          </div>
          <h3 class="icon-title">${escapeHtml(item.title)}</h3>
          <p class="icon-desc">${escapeHtml(item.desc)}</p>
        </div>
      `;
    })
    .join("");
}

function renderStoryList(list, mountEl) {
  mountEl.innerHTML = list
    .map((s) => {
      return `
        <a class="story-list-item" href="${escapeHtml(s.href)}" aria-label="${escapeHtml(s.title)}">
          <div class="story-list-cover">
            <img src="${escapeHtml(s.cover)}" alt="" loading="lazy" />
          </div>
          <div class="story-list-body">
            <p class="story-meta">${escapeHtml(formatDate(s.date))}</p>
            <h3 class="story-title">${escapeHtml(s.title)}</h3>
            <p class="story-excerpt">${escapeHtml(s.excerpt)}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

/* -----------------------------
   Portfolio filter (portfolio.html)
------------------------------ */

function bindPortfolioFilter() {
  const listEl = qs("#portfolioList");
  const btns = qsa(".filter-btn");
  if (!listEl || btns.length === 0) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";
      btns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      qsa("#portfolioList .portfolio-card").forEach((card) => {
        const cat = card.getAttribute("data-category");
        const show = filter === "all" || filter === cat;
        card.style.display = show ? "block" : "none";
      });
    });
  });
}

/* -----------------------------
   Scroll to top
------------------------------ */

function bindScrollToTop() {
  const btn = qs("#scrollToTop");
  if (!btn) return;
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}


/* -----------------------------
   Header transparency (home)
------------------------------ */
function bindHeaderScroll() {
  const header = qs(".site-header");
  const isHome = document.body.classList.contains("page-home");
  if (!header || !isHome) return;

  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add("is-solid");
    else header.classList.remove("is-solid");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}


/* -----------------------------
   Init
------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  // index.html
  const portfolioGrid = qs("#portfolioGrid");
  if (portfolioGrid) {
    renderPortfolioCards(PORTFOLIO.slice(0, 6), portfolioGrid);
  }

  const whatIDoRow = qs("#whatIDoRow");
  if (whatIDoRow) {
    renderWhatIDo(WHAT_I_DO, whatIDoRow);
  }

  // portfolio.html
  const portfolioList = qs("#portfolioList");
  if (portfolioList) {
    renderPortfolioCards(PORTFOLIO, portfolioList);
    bindPortfolioFilter();
  }

  // story.html
  const storyList = qs("#storyList");
  if (storyList) {
    renderStoryList(STORY, storyList);
  }

  bindHeaderScroll();
  bindScrollToTop();

  bindDesignDetailNav(); //
});

function bindDesignDetailNav() {
  const nextEl = document.querySelector("#navNext");
  const prevEl = document.querySelector("#navPrev");
  if (!nextEl || !prevEl) return; // 디자인 상세 페이지에서만 동작

  // 현재 페이지 파일명(예: design_cbfez.html)
  const current = location.pathname.split("/").pop();

  // design 항목만
  const designs = PORTFOLIO.filter(p => p.category === "design");

  // 현재 페이지가 designs에서 몇 번째인지 찾기 (href로 매칭)
  const idx = designs.findIndex(p => (p.href || "") === current);

  // 매칭 못하면 그냥 비활성
  if (idx === -1) {
    nextEl.setAttribute("data-disabled", "true");
    prevEl.setAttribute("data-disabled", "true");
    nextEl.href = "#";
    prevEl.href = "#";
    return;
  }

  // 너 규칙: 왼쪽 화살표 = 다음, 오른쪽 화살표 = 이전
  const nextItem = designs[idx - 1];
  const prevItem = designs[idx + 1];

  if (nextItem) {
    nextEl.href = nextItem.href;
    nextEl.removeAttribute("data-disabled");
  } else {
    nextEl.href = "#";
    nextEl.setAttribute("data-disabled", "true");
  }

  if (prevItem) {
    prevEl.href = prevItem.href;
    prevEl.removeAttribute("data-disabled");
  } else {
    prevEl.href = "#";
    prevEl.setAttribute("data-disabled", "true");
  }
}