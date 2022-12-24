
import Starship from '@/types/Starship'
export default interface StarshipsStore {
  starships: Starship[],
  starship: any,
  next: string,
  waiting: boolean,
  error: boolean,
  id: string
}
