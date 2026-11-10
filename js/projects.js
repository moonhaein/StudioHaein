/* ==========================================================
   ★ 프로젝트 목록 — 여기 한 곳만 수정하면 됩니다 ★

   - WORK 페이지: 이 목록 순서대로 표시 (맨 위 = 첫 칸)
   - 상세 페이지 하단 "You may also like":
     이 목록에서 현재 프로젝트를 뺀 나머지 중 랜덤 2개 자동 추천

   새 프로젝트 추가 방법
   1. project 폴더에 상세 페이지 만들기
      (이미지 버전은 0_image.html, 유튜브 버전은 0_youtube.html 복사)
   2. 아래 목록에 { ... } 한 덩어리 추가
      - page  : project 폴더 안의 상세 페이지 파일 이름
      - title : 썸네일 위에 나오는 프로젝트 이름
      - year  : 제작 연도
      - thumb : 썸네일 이미지 경로 (assets 부터)

   잠시 숨기고 싶은 프로젝트는 그 줄 앞에 // 를 붙이면 됩니다.
   ========================================================== */

const PROJECTS = [
  {
    page: "project-10.html",
    title: "대구보건대학교 면접 행사 스케치",
    year: "2026",
    thumb: "assets/works/work-10/work-10-1.png",
  },
  {
    page: "project-09.html",
    title: "경산만화축제 홍보 영상",
    year: "2026",
    thumb: "assets/works/work-09/work-09-1.png",
  },
  {
    page: "project-08.html",
    title: "대구보건대학교 티키타카",
    year: "2026",
    thumb: "assets/works/work-08/work-08-1.png",
  },
  {
    page: "project-07.html",
    title: "점촌점빵길 빵축제 AI 홍보 영상",
    year: "2026",
    thumb: "assets/works/work-07/work-07-0.jpg",
  },
  {
    page: "project-06.html",
    title: "점촌점빵길 빵축제 홍보 영상",
    year: "2026",
    thumb: "assets/works/work-06/work-06-1.png",
  },
  {
    page: "project-05.html",
    title: "우송대학교",
    year: "2025",
    thumb: "assets/works/work-05/work-05-0.jpg",
  },
  {
    page: "project-04.html",
    title: "CBfez",
    year: "2025",
    thumb: "assets/works/work-04/work-04-0.jpg",
  },
  {
    page: "project-03.html",
    title: "Dong-gu Again",
    year: "2024",
    thumb: "assets/works/work-03/work-03-7.png",
  },
  {
    page: "project-02.html",
    title: "Motion Graphics Intro",
    year: "2024",
    thumb: "assets/works/work-02/work-02-1.png",
  },
  {
    page: "project-01.html",
    title: "하루체험",
    year: "2021",
    thumb: "assets/works/work-01/work-01-3.png",
  },
];

/* 추천 개수 (기본 2개) */
const RELATED_COUNT = 2;
