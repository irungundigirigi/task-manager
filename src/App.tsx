import { useEffect, useState } from "react";
import { User } from "./types/Task";
import "./App.css";

function App() {
  const [data, setData] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./data/user.json");
      setData(await response.json());
    };
    fetchData();
  }, []);

  return (
    <>
      <ul>
        <li key={data.id}>
          {data.object}
          {data.username}
        </li>
      </ul>
    </>
  );
}

export default App;
