import React from "react";
import { useState } from "react";

const Search = ({ onSubmitHandler, placeholder }) => {
  const [term, setTerm] = useState("");

  const onChangeHandler = (e) => {
    setTerm(e.target.value);
  };

  const sendData = () => {
    onSubmitHandler(term);
  };

  const onEnterSearchHandler = (e) => {
    if (e.key === "Enter") {
      sendData();
    }
  };

  return (
    <div className="search">
      <div>
        <input
          type="text"
          placeholder={placeholder}
          value={term}
          onChange={onChangeHandler}
          onKeyUp={onEnterSearchHandler}
        />
        <button onClick={() => sendData()}>Search</button>
      </div>
    </div>
  );
};

export default Search;
