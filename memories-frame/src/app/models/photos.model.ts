export interface Photo {
  id: string;
  filename: string;

  url: string;
  file: File;

  takenAt?: Date;

  latitude?: number;
  longitude?: number;

  location?: string;

}