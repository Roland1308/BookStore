import React from 'react'

class Child extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }
    componentDidMount () {
    // const { handle } = this.props.match.params
    // const { url } = this.props.location.state
  
    }

render() {
    return (
    <div>
        <h3>ID:  {this.props.location.state.url}</h3>
      </div>
      )
}

}

export default Child;