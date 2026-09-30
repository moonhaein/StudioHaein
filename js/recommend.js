// js/recommend.js

const portfolioVideos = [
  {
    title: "하루체험",
    url: "team_video1.html",
    thumbnail: "image/team1_oneday.jpg"
  },
  {
    title: "Dong-gu Again",
    url: "team_video2.html",
    thumbnail: "image/team2_donggu again.jpg"
  },
  {
    title: "청춘은 차와 함께",
    url: "team_video3.html",
    thumbnail: "image/team3_kcar.jpg"
  },
  {
    title: "이야기, 소제",
    url: "team_video4.html",
    thumbnail: "image/team4_soje.jpg"
  },
  {
    title: "Motion Graphics",
    url: "personal_video1.html",
    thumbnail: "image/personal1_intro.jpg"
  },
  // 🔽 새 영상 추가 시 여기에 계속 추가
  // {
  //   title: "새 영상 제목",
  //   url: "video_new.html",
  //   thumbnail: "image/new_thumbnail.jpg"
  // }
];

// 배열 섞기 함수
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 추천 영상 3개 삽입
function insertRandomRecommendations() {
  const recommendContainer = document.getElementById("recommendList");
  if (!recommendContainer) return;

  const currentPage = location.pathname.split("/").pop();

  const filtered = portfolioVideos.filter(video => video.url !== currentPage);
  const shuffled = shuffleArray(filtered);
  const selected = shuffled.slice(0, 3);

  selected.forEach(video => {
    const card = document.createElement("a");
    card.className = "recommend-card";
    card.href = video.url;
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}" />
      <p>${video.title}</p>
    `;
    recommendContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", insertRandomRecommendations);