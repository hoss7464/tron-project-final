import {useEffect} from "react";
import "./App.css";
import {
  MainContainerWrapper,
  LightMainContainerWrapper,
  PrimeMainContainer,
} from "./core-UI/mainContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootState } from "./redux/store/store";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
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
    const popUpVisible = useSelector((state: RootState) => state.toggle.toggles.popUp);


    useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
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
            <Router>
              <ScrollToTop />
              <Notification />
              <Navbar />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Buyers" element={<Buyers />} />
                <Route path="/Sellers" element={<Sellers />} />
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
