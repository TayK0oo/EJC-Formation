// src/dao/FormateurDAO.ts

import axios from 'axios';
import { Formateur } from '../models/classFormateur';

const API_BASE_URL = 'https://formations.ejcf.fr/wp-json/ejcf/v1/';

export class FormateurDAO {
  async getAllFormateurs(): Promise<Formateur[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/formateurs`);
      return response.data.map(this.mapFormateurData);
    } catch (error) {
      console.error("Erreur lors de la récupération des formateurs :", error);
      return [];
    }
  }

  async getFormateurById(id: string): Promise<Formateur | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/formateurs/${id}`);
      return this.mapFormateurData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du formateur :", error);
      return null;
    }
  }

  async updateFormateur(id: string, formateur: Partial<Formateur>): Promise<Formateur | null> {
    try {
      const response = await axios.put(`${API_BASE_URL}/formateurs/${id}`, formateur);
      return this.mapFormateurData(response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du formateur :", error);
      return null;
    }
  }


  private mapFormateurData(data: any): Formateur {
    return {
      id: data.id.toString(),
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone || '',
      imageUrl: data.imageUrl || '',
      competences: data.competences || [],
      formations: data.formations || []
    };
  }
}
