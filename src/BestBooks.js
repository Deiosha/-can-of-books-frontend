import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import { Button } from 'react-bootstrap';
import UpdateBook from './UpdateBooks';
import { withAuth0 } from '@auth0/auth0-react';



class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
      showForm: false
    }
  }

  componentDidMount = () => {
    this.fetchBooks();
  }

  fetchBooks = async (bookTitle) => {
    let request = {}
    // if (this.props.auth0.isAuthenticated) {
      let res = await this.props.auth0.getIdTokenClaims().then(res => {

        console.log(res);
        let token = res._raw;
        console.log(token);

        request = {

          method: 'GET',
          url: 'http://localhost:3002/books',

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      })
    // }
    console.log(request)
    if (bookTitle) {
      request.url += `?name=${bookTitle}`
    }
    console.log(request);
    let response = await axios(request);
    this.setState({
      books: response.data,
    });
  }

  deleteBook = async id => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`
      await axios.delete(url)
      let deletedBooks = this.state.books.filter(book => book._id !== id)
      this.setState({
        books: deletedBooks
      })
    } catch (err) {
      console.log('An error has occured ', err)
    }
  }

  updateRequest = async (book) => {
    console.log(book);
    let response = await axios.put(process.env.REACT_APP_SERVER_URL + `/books/${book._id}`, {
      title: book.title,
      description: book.description,
      status: book.status
    });
    let updatedBook = response.data;
    console.log(this.state.books, updatedBook);
    this.fetchBooks();
  }



  handleChange = (e) => {
    console.log('change', e.target.value)
    this.setState({ search: e.target.value });
  }

  openForm = (e) => {
    this.setState({ showForm: true });
  }

  closeForm = (e) => {
    this.setState({ showForm: false });
  }

  handelAddModal = async (book) => {
    console.log(book);
    const addResult = await axios.post(process.env.REACT_APP_SERVER_URL + "/books", {
      title: book.title,
      description: book.description,
      status: book.status
    })
    this.setState({ books: [...this.state.books, addResult.data] })
  }

  handleAddBook = () => { }


  request = async () => {
    let res = await this.props.auth0.getIdTokenClaims();
    let token = res._raw;
    console.log(token);

    let request = {
      method: 'GET',
      url: 'http://localhost3001/test',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    let response = await axios(request);
    console.log(response.data);
  }
  render() {
    let auth0 = this.props.auth0;
    console.log(auth0);



    return (
      <div style={{ height: '500px', width: '100%' }}>
        <Carousel>
          {this.state.books.map(book => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/350x65"
                  alt={book.title}
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                  <button onClick={() => this.setState({ selectedBook: book })}>Update Book</button>

                  <Button
                    variant="danger"
                    onClick={() => this.deleteBook(book._id)}
                  >
                    Delete Book!
                  </Button>

                  {this.state.selectedBook
                    ? <UpdateBook
                      closeModal={() => this.setState({ selectedBook: null })}
                      book={this.state.selectedBook}
                      handleUpdate={this.updateRequest}
                    />
                    : null
                  }

                </Carousel.Caption>
              </Carousel.Item>

            )
          })}
        </Carousel>
        <Button onClick={() => this.setState({ showForm: true })}>Add book</Button>
        {this.state.showForm && (

          <BookFormModal show={this.openForm}
            close={this.closeForm} add={this.handelAddModal}

          />





        )

        }
      </div>
    )

  }


}


export default withAuth0(BestBooks);
