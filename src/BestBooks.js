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
            <div style={{ height: '500px', width: '100%' }}>
        <Carousel>
          {this.state.books.map(book => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400"
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
      </div>
    )
        
  }


}


export default BestBooks;
