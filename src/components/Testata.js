import React from "react";

function Testata(props) {
  const changeDescription = e => {
    props.changeDescription(e.target.src);
  };

  return (
    <header className="bandiereContainer">
      <div
        className={
          props.descrLanguage === "English" ? "bandiera" : "bandiera select"
        }
      >
        <img
          src={require("../images/bandieraspagnola.gif")}
          alt="Spanish Flag"
          onClick={changeDescription}
        />
      </div>
      <div
        className={
          props.descrLanguage === "Español" ? "bandiera" : "bandiera select"
        }
      >
        <img
          src={require("../images/bandierainglese.gif")}
          alt="English Flag"
          onClick={changeDescription}
        />
      </div>
    </header>
  );
}

export default Testata;
