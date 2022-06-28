import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [repoData, setRepoData] = useState(null);
  const [formData, setFormData] = useState({
    userName: null,
    includeForks: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.github.com/users/${formData.userName}/repos${
          formData?.includeForks ? "?type=owner" : ""
        }`
      );
      console.log("response", response);

      const data = response?.data;
      console.log("data", data);
      setErrorMessage("");

      setRepoData(data);
    } catch (error) {
      setErrorMessage("Invalid user name");
      setRepoData(null);
    }
  };

  console.log("repoData", repoData);
  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input
          id="username"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
        />
        <label htmlFor="fork">Include forks: </label>
        <input
          id="fork"
          type="checkbox"
          onClick={() =>
            setFormData({ ...formData, includeForks: !formData.includeForks })
          }
        />
        <button
          disabled={formData.userName === null || ""}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>
        {repoData?.map((repo, i) => (
          <React.Fragment key={i}>
            <div>
              <div className="col">{repo?.name || "NA"}</div>
              <div className="col">{repo?.language || "NA"}</div>
              <div className="col">{repo?.description || "NA"}</div>
              <div className="col">{repo?.size || "NA"}</div>
            </div>
          </React.Fragment>
        ))}
      </section>
      <div className="error">{errorMessage}</div>
    </div>
  );
}

export default App;
