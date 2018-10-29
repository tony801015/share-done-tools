import React, { useState, useEffect } from "react";
import "./App.css";

//現在稱為function component
export default () => {
  const name = useFormInput("Jared");
  const school = useFormInput("YUNTECH");
  const [count, setCount] = useState(0);

  const width = useWindow();
  useDocumentTitle(`You clicked ${count} times`);

  return (
    <>
      name:
      <input {...name} />
      school:
      <input {...school} />
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        Click me
      </button>
      <p>
        width:
        {width}
      </p>
    </>
  );
};

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  });
}

function useWindow() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWidthResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleWidthResize);
    return () => {
      window.removeEventListener("resize", handleWidthResize);
    };
  });
  return width;
}
