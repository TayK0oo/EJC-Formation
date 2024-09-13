// src/utils/imageImporter.ts
/// <reference types="webpack" />
// Cette fonction importe toutes les images d'un répertoire spécifié
export function importAll(r: any) {
  let images: { [key: string]: string } = {};
  r.keys().forEach((item: string) => { 
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
  
  // Cette fonction importe une seule image de manière asynchrone
  export async function importImage(imageName: string, imageFolder : string): Promise<string> {
    try {
      const image = await import(`../ressources/images/${imageFolder}/${imageName}`);
      return image.default;
    } catch (error) {
      console.error(`Erreur lors du chargement de l'image ${imageName}:`, error);
      return ''; // ou retournez une image par défaut
    }
  }
  
  // Cette fonction vérifie si une image existe
  export function imageExists(imageName: string, imageFolder : string): boolean {
    try {
      require(`../ressources/images/${imageFolder}/${imageName}`);
      return true;
    } catch (err) {
      return false;
    }
  }