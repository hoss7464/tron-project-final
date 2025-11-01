import { useEffect } from "react";
import "./App.css";
import {
  MainContainerWrapper,
  LightMainContainerWrapper,
  PrimeMainContainer,
} from "./core-UI/mainContainer";
import { Routes, Route } from "react-router-dom";
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
          <PrimeMainContainer >
            <ScrollToTop />
            <Notification />
            <Navbar />
            <HamburgerBtn onClick={openSidebar} />
            <Sidebar open={isSidebarOpen} onClose={closeSidebar} />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Buyers" element={<Buyers />} />
              <Route path="/Sellers" element={<Sellers />} />
            </Routes>
            <Footer />
          </PrimeMainContainer>
        </LightMainContainerWrapper>
      </MainContainerWrapper>
    </>
  );
}

export default App;
