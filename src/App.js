import React from "react";
import useProxy from "./hooks/useProxy";

import "./styles.css";

export default function App() {
  const proxy = useProxy({ count: 0, words: [], currentWord: "" });

  React.useEffect(() => {
    console.log("rerendered");
  });

  const increment = () => {
    proxy.count++;
  };

  const reset = () => {
    proxy.count = 0;
  };

  const overrideFirstWord = () => {
    proxy.words[0].word = "HAHA";
  };

  const addWord = (event) => {
    event.preventDefault();
    proxy.words.push({ word: proxy.currentWord });
    proxy.currentWord = "";
  };

  return (
    <div className="App">
      <h1>Proxy State</h1>
      <h2>{proxy.count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>reset</button>
      <br />
      <br />
      <form onSubmit={addWord}>
        <input
          placeholder="Type your word here..."
          value={proxy.currentWord}
          onChange={({ currentTarget }) => {
            proxy.currentWord = currentTarget.value;
          }}
        />
        <button type="submit">Add word</button>
      </form>
      <button disabled={!proxy.words.length} onClick={overrideFirstWord}>
        Override first word
      </button>
      <ul>
        {proxy.words.map(({ word }, i) => (
          <li key={i + word}>{word}</li>
        ))}
      </ul>
    </div>
  );
}
//
