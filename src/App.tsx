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
import Footer from "./components/Footer/Footer";
import Notification from "./components/Notifictions/Notification";
import Loader from "./components/Loader/Loader";
import PopUp from "./components/Popup/PopUp";
import SelectWalletComponent from "./components/SelectWalletComponent/SelectWalletComponent";

function App() {
    const popUpVisible = useSelector((state: RootState) => state.toggle.toggles.popUp);
    
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
