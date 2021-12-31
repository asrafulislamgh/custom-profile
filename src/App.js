import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./Pages/ProfilePage";
import Footer from "./Pages/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfile from "./Pages/EditProfile";
// import Header from "./Pages/Header";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
