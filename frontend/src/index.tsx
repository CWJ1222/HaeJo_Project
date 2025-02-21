import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store"; // Redux Store 불러오기
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
