/** The main object we work with. A user of the dating app. */
export interface User {
  id: string; // Example: "55be3c8fc964860700ebf515"
  info: UserInfo;

  // If the user forms a part of a couple this will be populated with the other User's ID
  associated?: {
    age: number; // 42
    gender: string; // female
    sexuality: string; // straight
    name: string; // Fanciulla72
  };
  photos: UserPhoto[];
}

export interface UserInfo {
  age: number; // 20
  type: string; // "single"
  gender: string; // "male"
  sexuality: string; // "straight"
  name: string; // John
  about?: string; // A short text about the user. Example: "Tell us about you"
  desires?: string[];
  interests?: string[];
}

export interface UserPhoto {
  url: string; // https://res.cloudinary.com/threender/image/upload/v1419599199/58b1bf00032da7441b24c99c903d8026.jpg
  width: number; // 960
  height: number; // 1285
}
