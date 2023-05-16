import { ref, onMounted, watch } from 'vue'
import { type Property } from '@/interfaces/property.interface'

export default function usePropertySearch() {
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const properties = ref<Property[]>([])
  const name = ref<string>('')
  const bedrooms = ref<number>()
  const bathrooms = ref<number>()
  const minPrice = ref<number>(0)
  const maxPrice = ref<number>(0)
  const priceRange = ref<number[]>([0, 0])
  const storeys = ref<number>()
  const garages = ref<number>()

  const setPriceRange = () => {
    if (properties.value.length > 0 && maxPrice.value === 0) {
      const prices = properties.value.map(property => property.price)
      minPrice.value = Math.min(...prices)
      maxPrice.value = Math.max(...prices)
      priceRange.value = [minPrice.value, maxPrice.value]
    }
  }

  const makeUrl = () => {
    let url = `${import.meta.env.VITE_API_URL}/properties`

    const queryParams = []

    if (name.value !== "") {
      queryParams.push(`name=${encodeURIComponent(name.value)}`)
    }

    if (bedrooms.value !== undefined) {
      queryParams.push(`bedrooms=${bedrooms.value}`)
    }

    if (bathrooms.value !== undefined) {
      queryParams.push(`bathrooms=${bathrooms.value}`)
    }

    if (storeys.value !== undefined) {
      queryParams.push(`storeys=${storeys.value}`)
    }

    if (garages.value !== undefined) {
      queryParams.push(`garages=${garages.value}`)
    }

    const [from, to] = priceRange.value
    if (from !== 0 || to !== 0) {
      queryParams.push(`price_from=${from}`)
      queryParams.push(`price_to=${to}`)
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`
    }

    return url
  }

  const getProperties = async () => {
    try {
      loading.value = true
      const url = makeUrl()
      const response = await fetch(url)
      const { data } = await response.json()
      properties.value = data
      setPriceRange()
    } catch (err: any) {
      error.value = err.message || 'Unknown error occurred'
    } finally {
      loading.value = false
    }
  }

  onMounted(getProperties)

  watch([name, bedrooms, bathrooms, storeys, garages, priceRange], () => {
    getProperties()
  })

  return {
    getProperties,
    loading,
    error,
    properties,
    name,
    bedrooms,
    bathrooms,
    minPrice,
    maxPrice,
    priceRange,
    storeys,
    garages
  }
}
