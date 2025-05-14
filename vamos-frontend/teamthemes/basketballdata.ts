export interface BasketballTeam {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
}

export const basketballTeams: BasketballTeam[] = [
  {
    id: "nba",
    name: "NBA",
    shortName: "NBA",
    logo: "/washington-wizards-3.svg",
    primaryColor: "#FDB927",
    secondaryColor: "#552583",
    accentColor: "#0E2240",
    textColor: "#FFFFFF",
  },
  {
    id: "lakers",
    name: "Los Angeles Lakers",
    shortName: "Lakers",
    logo: "/los-angeles-lakers-1.svg",
    primaryColor: "#552583",
    secondaryColor: "#FDB927",
    accentColor: "#000000",
    textColor: "#FFFFFF",
  },
  {
    id: "chicago-bulls",
    name: "Chicago Bulls",
    shortName: "Bulls",
    logo: "/chicago-bulls-logo.svg",
    primaryColor: "#CE1141",
    secondaryColor: "#000000",
    accentColor: "#FFFFFF",
    textColor: "#FFFFFF",
  },
];

export const getBasketballTeamById = (id: string): BasketballTeam | undefined => {
  return basketballTeams.find((team) => team.id === id);
};

export default basketballTeams;