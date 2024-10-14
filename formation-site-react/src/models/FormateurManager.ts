// src/managers/FormateurManager.ts

import { FormateurDAO } from '../dao/FormateurDAO';
import { Formateur } from '../models/classFormateur';

export class FormateurManager {
  private dao: FormateurDAO;

  constructor() {
    this.dao = new FormateurDAO();
  }

  async getAllFormateurs(): Promise<Formateur[]> {
    return this.dao.getAllFormateurs();
  }

  async getFormateurById(id: string): Promise<Formateur | null> {
    return this.dao.getFormateurById(id);
  }

}
