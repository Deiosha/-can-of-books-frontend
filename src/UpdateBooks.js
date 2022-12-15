import React from 'react';

class UpdateBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.book._id,
      title: props.book.title,
      description: props.book.description,
      status: props.book.status,
      
    }
  }

  handleTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  }
  handleStatus = (e) => {
    this.setState({ status: e.target.value });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdate(this.state);
    this.props.closeModal();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="title" onChange={this.handleTitle} value={this.state.title} />

        <input name="description" onChange={this.handleDescription} value={this.state.description} />

        <input name="status" onChange={this.handleStatus} value={this.state.status} />

        <button type="submit">Update the books!</button>
      </form>
    )
  }
}

export default UpdateBooks;