'use Strict';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


class BookFormModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      status: ''

    }
  }
  handleTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  handleDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  handleStatus = (e) => {
    this.setState({ status: e.target.value })
  }

  handleSubmit = (e) => {
  e.preventDefault();
  this.props.add(this.state);
  this.props.close();
  }

  render() {
    console.log(this.state);
    return (
      <Modal show={this.props.show} hide={this.props.close}>

      <Modal.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="booktitle">
            <Form.Label>Add Title:</Form.Label>
            <Form.Control 
            type="text"
            name="title" 
            placeholder="Enter Book Title" 
            onChange={this.handleTitle}
            />
            <Form.Text className="text-muted">
              I can't wait to add your amazing book to our collection!
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookdescription">
            <Form.Label>Book Description</Form.Label>
            <Form.Control 
            type="text" 
            name='description'
            placeholder="Description"
            onChange={this.handleDescription} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Read, In-process, or not started?</Form.Label>
            <Form.Control 
            type="text" 
            name='status'
            placeholder="Book Status" 
            onChange={this.handleStatus}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default BookFormModal;