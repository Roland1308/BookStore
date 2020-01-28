import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divStyle: {},
      loaderText: "Loading library...",
      books: [],
      filteredBooks: [],
      titleCheck: true,
      descrCheck: true,
      campoSearch: "",
      listLanguages: [],
      selectedLanguage: "all",
      descrLanguage: "Lingua"
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
          console.log(progBar);
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

  changeDescription = e => {
    const lang = e.target.src;
    this.setState({
      descrLanguage: lang.includes("inglese") ? "English" : "Español"
    });
  };

  handleChange = e => {
    this.setState({
      campoSearch: e.target.value.toLowerCase()
    });
    let currentBooks = [];
    let newBooks = [];
    if (this.state.campoSearch !== "") {
      currentBooks = this.state.books;
      newBooks = currentBooks.filter(item => {
        const lcTitle = item.title.toLowerCase();
        const lcDescription = item.description.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return (
          (lcTitle.includes(filter) && this.state.titleCheck) ||
          (lcDescription.includes(filter) && this.state.descrCheck)
        );
      });
    } else {
      newBooks = this.state.books;
    }
    this.setState({
      filteredBooks: newBooks
    });
  };

  handleDescription = () => {
    this.setState({
      descrCheck: !this.state.descrCheck
    });
    let currentBooks = [];
    let newBooks = [];
    if (this.state.campoSearch !== "") {
      currentBooks = this.state.books;
      newBooks = currentBooks.filter(item => {
        const lcTitle = item.title.toLowerCase();
        const lcDescription = item.description.toLowerCase();
        const filter = this.state.campoSearch.toLowerCase();
        return (
          (lcTitle.includes(filter) && this.state.titleCheck) ||
          (lcDescription.includes(filter) && !this.state.descrCheck)
        );
      });
    } else {
      newBooks = this.state.books;
    }
    this.setState({
      filteredBooks: newBooks
    });
  };
  handleTitle = () => {
    this.setState({
      titleCheck: !this.state.titleCheck
    });
    let currentBooks = [];
    let newBooks = [];
    if (this.state.campoSearch !== "") {
      currentBooks = this.state.books;
      newBooks = currentBooks.filter(item => {
        const lcTitle = item.title.toLowerCase();
        const lcDescription = item.description.toLowerCase();
        const filter = this.state.campoSearch.toLowerCase();
        return (
          (lcTitle.includes(filter) && !this.state.titleCheck) ||
          (lcDescription.includes(filter) && this.state.descrCheck)
        );
      });
    } else {
      newBooks = this.state.books;
    }
    this.setState({
      filteredBooks: newBooks
    });
  };
  handleLanguage = e => {
    const filter = e.target.value;
    this.setState({
      selectedLanguage: filter
    });
  };

  render() {
    const stile = {
      width: "205px",
      height: "320px"
    };
    return (
      <div>
        <header className="bandiereContainer">
          <div
            className={
              this.state.descrLanguage === "English"
                ? "bandiera"
                : "bandiera select"
            }
          >
            <img
              src={require('./images/bandieraspagnola.gif')}
              alt="Spanish Flag"
              onClick={this.changeDescription}
            />
          </div>
          <div
            className={
              this.state.descrLanguage === "Español"
                ? "bandiera"
                : "bandiera select"
            }
          >
            <img
              src={require('./images/bandierainglese.gif')}
              alt="English Flag"
              onClick={this.changeDescription}
            />
          </div>
        </header>
        <div className="flex-container fisso">
          <div>
            <select id="selState" onChange={this.handleLanguage}>
              <option value="all" id="all">
                All Languages
              </option>
              {this.state.listLanguages.map((lang, i) => {
                return (
                  <option value={lang} id={lang} key={i}>
                    {lang === "en" ? "English" : null}
                    {lang === "es" ? "Español" : null}
                    {lang === "ca" ? "Catalán" : null}
                  </option>
                );
              })}
            </select>
          </div>
          <div style={this.state.divStyle} className="barra">
            {this.state.loaderText}
          </div>
          <input
            type="text"
            className="input"
            onChange={this.handleChange}
            placeholder="Search..."
            value={this.state.campoSearch}
          />
          <div>
            <input
              type="checkbox"
              name="title"
              id="title"
              value="Title"
              onChange={this.handleTitle}
              defaultChecked
            />
            <label htmlFor="title">Title</label>
            <input
              type="checkbox"
              name="description"
              id="description"
              onChange={this.handleDescription}
              value="Description"
              defaultChecked
            />
            <label htmlFor="description">Description</label>
          </div>
        </div>
        <div className="flex-container principale">
          {this.state.filteredBooks.map((book, i) => {
            return (
              <span key={i}>
                {this.state.selectedLanguage === book.language ||
                this.state.selectedLanguage === "all" ? (
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={book.cover}
                          alt={book.title}
                          style={stile}
                        />
                      </div>
                      <div className="flip-card-back">
                        <h1>{book.title}</h1>
                        <p>{book.description}</p>
                        <a
                          href={book.detail}
                          data-fancybox="gallery"
                          data-options='{"infobar" : false, "buttons": ["close"]}'
                        >
                          <button className="button">Details</button>{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;
