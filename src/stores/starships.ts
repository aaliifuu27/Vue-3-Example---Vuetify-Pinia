import StarshipDataService from '@/services/StarshipDataService'
import ResponseData from '@/types/ResponseData'
import Starship from '@/types/Starship'
import StarshipStore from '@/types/StarshipStore'
import { defineStore } from 'pinia'

export const useStarshipsStore = defineStore({
  id: 'starship',
  state: (): StarshipStore => ({
    starships: [] as Starship[],
    next: "",
    starship: null ,
    waiting: false,
    error: false,
    id: ""
  }),
  actions: {
    async setId(id: string) {
      this.id = id
    },
    async setWaiting(yes: boolean) {
      this.waiting = yes
    },
    async setStarships(items: Starship[]) {
      this.starships = items
    },
    async resetStarship() {
      this.starship = null
    },
    async fetchStarships() {
      this.starships = []
      this.next = ""
      this.setWaiting(true)
      try {
        StarshipDataService.getAll()
          .then((response: ResponseData) => {
            this.error = false;
            this.starships = response?.data?.results;
            this.next = response?.data?.next;
          })
          .catch((e) => {
            this.error = true
            console.log(e)
          });
        } catch (error: any) {
        this.error = true
        console.log(error)
      } finally {
        this.setWaiting(false)
      }

    },
    async findStarships(keyword: string) {
      this.starships = []
      this.next = ""
      this.setWaiting(true)
      try {
        StarshipDataService.search(keyword)
        .then((response: ResponseData) => {
          this.error = false;
            this.starships = response?.data?.results;
            this.next = response?.data?.next;
          })
          .catch((e) => {
            this.error = true
            console.log(e)
          });
      } catch (error: any) {
        this.error = true
        console.log(error)
      } finally {
        this.setWaiting(false)
      }

    },
    async nextFecthStarship(paramUrl: string) {
      console.log(paramUrl)
      this.next = ""
      this.setWaiting(true)
      try {
        StarshipDataService.get(paramUrl)
          .then((response: ResponseData) => {
            console.log(response.data)
            this.error = false;
            this.next = response?.data?.next;
            const newStarships = response?.data?.results;
            const oldStarships = this.starships;
            oldStarships.push(...newStarships)
            this.setStarships(oldStarships);
          })
          .catch((e) => {
            this.error = true
            console.log(e)
          });
      } catch (error: any) {
        this.error = true
        console.log(error)
      } finally {
        this.setWaiting(false)
      }

    },
    async fetchStarship(id: string) {
      this.starship = null
      this.setWaiting(true)
      try {
        StarshipDataService.get(id)
          .then((response: ResponseData) => {
            this.error = false
            this.starship = response?.data;
          })
          .catch((e) => {
            this.error = true
            console.log(e)
          });
      } catch (error: any) {
        this.error = true
        console.log(error)
      } finally {
        this.setWaiting(false)
      }
    }
  }
})
