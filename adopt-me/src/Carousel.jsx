import { Component } from 'react';

// All Classes must extend from Component
class Carousel extends Component {
  state = {
    active: 0
  }

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg']
  }

  // Handle the click event
  handleIndexClick = (e) => { 
    this.setState({
      active: +e.target.dataset.index // + is a unary operator that converts a string to a number
    })
  }

  // Every Class component has a render function
  render () {
    const { active } = this.state;
    const { images } = this.props; // This is immutable

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt='animal thumbnail'
              />
          ))}
            </div>
        </div>
    )
  }
}

// function CarouselParent ({animal}) {
//   const [breedList] = useBreedList(animal)

//   return <Carousel breedList={breedList} />
// }

export default Carousel