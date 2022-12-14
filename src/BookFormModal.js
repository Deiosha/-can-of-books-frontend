'use Strict';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


class BookFormModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} hide={this.props.hide}>

        <Form>
          <Form.Group className="mb-3" controlId="booktitle">
            <Form.Label>Add Title:</Form.Label>
            <Form.Control type="text" placeholder="Enter Book Title" />
            <Form.Text className="text-muted">
              I can't wait to add your amazing book to our collection!
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookdescription">
            <Form.Label>Book Description</Form.Label>
            <Form.Control type="text" placeholder="Description" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Read, In-process, or not started?</Form.Label>
            <Form.Control type="text" placeholder="Book Status" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          
        </Form>
        <Modal.Footer>
          <Button onClick={this.props.hide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default BookFormModal;