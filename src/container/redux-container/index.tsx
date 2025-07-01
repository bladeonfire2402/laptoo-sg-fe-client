"use-client";

import { ClientStore } from '@/redux/store';
// src/ReduxContainer.jsx
import React from 'react';
import { Provider } from 'react-redux';

const ReduxProvider = ({ children }) => {
  return <Provider store={ClientStore}>{children}</Provider>;
};

export default ReduxProvider;
