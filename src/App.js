import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Testata from "./components/Testata";
import DropLang from "./components/DropLang";
import SearchTitleDesc from "./components/SearchTitleDesc";
import Child from "./components/Child";
import RenderBooks from "./components/RenderBooks";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divStyle: {},
      loaderText: "Loading library...",
      books: [],
      filteredBooks: [],
      campoSearch: "",
      listLanguages: [],
      selectedLanguage: "all",
      descrLanguage: "Lingua",
      visible: true,
      selectedBook: 0
    };
  }

  componentDidMount() {
    const userLang = navigator.language || navigator.userLanguage;
    this.setState({
      descrLanguage: userLang === "es" ? "Español" : "English"
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.descrLanguage !== this.state.descrLanguage) {
      const decoder = new TextDecoder("utf-8");
      const url =
        this.state.descrLanguage === "English"
          ? "https://api.myjson.com/bins/zyv02"
          : "https://api.myjson.com/bins/1h3vb3";
      let response = await fetch(url);
      let length = response.headers.get("Content-Length");
      if (!length) {
        // something was wrong with response, just give up
        return await response.arrayBuffer();
      }
      let array = new Uint8Array(length);
      let at = 0; // to index into the array
      let reader = response.body.getReader();
      for (;;) {
        let { done, value } = await reader.read();
        if (done) {
          break;
        }
        array.set(value, at);
        at += value.length;
        let progBar = (at / length).toFixed(2) * 50;
        if (progBar < 50) {
          this.setState({
            divStyle: {
              width: progBar.toString() + "%",
              paddingTop: "5px",
              color: "white",
              textAlign: "center",
              height: "34px"
            }
          });
        } else {
          this.setState({
            divStyle: {
              width: progBar.toString() + "%",
              paddingTop: "5px",
              color: "white",
              textAlign: "center",
              height: "34px"
            },
            loaderText: "Library updated"
          });
        }
      }
      const libri = JSON.parse(decoder.decode(array)).books;
      this.setState({
        books:
          this.state.descrLanguage === "English"
            ? libri
            : libri.map(
                ({ portada, detalle, titulo, descripcion, idioma }) => ({
                  cover: portada,
                  detail: detalle,
                  title: titulo,
                  description: descripcion,
                  language: idioma
                })
              )
      });
      this.setState({
        filteredBooks: this.state.books,
        listLanguages: Array.from(
          new Set(this.state.books.map(book => book.language))
        ),
        campoSearch: ""
      });
    }
  }

  changeDescription = lang => {
    this.setState({
      descrLanguage: lang.includes("inglese") ? "English" : "Español"
    });
  };

  handleChange = (newBooks, campoCerca) => {
    this.setState({
      filteredBooks: newBooks,
      campoSearch: campoCerca
    });
  };

  handleLanguage = filter => {
    this.setState({
      selectedLanguage: filter
    });
  };

  render() {
    return (
      <div>
        <Testata
          descrLanguage={this.state.descrLanguage}
          changeDescription={this.changeDescription}
        />
        <div className="flex-container fisso">
          <DropLang
            handleLanguage={this.handleLanguage}
            listLanguages={this.state.listLanguages}
          />
          <div style={this.state.divStyle} className="barra">
            {this.state.loaderText}
          </div>
          <SearchTitleDesc
            handleChange={this.handleChange}
            books={this.state.books}
            campoSearch={this.state.campoSearch}
          />
        </div>
          <Router>
        <div className="flex-container principale">
      {this.state.filteredBooks.length > 0 ? (
        this.state.filteredBooks.map((book, i) => {
          return this.state.selectedLanguage === book.language ||
            this.state.selectedLanguage === "all" ? (
            <div className="flip-card" key={i}>
              <RenderBooks libro={book} indice={i} />
            </div>
          ) : null;
        })
      ) : (
        <p>ERROR</p>
      )}
    </div>
          
           <Route
            exact
            path="/:id"
            render={props => (
              <Child
                filteredBooks={this.state.filteredBooks}
                selectedLanguage={this.state.selectedLanguage}
                {...props}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}
export default App;
