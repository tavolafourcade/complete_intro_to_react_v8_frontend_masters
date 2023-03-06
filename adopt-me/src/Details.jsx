import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Carousel from './Carousel'
import fetchPet from './fetchPet'
import ErrorBoundary from './ErrorBoundary'
import { Link} from 'react-router-dom'

const Details = () => {
  const { id } = useParams()
  const results = useQuery(['details', id], fetchPet)

  if (results.isLoading) {
    return (
      <div className='loading-pane'>
        <h2 className='loader'>Loading...</h2>
      </div>
    )
  }

  const pet = results.data.pets[0]

  return (
    <div className='details'>
      <Carousel images={pet.images} />
      <div className='details-content'>
        <h1>{pet.name}</h1>
        <h2>{pet.animal} - {pet.breed} - {pet.city}, {pet.state}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  )
}

// If Details receive props we can use ...props
function DetailsErrorBoundary() {
  return (
    <ErrorBoundary errorComponent={
      <h2>
        There was an error with this listing
        <Link to='/'>Click here to go back to the home page</Link>
      </h2>
    }>
      <Details />
    </ErrorBoundary>
  )
}
export default DetailsErrorBoundary