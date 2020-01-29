import React from "react";
import { Redirect } from "react-router-dom";

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: null,
      showBook: "",
      ritorna: false
    };
  }

  componentDidMount() {    
      this.setState({
        pos: this.props.location.id,
        showBook: this.props.filteredBooks[this.props.location.id].detail
      });
  }

  previous = () => {
    for (let i = this.state.pos - 1; i >= 0; i--) {
      if (
        this.props.filteredBooks[i].language === this.props.selectedLanguage ||
        "all" === this.props.selectedLanguage) {
          this.setState({
            pos: i
            });
        break
      } 
    }
  };

  next = () => {
    for (let i = this.state.pos + 1, len = this.props.filteredBooks.length ; i < len; i++) {
      if (
        this.props.filteredBooks[i].language === this.props.selectedLanguage ||
        "all" === this.props.selectedLanguage) {
          this.setState({
            pos: i
            });
        break
      } 
    }
  };

  close = () => {
    this.setState({
      ritorna: true
    });
  };

  render() {
    if (this.state.ritorna) {
      return <Redirect to="/" />;
    }
    let bookToShow =
      this.state.pos !== null
        ? this.props.filteredBooks[this.state.pos].detail
        : null;
    return (
      <div className="details">
        {this.state.pos > 0 && (
          <div>
            <button className="details-interno" onClick={this.previous}>
              Prev
            </button>
          </div>
        )}
        <div>
          <img src={bookToShow} alt="Details" />
        </div>
        {this.state.pos < this.props.filteredBooks.length - 1 && (
          <div>
            <button className="details-interno" onClick={this.next}>
              Next
            </button>
          </div>
        )}
        <button className="details-close" onClick={this.close}>
          CLOSE
        </button>
      </div>
    );
  }
}
export default Child;
