import axios from "axios";

export class FavoriteToysService {
    static async getFavoriteToys(){
        return await axios.get<string[]>('/favoriteToys.json')
    }
}