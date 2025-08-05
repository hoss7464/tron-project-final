import React from "react";
import { LoaderContainer } from "./LoaderElements";
import { useLoading } from "../../contexts/LoaderContext";
import "./Loader.css"


const Loader: React.FC = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null;

  return (
    <LoaderContainer>
      <div className="grid-loader">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="grid-cell" />
        ))}
      </div>
    </LoaderContainer>
  );
};

export default Loader;