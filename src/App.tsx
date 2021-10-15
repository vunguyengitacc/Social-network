import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch } from "./app/store";
import { getMe } from "./reduxSlice/authSlice";
import RoutesComponent from "./routes";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [start, setStart] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getMe()).then(() => setStart(false));
  }, [dispatch]);

  return <div className="App">{!start && <RoutesComponent />}</div>;
}

export default App;
