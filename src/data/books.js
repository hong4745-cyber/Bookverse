// 109개 실제 책 표지 이미지
export const BOOK_COVERS = Array.from({ length: 109 }, (_, i) => ({
  id: i + 1,
  src: `/images/hero_book_${i + 1}.png`,
}));

// 큐레이션 선택 도서 (3단계)
export const SELECTED_BOOK_IDS = [3, 12, 24, 47, 88];

// 중앙 스테이지 실제 큐레이션 도서 (Bookvers_1 ~ Bookvers_5)
export const CURATED_BOOKS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  src: `/images/Bookvers_${i + 1}.png`,
}));
