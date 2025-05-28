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

function App() {
  return (
    <>
      <MainContainerWrapper>
        <LightMainContainerWrapper>
          <PrimeMainContainer>
            <Router>
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
