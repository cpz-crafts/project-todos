/* eslint-disable max-len */
/* eslint-disable no-shadow */
// src/reducers/project.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  const projectsFromLocalStorage = JSON.parse(localStorage.getItem('projectsList'));
  if (projectsFromLocalStorage) {
    return projectsFromLocalStorage;
  } else {
    return [
      { id: 1, name: 'Small daily tasks', complete: false },
      { id: 2, name: 'Cleaning', complete: false }
    ];
  }
};

const initialState = getInitialState();

export const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      const newId = state.length ? Math.max(...state.map((project) => project.id)) + 1 : 1;
      state.push({ id: newId, name: action.payload.name, complete: false });
      localStorage.setItem('projectsList', JSON.stringify(state));
    },
    toggleComplete: (state, action) => {
      const project = state.find((project) => project.id === action.payload);
      if (project) {
        project.complete = !project.complete;
      }
      localStorage.setItem('projectsList', JSON.stringify(state));
    },
    deleteProject: (state, action) => {
      const newState = state.filter((project) => project.id !== action.payload);
      localStorage.setItem('projectsList', JSON.stringify(newState));
      return newState;
    }
  }
});

export const { addProject, toggleComplete: toggleProjectComplete, deleteProject } = projects.actions;
