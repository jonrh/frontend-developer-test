import { User } from "./Types";

/**
 * Example users for speed of development, mock testing, and disaster backup if the FeeldAPI were
 * to become unavailable during the coding challenge.
 */
const users: User[] = [
  {
    id: "55be3c8fc964860700ebf562",
    info: {
      age: 86,
      type: "single",
      gender: "female",
      sexuality: "straight",
      name: "Notorious RBG",
      about: "You can't spell Truth without Ruth",
      desires: ["Justice"],
      interests: ["Equality"],
    },
    associated: null,
    photos: [
      {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/7/76/Ruth_Bader_Ginsburg_2016_portrait.jpg",
        width: 1405,
        height: 1757,
      },
    ],
  },
  {
    id: "55be3c90c964860700ebf5f5",
    info: {
      age: 48,
      type: "single",
      gender: "male",
      sexuality: "gay",
      name: "Harvey Milk",
      about: "Hope will never be silent",
      desires: ["Companionship"],
      interests: ["Politics", "LGBT"],
    },
    associated: null,
    photos: [
      {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/e/e1/Harvey_Milk_at_Gay_Pride_San_Jose%2C_June_1978_%28cropped%29.jpg",
        width: 1295,
        height: 1619,
      },
    ],
  },
  {
    id: "55be3c8fc964860700ebf57f",
    info: {
      age: 41,
      type: "single",
      gender: "male",
      sexuality: "gay",
      name: "Alan Turing",
      about: "Machines take me by surprise with great frequency",
      desires: ["Fun"],
      interests: ["WinningWars", "Computers", "Math"],
    },
    associated: null,
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Alan-Turing.jpg",
        width: 540,
        height: 800,
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg",
        width: 1425,
        height: 1757,
      },
    ],
  },
  {
    id: "55be3c8fc964860700ebf500",
    info: {
      age: 85,
      type: "couple",
      gender: "female",
      sexuality: "lesbian",
      name: "Audre Lorde",
      about: "Lesbian, mother, warrior, poet.",
      desires: ["Civil rights"],
      interests: ["Poems", "Feminism"],
    },
    associated: {
      age: 85,
      gender: "female",
      sexuality: "lesbian",
      name: "Gloria I. Joseph",
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Audre_Lorde.jpg",
        width: 993,
        height: 1489,
      },
      {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/e/e6/Audre_Lorde%2C_Meridel_Lesueur%2C_Adrienne_Rich_1980.jpg",
        width: 1280,
        height: 960,
      },
    ],
  },
];

export default users;
