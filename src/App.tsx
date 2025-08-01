import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MainContainerWrapper,
  LightMainContainerWrapper,
  PrimeMainContainer,
} from "./core-UI/mainContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/mainPage/MainPage";
import Footer from "./components/Footer/Footer";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import Notification from "./components/Notifictions/Notification";

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

function App() {
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    // Simulate loading all necessary data
    const loadAllData = async () => {
      // Here you would typically fetch all initial data needed for your app
      // For now, we'll simulate a loading time
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsLoader(false);
    };

    loadAllData();
  }, []);


  return (
    <>
      <MainContainerWrapper>
        <LightMainContainerWrapper>
          <PrimeMainContainer>
            <Router>
              <Notification />
              <Navbar />
              <Routes>
                <Route path="/" element={<MainPage />} />
              </Routes>
              <Footer />
            </Router>
          </PrimeMainContainer>
        </LightMainContainerWrapper>
      </MainContainerWrapper>
    </>
  );
}

export default App;
