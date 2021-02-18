import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

const Search = ({ onSubmitHandler, placeholder, query }) => {
  const history = useHistory();
  const location = useLocation();
  const parsed = queryString.parse(location.search.toString());
  const [term, setTerm] = useState(parsed.query);
  
  const onChangeHandler = (e) => {
    setTerm(e.target.value);
  };

  const sendData = () => {
    if (!term) return;
    onSubmitHandler(term);
    history.push({
      pathname: `${window.location.pathname}`,
      search: `&query=${term.replace(" ", "-")}`,
    });
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
          value={term && term.replace("-", " ")}
          onChange={onChangeHandler}
          onKeyUp={onEnterSearchHandler}
        />
        <button onClick={() => sendData()}>Search</button>
      </div>
    </div>
  );
};

export default Search;
