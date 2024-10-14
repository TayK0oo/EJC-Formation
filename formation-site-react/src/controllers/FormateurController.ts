// src/controllers/FormateurController.ts

import { FormateurManager } from '../models/FormateurManager';
import { Formateur } from '../models/classFormateur';

export class FormateurController {
  private manager: FormateurManager;

  constructor() {
    this.manager = new FormateurManager();
  }

  async getFormateurs(): Promise<Formateur[]> {
    console.log(this.manager.getAllFormateurs());
    return this.manager.getAllFormateurs();
  }

  async getFormateurById(id: string): Promise<Formateur | null> {
    return this.manager.getFormateurById(id);
  }
}
