import React, { useState, useEffect } from 'react';
import './App.scss';
import { logger } from 'react-native-logs';
import Header from "./Components/Header";
import Footer from './Components/Footer';
import PageBody from './Components/PageBody';

const log = logger.createLogger();

export default function App() {

  return (
      <React.StrictMode>
          <Header />
          <PageBody />
          <Footer />
      </React.StrictMode>
  );
}

