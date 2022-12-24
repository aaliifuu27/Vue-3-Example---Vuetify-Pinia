<template>
  <v-card color="grey-lighten-3">
    <v-card-text>
      <v-text-field :loading="waiting" v-model="keyword" density="compact" variant="solo" label="Search Starship"
        append-inner-icon="mdi-magnify" single-line hide-details @click:append-inner="search(keyword)" @keydown.enter.prevent="search(keyword)" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { useStarshipsStore } from '@/stores/starships';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchField',

  setup() {
    const keyword = ref();
    const starshipStore = useStarshipsStore();
    const waiting = starshipStore.waiting;

    function search(keyword: string): void {
      starshipStore.findStarships(keyword || "");
    }

    return {
      keyword,
      waiting,
      search
    };
  }
})
</script>
