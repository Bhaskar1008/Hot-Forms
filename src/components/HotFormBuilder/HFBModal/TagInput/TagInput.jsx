import TagInput from "antd-tag-input";
import "antd-tag-input/dist/style.css";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState([]);

  return (
    <div className="App">
      <TagInput value={value} onChange={(value) => setValue(value)} />
    </div>
  );
}