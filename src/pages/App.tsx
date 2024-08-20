import "../style/App.css";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";
import { RootState } from "../lib/redux/store";
import { useEffect } from "react";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => navigate("/auth/login"), []);
  return (
    <>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>plus</button>
      <button onClick={() => dispatch(decrement())}>minus</button>
      <div></div>
      <h1 className=" bg-yellow-100">Vite + React</h1>
      <div className="card">
        <button onClick={() => redirect("auth/registration")}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
