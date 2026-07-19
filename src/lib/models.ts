export type Model3D = {
  id: string;
  file: string;
  thumbnail: string;
};

/** Реєстр 3D-моделей будинків для галереї — файли лежать у public/models. */
export const HOUSE_MODELS: Model3D[] = [
  { id: "house-1", file: "/models/house-1.glb", thumbnail: "/models/thumbs/house-1.jpg" },
  { id: "house-2", file: "/models/house-2.glb", thumbnail: "/models/thumbs/house-2.jpg" },
  { id: "house-3", file: "/models/house-3.glb", thumbnail: "/models/thumbs/house-3.jpg" },
  { id: "house-4", file: "/models/house-4.glb", thumbnail: "/models/thumbs/house-4.jpg" },
  { id: "house-5", file: "/models/house-5.glb", thumbnail: "/models/thumbs/house-5.jpg" },
];
