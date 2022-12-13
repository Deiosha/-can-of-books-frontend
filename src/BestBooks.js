import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: ""
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

  render(){
    return (
      
      <div id="books">
        <input onChange={this.handleChange} type="text"/>
        <button onClick={() => this.fetchBooks(this.state.search)}>Search For Books</button>
        {this.state.books.length > 0 ?
        
        this.state.books.map(book => {
          return (
            <div>
            <Carousel>
            <Carousel.Item>
            <Carousel.Caption>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>{book.status}</p>
            </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
            
            </div>
          )
        }) : <p>No Books Found</p>
        }
      </div>
    )
  }

 
}

export default BestBooks;
