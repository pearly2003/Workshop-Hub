import { useState } from "react";
import "./App.css";
import NavPath from "./routes/NavPath";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import SessionExpiredModal from "../utils/SessionExpiredModal";

function App() {
  const isSectionExpire = useSelector((state) => state.auth.isSectionExpire);

  return (
    <>
      <div className={` theme-blue `}>
        <ToastContainer />
        <NavPath />
        <SessionExpiredModal isExpired={isSectionExpire} />
      </div>
    </>
  );
}

export default App;


//  import { useState } from "react";
// const App = () => {
//   const [count, setCount] = useState(0);

//   const result = expensiveCalculation();

//   return (
//     <>
//       <h1>{result}</h1>
//       <button onClick={() => setCount(count + 1)}>
//         {count}
//       </button>
//     </>
//   );
// }

// export default App;