import { useState, useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import AdoptedPetContext from "./AdoptedPetContext"
import Results from './Results'
import useBreedList from "./useBreedList"
import fetchSearch from "./fetchSearch"

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [ requestParams, setRequestParams ] = useState({
    location: '',
    animal: '',
    breed: ''
  })
  // const [ location, setLocation ] = useState('')
  const [ animal, setAnimal ] = useState('')
  // const [ breed, setBreed ] = useState('')
  // const [ pets, setPets ] = useState([])
  const [ breeds ] = useBreedList(animal)
  const [adoptedPet] = useContext(AdoptedPetContext)

  const results = useQuery(['search', requestParams], fetchSearch)
  const pets = results?.data?.pets ?? []

  // useEffect(() => {
  //   requestPets()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const requestPets = async() => {
  //   const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
  //   const json = await res.json()
  //   // setPets(json.pets)
  // }

  return (
    <div className="search-params">
      <form onSubmit={e => {
        e.preventDefault()

        const formData = new FormData(e.target) // Browser API it will pull out all the data from the form into an object.
        const obj = {
          animal: formData.get('animal') ?? '',
          breed: formData.get('breed') ?? '',
          location: formData.get('location') ?? ''
        }
        setRequestParams(obj)
      }}>
        {
          adoptedPet ? (
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
            </div>
          ) : null
        }
        <label htmlFor="location">
          Location
          <input 
          name='location'
          id="location" 
          placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animals from the office
          <select id="animal" value={animal} onChange={e => setAnimal(e.target.value)}>
            <option />
            {
            ANIMALS.map(animal => <option key={animal}>{animal}</option>)
            }
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" name='breed' disabled={breeds.length === 0}>
            <option />
            {
            breeds.map(breed => <option key={breed}>{breed}</option>)
            }
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  )
}

export default SearchParams