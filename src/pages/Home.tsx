import React from "react";
import SearchPage from "./SearchPage";
import { useAuth } from "../context/AuthContext";
import Login from "../components/Login";
const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? (
            <>
              <SearchPage />
            </>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-8xl m-8 font-extrabold text-center text-fetch-purple">Find your best friend with your other friend: Fetch.</h1>
          <Login />
        </div>
      )}
    </>
  );
};

export default Home;