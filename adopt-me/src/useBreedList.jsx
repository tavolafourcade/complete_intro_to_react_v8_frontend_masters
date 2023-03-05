// import {useState, useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import fetchBreedList from './fetchBreedList'

// const localCache = {}

export default function useBreedList(animal) {

  // This is a simpler way to implement instead of using useEffect lines below
  const results = useQuery(['breeds', animal], fetchBreedList)

  return [results?.data?.breeds ?? [], results.status] // If this available then give me that
  // The ?? means that if the left side is null or undefined then give me the right side

// const [ breedList, setBreedList ] = useState([])
// const [ status, setStatus ] = useState('unloaded')

// useEffect(() => {
//   if (!animal) {
//     setBreedList([])
//   } else if (localCache[animal]) {
//     setBreedList(localCache[animal])
//   } else {
//     requestBreedList()
//   }

//   async function requestBreedList() {
//     setBreedList([])
//     setStatus('loading')

//     const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`)
//     const json = await res.json()

//     localCache[animal] = json.breeds || []
//     setBreedList(localCache[animal])
//     setStatus('loaded')
//   }
// },[animal])

// return [breedList, status]
}