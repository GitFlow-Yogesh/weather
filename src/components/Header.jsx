import { useState } from "react";

export default function Header({ onSearch, onUseLocation }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  }

  return (
    <header className="header">
      <form onSubmit={handleSubmit} className="search">
        <input
          aria-label="Search city"
          type="text"
          placeholder="Search city..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button className="loc-btn" onClick={onUseLocation} title="Use my location">
        📍
      </button>
    </header>
  );
}
