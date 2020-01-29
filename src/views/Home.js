import React from "react";
import RenderBooks from "../components/RenderBooks";

function Home(props) {
  const { filteredBooks, selectedLanguage } = props;

  return (
    <div className="flex-container principale">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book, i) => {
          return selectedLanguage === book.language ||
            selectedLanguage === "all" ? (
            <div className="flip-card" key={i}>
              <RenderBooks libro={book} indice={i} />
            </div>
          ) : null;
        })
      ) : (
        <p>ERROR</p>
      )}
    </div>
  );
}

export default Home;
