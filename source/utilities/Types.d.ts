// Our own TypeScript types used for this project

/** The main object we work with. A user of the dating app. */
export interface User {
  id: UserID;
  info: UserInfo;

  // If the user forms a part of a couple this will be populated with the other User's ID
  associated?: {
    age: number; // 42
    gender: Gender;
    sexuality: Sexuality;
    name: string; // Fanciulla72
  };
  photos?: UserPhoto[];
}

export interface UserInfo {
  age: number; // 20
  type: "single" | "couple";
  gender: Gender;
  sexuality: Sexuality;
  name: string; // John
  about?: string; // A short text about the user. Example: "Tell us about you"
  desires?: string[];
  interests?: string[];
}

export interface UserPhoto {
  url: string; // https://example.com/img.jpg
  width: number; // 960
  height: number; // 1285
}

export interface UserDecision {
  // reject: not interested in chatting with given user
  // skip: not interested at the moment, maybe at a later date
  // approve: interested in chatting with given user
  decision: "reject" | "skip" | "approve";
  user: User;
}

/** User identifier, example: "55be3c8fc964860700ebf515" */
type UserID = string;

/** "male" or "female" in data set of 100 users. Intentionally declared as any type of string. */
type Gender = string;

/**
 * "straight", "gay", "bisexual", "pansexual", "polysexual" in data set of 100 users.
 * For now intentionally declared as string instead of union type.
 */
type Sexuality = string;
