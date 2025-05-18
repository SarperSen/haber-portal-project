import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";  // Redux store dosyanın doğru yolunu yazdığından emin ol
import Home from "./pages/Home";

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
