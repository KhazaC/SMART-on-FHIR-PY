import "./App.css";
import { GetCode, ParseCode } from "./GetCode";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetCode />} />
          <Route path="/parse_code/" element={<ParseCode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
