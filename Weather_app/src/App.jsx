// RUN IN TERMINAL: npm run dev
import {useEffect, useState} from "react";
import Weather from "./Weather";

const App = () => {
  return(
    <div>
      <Weather />
    </div>
  );
}

export default App