import React from "react";

function DropLang(props) {
  const handleLanguage = e => {
    props.handleLanguage(e.target.value);
  };

  return (
    <select id="selState" onChange={handleLanguage}>
      <option value="all" id="all">
        All Languages
      </option>
      {props.listLanguages.map((lang, i) => {
        return (
          <option value={lang} id={lang} key={i}>
            {lang === "en" ? "English" : null}
            {lang === "es" ? "Español" : null}
            {lang === "ca" ? "Catalán" : null}
          </option>
        );
      })}
    </select>
  );
}
export default DropLang;
