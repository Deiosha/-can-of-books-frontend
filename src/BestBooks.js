import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import { Button } from 'react-bootstrap';



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
    let request = {
      method: 'GET',
      url: 'http://localhost:3002/books'
    }
    if (bookTitle) {
      request.url += `?name=${bookTitle}`
    }
    console.log(request);
    let response = await axios(request);
    this.setState({
      books: response.data,
    });
  }

 
  

  handleChange = (e) => {
    console.log('change', e.target.value)
    this.setState({ search: e.target.value });
  }

  openForm = (e) => {
    this.setState({showForm: true});
  }

  closeForm = (e) => {
    this.setState({showForm: false});
  }



  render(){
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
                </Carousel.Caption>
              </Carousel.Item>
              
            )
          })}
        </Carousel>
        <Button onClick={() => this.setState({showForm: true})}>Add book</Button>
        {this.state.showForm && (

        <BookFormModal show={this.openForm}
          hide={this.closeForm}
          
        /> 

        )
        
        }
      </div>
    )
        
  }


}


export default BestBooks;
