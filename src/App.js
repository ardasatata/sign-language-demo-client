import React, {useEffect, useState, useReducer} from 'react';

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Demo from "./Demo";
import Collection from "./Collection";
import Predict from "./Predict";
import DemoNew from "./DemoNew";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Collection />} />
              <Route path="predict" element={<Predict />} />
              <Route path="demo" element={<Demo />} />
              <Route path="demo-new" element={<DemoNew />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
