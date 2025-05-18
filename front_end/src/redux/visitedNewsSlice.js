import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

const visitedNewsSlice = createSlice({
  name: "visitedNews",
  initialState,
  reducers: {
    addVisitedNews: (state, action) => {
      const newNews = action.payload;
      // Eğer key veya url ile zaten varsa ekleme
      const exists = state.news.some(
        (item) => item.url === newNews.url
      );
      if (!exists) {
        state.news.push(newNews);
      }
    },
    clearVisitedNews: (state) => {
      state.news = [];
    },
  },
});

export const { addVisitedNews, clearVisitedNews } = visitedNewsSlice.actions;
export default visitedNewsSlice.reducer;
