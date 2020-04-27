import React from 'react';
import './SearchResults.css';
import Item from './carousel/Item';
import Expansion from './carousel/Expansion';

class SearchResults extends React.Component {
  state = {
    newLine: true,
  };

  render() {
    const {
      result,
      genres,
      handleItemExpand,
      activeKey,
      activeId,
      currentPage,
    } = this.props;

    const containerClass = `results-container ${
      activeId ? 'block-container-results' : 'hover-container-results'
    }`;
    const itemClass = `item-result ${
      activeId ? 'block-item-results' : 'hover-item-results'
    }`;
    return (
      <div className="search">
        <div className={containerClass}>
          {result.map((movie) => (
            <div className={itemClass}>
              <Item
                movie={movie}
                genres={genres}
                handleItemExpand={handleItemExpand}
                activeKey={activeKey}
                activeId={activeId}
                currentPage={currentPage}
                title="search"
                image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                key={movie.id}
              />
              {activeId && activeKey === `${movie.id}search` && (
              <Expansion
                activeId={activeId}
                image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                movie={movie}
                genres={genres}
                handleItemExpand={handleItemExpand}
                activeKey={activeKey}
                title="search"
              />
              )}
            </div>
          ))}
        </div>
      </div>

    );
  }
}

export default SearchResults;
