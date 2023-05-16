<script setup lang="ts">
import usePropertySearch from './composables/usePropertySearch'

// Invoke the composable function to get the reactive properties
const {
  getProperties,
  properties,
  name,
  bedrooms,
  bathrooms,
  minPrice,
  maxPrice,
  priceRange,
  storeys,
  garages
} = usePropertySearch()

// You can now use the reactive properties in your component logic
// and template
</script>

<template>
  <div class="search-container">
    <div class="filters">
      <el-input v-model="name" placeholder="Search by Name" class="search-input"></el-input>
      <el-input v-model="bedrooms" placeholder="Bedrooms" class="numeric-input"></el-input>
      <el-input v-model="bathrooms" placeholder="Bathrooms" class="numeric-input"></el-input>
      <el-input v-model="storeys" placeholder="Storeys" class="numeric-input"></el-input>
      <el-input v-model="garages" placeholder="Garages" class="numeric-input"></el-input>
      <el-form-item label="Price Range" class="price-range-item">
        <el-slider @change="getProperties" v-model="priceRange" range :min="minPrice" :max="maxPrice" :step="1000" class="price-slider"></el-slider>
      </el-form-item>
    </div>
    <el-table :data="properties" height="500" class="table">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="price" label="Price" />
      <el-table-column prop="bedrooms" label="Bedrooms" />
      <el-table-column prop="bathrooms" label="Bathrooms" />
      <el-table-column prop="storeys" label="Storeys" />
      <el-table-column prop="garages" label="Garages" />
    </el-table>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.price-range-item {
  margin: 10px;
}

.table {
  width: 100%;
}

.search-input {
  width: 200px;
  margin: 10px;
}

.numeric-input {
  width: 100px;
  margin: 10px;
}

.price-slider {
  width: 300px;
  margin: 10px;
}
</style>
