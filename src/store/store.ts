import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { notesReducer } from "./notes/slice";
import { tagsReducer } from "./tags/slice";
import { searchReducer } from "./search/slice";
import { groupsReducer } from "./groups/slice";

export const store = configureStore({
  reducer: combineReducers({
    notes: notesReducer.reducer,
    tags: tagsReducer.reducer,
    searchValue: searchReducer.reducer,
    activeGroup: groupsReducer.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
