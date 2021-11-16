import useSocket from "hooks/useSocket";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch } from "./app/store";
import { getMe } from "./reduxSlice/authSlice";
import RoutesComponent from "./routes";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [start, setStart] = useState<boolean>(true);

  useSocket();

  useEffect(() => {
    dispatch(getMe()).then(() => setStart(false));
  }, [dispatch]);

  return (
    <div className="App">
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={5}
        toastOptions={{
          duration: 5000,
        }}
      />
      {!start && <RoutesComponent />}
    </div>
  );
}

export default App;
