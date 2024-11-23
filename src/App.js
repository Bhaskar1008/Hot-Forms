import logo from "./logo.svg";
import "./App.css";
import HotFormBuilder from "./components/HotFormBuilder/HotFormBuilder";
import { Provider } from "react-redux";
import store from "./components/Redux_Store/Store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import PreviewHotforms from "./components/HotFormBuilder/Preview_Hotforms/PreviewHotforms";
import { StructureProvider } from "./utils/useComponentStructure";
import HotForm from "./components/HotForm/HotForm";
import { Button } from "antd";
import { useState } from "react";

function App() {

  return (
    <div>

      <Provider store={store}>
        <StructureProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HotFormBuilder />} />
              <Route path="/preview" element={<  PreviewHotforms />} />
            </Routes>
          </Router>
        </StructureProvider>
      </Provider>
    </div>
  );
}

export default App;
