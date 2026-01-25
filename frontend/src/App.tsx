import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Templates from "./pages/TemplatePage";
import PromptBuilder from "./pages/PromptBuilder";
//import PromptBuilder from "./pages/PromptBuilder";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/prompt-builder" element={<PromptBuilder/>} />
      </Routes>
    </Router>
  );
}

export default Main;
