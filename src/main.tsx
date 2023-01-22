import React from "react";
// To be able to run in GitHub pages use HashRouter instead of BrowserRouter
import { HashRouter } from "react-router-dom";
import App from "./App";

import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HashRouter>
        <App/>
      </HashRouter>
    </React.StrictMode>
  );
}
