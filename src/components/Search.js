import React from "react";
import { useState } from "react";

const Search = ({ onSubmitHandler }) => {
  const [term, setTerm] = useState("");

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setTerm(e.target.value);
  };

  const sendData = () => {
    onSubmitHandler(term);
  };

  return (
    <div className="search">
      <div>
      <input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={onChangeHandler}
      />
      <button onClick={() => sendData()}>Search</button>
      </div>
    </div>
  );
};

export default Search;
