/* ==========================================================
   모바일: 썸네일을 누르고 있는 동안 오버레이 표시
   - 손가락을 대고 있는 동안 .is-pressed → 흰 오버레이 + 제목/연도
   - 손을 떼면 사라짐
   - 짧게 탭하면 그대로 상세 페이지로 이동
   - 길게(0.45초 이상) 누른 뒤 떼면 이동하지 않음 (미리보기만)
   - 누른 채로 스크롤하면 오버레이 해제
   ========================================================== */
(function () {
  const LONG_PRESS_MS = 450;
  const MOVE_TOLERANCE = 10; // px

  document.querySelectorAll(".work-item a").forEach((link) => {
    let startX = 0, startY = 0, startTime = 0, wasLongPress = false;

    link.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      startTime = Date.now();
      wasLongPress = false;
      link.classList.add("is-pressed");
    }, { passive: true });

    link.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      if (Math.abs(t.clientX - startX) > MOVE_TOLERANCE ||
          Math.abs(t.clientY - startY) > MOVE_TOLERANCE) {
        link.classList.remove("is-pressed");
      }
    }, { passive: true });

    const release = () => {
      if (Date.now() - startTime >= LONG_PRESS_MS) wasLongPress = true;
      link.classList.remove("is-pressed");
    };
    link.addEventListener("touchend", release);
    link.addEventListener("touchcancel", release);

    link.addEventListener("click", (e) => {
      if (wasLongPress) {
        e.preventDefault();
        wasLongPress = false;
      }
    });

    // 길게 누를 때 나오는 기본 메뉴(이미지 저장 등) 방지
    link.addEventListener("contextmenu", (e) => e.preventDefault());
  });
})();

/* ==========================================================
   맨 위로 버튼 (페이지에 .to-top 이 있을 때만)
   ========================================================== */
(function () {
  const btn = document.querySelector(".to-top");
  if (!btn) return;
  const toggle = () => btn.classList.toggle("is-visible", window.scrollY > 400);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
