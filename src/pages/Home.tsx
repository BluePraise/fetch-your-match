import React from "react";
import SearchPage from "./SearchPage";
import { useAuth } from "../context/AuthContext";
import Login from "../components/Login";
const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-8xl m-8 text-center">Find your best friend with your other friend: Fetch.</h1>
      {user ? (
            <>
              <SearchPage />
            </>
      ) : (
        <div className="flex justify-center">
          <Login />
        </div>
      )}
    </>
  );
};

export default Home;