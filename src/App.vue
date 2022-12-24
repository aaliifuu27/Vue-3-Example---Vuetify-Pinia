<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <SearchField />
        <StarshipList />
        <StarshipDetail :show="id ? true: false" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import SearchField from '@/components/SearchField.vue'
  import StarshipList from '@/components/StarshipList.vue'
  import StarshipDetail from '@/components/StarshipDetail.vue'
  import { storeToRefs } from 'pinia'
  import { useStarshipsStore } from './stores/starships'

  const { id } = storeToRefs(useStarshipsStore())
  const { fetchStarships } = useStarshipsStore()
  fetchStarships();
</script>
