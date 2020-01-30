import React from "react";
import { Redirect } from "react-router-dom";

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: this.props.location.id,
      showBook: "",
      ritorna: false,
      visualPrev: true,
      visualNext: true
    };
  }

  componentDidMount() {    
      this.setState({
        pos: this.props.location.id,
        showBook: this.props.filteredBooks[this.props.location.id].detail,
        len: this.props.filteredBooks.length
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pos !== this.state.pos) {
      if (this.state.pos !== 0) {
        this.setState({
          visualPrev:  (this.props.filteredBooks[this.state.pos - 1].language !== this.props.selectedLanguage) && this.props.selectedLanguage !== "all" ? false : true
        })
      } else {
        this.setState({
          visualPrev: false
        })
      };
      if (this.state.pos !== this.state.len -1) {
        this.setState({
          visualNext:  (this.props.filteredBooks[this.state.pos + 1].language !== this.props.selectedLanguage) && this.props.selectedLanguage !== "all" ? false : true
        })
      } else {
        this.setState({
          visualNext: false
        })
      }
    }
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
    for (let i = this.state.pos + 1; i < this.state.len; i++) {
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
    document.body.classList.add("stop-scrolling");
    if (this.state.ritorna) {
      document.body.classList.remove("stop-scrolling");
      return <Redirect to="/" />;
    }
    let bookToShow =
      this.state.pos !== null
        ? this.props.filteredBooks[this.state.pos].detail
        : null;
    let scrollPos = {
      top: window.pageYOffset.toString()+"px"
    };
    return (
      <div className="details" style={ scrollPos }>
        {this.state.visualPrev && (
          <div>
            <button className="details-interno" onClick={this.previous}>
              Prev
            </button>
          </div>
        )}
        <div>
          <img src={bookToShow} alt="Details" />
        </div>
        {this.state.visualNext && (
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
