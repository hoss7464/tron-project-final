import { useEffect } from "react";
import "./App.css";
import ErrorPage from "./pages/errors/404";
import {
  MainContainerWrapper,
  LightMainContainerWrapper,
  PrimeMainContainer,
} from "./core-UI/mainContainer";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "./redux/store/store";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import HamburgerBtn from "./components/HamburgerBtn/HamburgerBtn";
import { useSidebar } from "./hooks/useSidebar";
import MainPage from "./pages/mainPage/MainPage";
import Buyers from "./pages/investors/Buyers/Buyers";
import Sellers from "./pages/investors/Sellers/Sellers";
import Footer from "./components/Footer/Footer";
import Notification from "./components/Notifictions/Notification";
import Loader from "./components/Loader/Loader";
import PopUp from "./components/Popup/PopUp";
import SelectWalletComponent from "./components/SelectWalletComponent/SelectWalletComponent";
import ScrollToTop from "./core-UI/scrollToTop";

function App() {
  const popUpVisible = useSelector(
    (state: RootState) => state.toggle.toggles.popUp
  );
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();

  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      <Loader />
      {popUpVisible && (
        <PopUp>
          <SelectWalletComponent />
        </PopUp>
      )}

      <MainContainerWrapper>
        <LightMainContainerWrapper>
          <PrimeMainContainer>
            <ScrollToTop />
            <Notification />

            <HamburgerBtn onClick={openSidebar} />

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Sidebar open={isSidebarOpen} onClose={closeSidebar} />
                    <MainPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/Buyers"
                element={
                  <>
                    <Navbar />
                    <Sidebar open={isSidebarOpen} onClose={closeSidebar} />
                    <Buyers />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/Sellers"
                element={
                  <>
                    <Navbar />
                    <Sidebar open={isSidebarOpen} onClose={closeSidebar} />
                    <Sellers />
                    <Footer />
                  </>
                }
              />
              {/* 404 page */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </PrimeMainContainer>
        </LightMainContainerWrapper>
      </MainContainerWrapper>
    </>
  );
}

export default App;
