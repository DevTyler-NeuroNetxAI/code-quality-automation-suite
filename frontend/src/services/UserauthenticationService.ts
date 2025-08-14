import axios from 'axios';
import { API_BASE_URL } from '../../../shared/constants';

export class UserauthenticationService {
  private baseUrl = `${API_BASE_URL}/user authentication`;

  async getAll() {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  async getById(id: string) {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: any) {
    const response = await axios.post(this.baseUrl, data);
    return response.data;
  }

  async update(id: string, data: any) {
    const response = await axios.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }
}

export default new UserauthenticationService();
