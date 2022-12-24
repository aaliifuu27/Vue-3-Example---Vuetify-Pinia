import http from "@/http-common";

/* eslint-disable */
class StarshipDataService {
  getAll(): Promise<any> {
    return http.get("/starships");
  }

  get(id: any): Promise<any> {
    return http.get(`/starships/${id}`);
  }

  search(keyword: string): Promise<any> {
    return http.get(`/starships?search=${keyword}`);
  }
}

export default new StarshipDataService();
