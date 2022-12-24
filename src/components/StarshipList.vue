<template>
  <v-container fluid class="px-0">
    <StarshipItem v-if="starships" v-for="starship in starships" :key="starship?.url" :item="starship" />
  </v-container>
</template>

<script lang="ts">
import functions from '@/globals/functions';
import { useStarshipsStore } from '@/stores/starships';
import { storeToRefs } from 'pinia'

import { defineComponent, onMounted, onUnmounted } from 'vue';
import StarshipItem from './StarshipItem.vue';

export default defineComponent({
  name: "StarshipList",
  mixins: [functions],
  setup() {
    const { starships, id, next, waiting } = storeToRefs(useStarshipsStore());
    const starshipStore = useStarshipsStore();

    function nextFecthStarship(id: string): void {
      starshipStore.nextFecthStarship(id);
    }
    function setNextUrl(price: string) {
      return functions.methods.setNextUrl(price);
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })

    const handleScroll = (e: any) => {
      const url = functions.methods.setNextUrl(next.value)
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow && url) {
        nextFecthStarship(url)
      }
    }

    return {
      waiting,
      starships,
      id,
      setNextUrl
    };
  },
  components: { StarshipItem }
})
</script>
