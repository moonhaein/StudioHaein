/* ==========================================================
   STUDIO HAEIN — main.js
   프로젝트 목록은 js/projects.js 에서 관리합니다. (이 파일은 수정할 필요 없음)
   ========================================================== */

/* ----------------------------------------------------------
   1. 썸네일 그리기
   - WORK 페이지  : <ul data-work-list>  → 전체 목록
   - 상세 페이지  : <ul data-related>    → 현재 프로젝트 제외 랜덤 N개
   ---------------------------------------------------------- */
(function () {
  if (typeof PROJECTS === "undefined") return;

  // 사이트 최상위 폴더 주소 (js/projects.js 위치 기준으로 계산)
  // → index.html(최상위)에서도, project/ 안의 상세 페이지에서도 경로가 맞게 됨
  const script = document.querySelector('script[src$="projects.js"]');
  const ROOT = new URL("../", script ? script.src : location.href);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const card = (p) => `
    <li class="work-item">
      <a href="${new URL("project/" + p.page, ROOT).href}">
        <img src="${new URL(p.thumb, ROOT).href}" alt="${esc(p.title)}" loading="lazy" />
        <div class="work-overlay">
          <span class="work-title">${esc(p.title)}</span>
          <span class="work-year">${esc(p.year)}</span>
        </div>
      </a>
    </li>`;

  // WORK 페이지: 목록 순서 그대로
  const workList = document.querySelector("[data-work-list]");
  if (workList) workList.innerHTML = PROJECTS.map(card).join("");

  // 상세 페이지: 현재 페이지를 뺀 나머지에서 랜덤 추천
  const related = document.querySelector("[data-related]");
  if (related) {
    const current = decodeURIComponent(location.pathname.split("/").pop());
    const pool = PROJECTS.filter((p) => p.page !== current);

    // 섞기 (Fisher–Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const count = typeof RELATED_COUNT === "number" ? RELATED_COUNT : 2;
    const picks = pool.slice(0, count);

    if (picks.length) {
      related.innerHTML = picks.map(card).join("");
    } else {
      // 추천할 프로젝트가 없으면 섹션 통째로 숨김
      const section = related.closest(".related");
      if (section) section.hidden = true;
    }
  }
})();

/* ----------------------------------------------------------
   2. 모바일: 썸네일을 누르고 있는 동안 오버레이 표시
   - 손가락을 대고 있는 동안 .is-pressed → 흰 오버레이 + 제목/연도
   - 손을 떼면 사라짐 / 짧게 탭하면 상세 페이지로 이동
   - 길게(0.45초 이상) 누른 뒤 떼면 이동하지 않음 (미리보기만)
   - 누른 채로 스크롤하면 오버레이 해제
   (자동으로 그려진 썸네일에도 동작하도록 document 에서 한 번에 처리)
   ---------------------------------------------------------- */
(function () {
  const LONG_PRESS_MS = 450;
  const MOVE_TOLERANCE = 10; // px
  const SELECTOR = ".work-item a";

  let active = null, startX = 0, startY = 0, startTime = 0, suppressClick = null;

  document.addEventListener("touchstart", (e) => {
    const link = e.target.closest(SELECTOR);
    if (!link) return;
    const t = e.touches[0];
    active = link;
    startX = t.clientX;
    startY = t.clientY;
    startTime = Date.now();
    suppressClick = null;
    link.classList.add("is-pressed");
  }, { passive: true });

  document.addEventListener("touchmove", (e) => {
    if (!active) return;
    const t = e.touches[0];
    if (Math.abs(t.clientX - startX) > MOVE_TOLERANCE ||
        Math.abs(t.clientY - startY) > MOVE_TOLERANCE) {
      active.classList.remove("is-pressed");
      active = null;
    }
  }, { passive: true });

  const release = () => {
    if (!active) return;
    if (Date.now() - startTime >= LONG_PRESS_MS) suppressClick = active;
    active.classList.remove("is-pressed");
    active = null;
  };
  document.addEventListener("touchend", release);
  document.addEventListener("touchcancel", release);

  document.addEventListener("click", (e) => {
    const link = e.target.closest(SELECTOR);
    if (link && link === suppressClick) {
      e.preventDefault();
      suppressClick = null;
    }
  });

  // 길게 누를 때 나오는 기본 메뉴(이미지 저장 등) 방지
  document.addEventListener("contextmenu", (e) => {
    if (e.target.closest(SELECTOR)) e.preventDefault();
  });
})();

/* ----------------------------------------------------------
   3. 맨 위로 버튼 (페이지에 .to-top 이 있을 때만)
   ---------------------------------------------------------- */
(function () {
  const btn = document.querySelector(".to-top");
  if (!btn) return;
  const toggle = () => btn.classList.toggle("is-visible", window.scrollY > 400);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
