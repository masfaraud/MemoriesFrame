export interface Photo {
  id: string;

  path: string;

  filename: string;

  takenAt: Date;

  latitude?: number;

  longitude?: number;

  location?: string;

  thumbnail?: string;
}