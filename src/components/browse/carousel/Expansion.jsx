import React from 'react';
import './Expansion.css';

class Expansion extends React.Component {
    state={
      expandedMovie: null,
    }

    handleExpandedMovie = (movie) => {
    //   const {
    //     movies, imageRootPath, activeId, handleExpand,
    //   } = this.props;
    //   const { expandedMovie } = this.state;

    //   if (movie.id === activeId.id && expandedMovie.id !== movie.id) {
    //     this.setState((state) => ({ expandedMovie: movie.id !== state.expandedMovie.id ? movie : state.expandedMovie }));
    //   }
    }

    render() {
      const {
        imageRootPath, activeId, sectionName, title,
      } = this.props;

      if (!activeId || title !== sectionName) {
        return null;
      }
      return (
        <div
          className="expanded-informations"
          style={{
            position: 'relative',
            zIndex: '-1',
            backgroundSize: 'contain',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${
              imageRootPath + activeId.backdrop_path
            })`,
          }}
        >
          <div className="expanded-layer">
            <div className="expanded-top">
              <div className="expanded-left">
                {activeId.title}
              </div>
              <div>
                x
              </div>
            </div>
            <div className="expanded-bottom">
              bottom
            </div>
          </div>

        </div>
      );
    }
}

export default Expansion;
