import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  getDefaultResources,
  getStoredResources,
  saveResources
} from '../utils/storage';

const initialState = {
  resources: getStoredResources(),
  selectedCategory: 'All Resources',
  selectedSemester: 'All Semesters',
  selectedTag: null,
  searchQuery: ''
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedSemester(state, action) {
      state.selectedSemester = action.payload;
    },
    setSelectedTag(state, action) {
      state.selectedTag = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    addResource(state, action) {
      state.resources.unshift(action.payload);
    },
    deleteResource(state, action) {
      state.resources = state.resources.filter((item) => item.id !== action.payload);
    },
    toggleResourceStatus(state, action) {
      const resource = state.resources.find((item) => item.id === action.payload);
      if (!resource) return;

      resource.status =
        resource.status === 'To Read'
          ? 'In Progress'
          : resource.status === 'In Progress'
          ? 'Mastered'
          : 'To Read';
    },
    resetExplorer(state, action) {
      state.resources = action.payload;
      state.selectedCategory = 'All Resources';
      state.selectedSemester = 'All Semesters';
      state.selectedTag = null;
      state.searchQuery = '';
    }
  }
});

const {
  addResource,
  deleteResource,
  resetExplorer,
  toggleResourceStatus
} = appSlice.actions;

const persistResourcesMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);

  if (
    addResource.match(action) ||
    deleteResource.match(action) ||
    resetExplorer.match(action) ||
    toggleResourceStatus.match(action)
  ) {
    saveResources(storeApi.getState().app.resources);
  }

  return result;
};

export const {
  setSelectedCategory,
  setSelectedSemester,
  setSelectedTag,
  setSearchQuery
} = appSlice.actions;
export { addResource, deleteResource, resetExplorer, toggleResourceStatus };
export const appReducer = appSlice.reducer;
export { persistResourcesMiddleware };

const selectResources = (state) => state.app.resources;

export const selectFilteredResources = createSelector(
  [
    selectResources,
    (state) => state.app.selectedCategory,
    (state) => state.app.selectedSemester,
    (state) => state.app.selectedTag,
    (state) => state.app.searchQuery.trim().toLowerCase()
  ],
  (resources, category, semester, tag, query) =>
    resources.filter((item) => {
      const matchesCategory = category === 'All Resources' || item.category === category;
      const matchesSemester = semester === 'All Semesters' || item.semester === semester;
      const matchesTag = !tag || item.tags?.includes(tag);
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.semester?.toLowerCase().includes(query) ||
        item.tags?.some((resourceTag) => resourceTag.toLowerCase().includes(query));

      return matchesCategory && matchesSemester && matchesTag && matchesSearch;
    })
);

export const selectCategoryCounts = createSelector([selectResources], (resources) => ({
  'All Resources': resources.length,
  'Core CS': resources.filter((item) => item.category === 'Core CS').length,
  'AI/ML': resources.filter((item) => item.category === 'AI/ML').length,
  'Web Dev': resources.filter((item) => item.category === 'Web Dev').length,
  Academics: resources.filter((item) => item.category === 'Academics').length,
  'Learning Roadmap': resources.filter((item) => item.category === 'Learning Roadmap').length
}));
