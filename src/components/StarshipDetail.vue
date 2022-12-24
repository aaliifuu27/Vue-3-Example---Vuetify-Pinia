<template>
  <v-dialog v-model="show" hide-overlay persistent max-width="500">
    <v-card>
      <v-card-title v-if="!waiting && starship">
        <div class="text-h5">{{ starship?.name }}</div>
        <div class="text-subtitle-1 mb-2">{{ starship?.model }}</div>
        <div class="text-subtitle-2 mb-1">{{ starship?.manufacturer }}</div>
        <v-divider />
      </v-card-title>
      <v-card-text v-if="waiting">
        Please stand by
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
      <v-card-text class="px-0 py-0" v-if="!waiting && starship">
        <v-container fluid>
          <div class="text-h6 mb-3">$ {{ formatPrice(starship?.cost_in_credits) }}</div>
          <v-row class="mb-2">
            <v-col cols="12" md="6">
              <div class="text-subtitle-1">Class{{ starship?.starship_class }} Class</div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-subtitle-1">Hyperdrive rating: {{ starship?.hyperdrive_rating }}</div>
            </v-col>
          </v-row>
          <div class="text-subtitle-2 mb-1">Spesifications:</div>
          <v-list lines="one">
            <v-list-item>
              <v-list-item-title>The Maximum number of Megalights</v-list-item-title>
              <v-list-item-subtitle>{{ starship?.MGLT }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>The maximum speed of this starship in the atmosphere</v-list-item-title>
              <v-list-item-subtitle>{{ starship?.max_atmosphering_speed }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Length</v-list-item-title>
              <v-list-item-subtitle>{{ starship?.length }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <div class="text-subtitle-2 mb-1">Capacity:</div>
          <v-list lines="one">
            <v-list-item>
              <v-list-item-title>Consumables</v-list-item-title>
              <v-list-item-subtitle>{{ starship?.consumables }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Cargo Capacity</v-list-item-title>
              <v-list-item-subtitle>{{ starship?.cargo_capacity }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Passengers</v-list-item-title>
              <v-list-item-subtitle>{{ starship?.passengers }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Crews</v-list-item-title>
              <v-list-item-subtitle>{{ starship?.crew }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <div class="text-subtitle-2 mb-1">Pilots:</div>
          <v-list lines="one" :items="starship?.pilots"></v-list>
          <div class="text-subtitle-2 mb-1">Films:</div>
          <v-list lines="one" :items="starship?.films"></v-list>
          <!-- <v-row>
            <v-col cols="4">
              <v-list-subheader>Prefix for dollar currency</v-list-subheader>
            </v-col>

            <v-col cols="8">
              <v-text-field label="Amount" model-value="10.00" prefix="$"></v-text-field>
            </v-col>
          </v-row> -->
          <!-- <v-row>
            <v-col cols="12" md="6">
              <v-text-field :model-value="starship?.max_atmosphering_speed" label="The maximum speed of this starship in the atmosphere" variant="outlined" readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field :model-value="starship?.MGLT" label="The Maximum number of Megalights" variant="outlined" readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field :model-value="starship?.consumables" label="Consumables" variant="outlined" readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field :model-value="starship?.length" label="Length" variant="outlined" readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field :model-value="starship?.cargo_capacity" label="Cargo Capacity" variant="outlined" readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field :model-value="starship?.passengers" label="Passengers" variant="outlined" readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field :model-value="starship?.crew" label="Crew" variant="outlined" readonly></v-text-field>
            </v-col>
            <v-col v-if="starship?.pilots.length > 0" cols="12">
              <v-list :items="starship?.pilots"></v-list>
            </v-col>
            <v-col v-if="starship?.films.length > 0" cols="12">
              <v-list :items="starship?.films"></v-list>
            </v-col>
          </v-row> -->
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import functions from '@/globals/functions';
import { useStarshipsStore } from '@/stores/starships';
import { storeToRefs } from 'pinia'

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StarshipDetail',
  props: {
    show: Boolean
  },
  mixins: [functions],
  setup() {
    const { starship, id, waiting } = storeToRefs(useStarshipsStore())
    const starshipStore = useStarshipsStore();

    function close(): void {
      starshipStore.setId("");
      starshipStore.resetStarship();
    }

    function fetchStarship(id: string): void {
      starshipStore.fetchStarship(id);
    }

    function formatPrice(price: string) {
      return functions.methods.floatingNumber(price)
    }

    return {
      waiting,
      starship,
      id,
      fetchStarship,
      close,
      formatPrice
    };
  },
  watch: {
    id(newValue, oldValue) {
      if (newValue) {
        this.fetchStarship(newValue)
      }
    }
  }
})
</script>
