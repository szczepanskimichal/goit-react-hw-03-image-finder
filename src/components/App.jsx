import './App.css';
import { SearchBar } from './SearchBar';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchPhotos, LIMIT } from '../utlils/pixabayAPI/pixabayApi';
import { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      searchQuery: '',
      currentPage: 0,
      isLoading: false,
      error: null,
      totalPages: 0,
    };
  }

  getQuery = event => {
    event.preventDefault();
    const searchKeyWord = event.target.elements.search.value;
    if (searchKeyWord !== this.state.searchQuery) {
      this.setState({
        searchQuery: searchKeyWord,
        currentPage: 1,
        images: [],
      });
    }
  };

  incrementPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;

    if (
      searchQuery !== prevState.searchQuery ||
      currentPage !== prevState.currentPage
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { searchQuery, currentPage, totalPages } = this.state;

    try {
      this.setState({ isLoading: true });
      const response = await fetchPhotos(searchQuery, currentPage);
      const newImages = response.hits;
      const totalPagesOfImages = Math.ceil(response.totalHits / LIMIT);

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        isLoading: false,
        totalPages: totalPagesOfImages,
      }));
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  };

  render() {
    const { isLoading, images, currentPage, totalPages } = this.state;
    return (
      <div className="App">
        <SearchBar getQuery={this.getQuery} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}

        {images.length !== 0 && currentPage !== totalPages && (
          <Button incrementPage={this.incrementPage} />
        )}
      </div>
    );
  }
}

export default App;
