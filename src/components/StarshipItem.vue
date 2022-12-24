<template>
  <v-card class="my-4" :title="item?.name" :subtitle="item?.model" :text="item?.manufacturer" @click="setId(item?.url)" />
</template>

<script lang="ts">
import functions from '@/globals/functions';
import { useStarshipsStore } from '@/stores/starships';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StarshipItem',
  mixins: [functions],
  props: {
    item: Object
  },
  setup() {
    const starshipStore = useStarshipsStore();

    function setId(url: string): void {
      const id = functions.methods.setId(url);
      starshipStore.setId(id);
    }

    return {
      setId,
    };
  }
})
</script>
