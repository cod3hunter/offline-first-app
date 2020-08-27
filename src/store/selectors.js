import {createSelector} from '@reduxjs/toolkit';
import {sortByTitle} from '../services/utils';

const postsSelector = (state) => state.posts.data;
const userSelector = (state) => state.user.data;

export const userIdSelector = createSelector(userSelector, (user) => user?.id);

export const postListSelector = createSelector(postsSelector, (posts) =>
  [...posts].sort(sortByTitle),
);

export const postByIdSelector = (postId) =>
  createSelector(postsSelector, (posts) =>
    posts.find((post) => post.id === postId),
  );
