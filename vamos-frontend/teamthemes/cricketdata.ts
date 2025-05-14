export interface CricketTeam {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
}

export const cricketTeams: CricketTeam[] = [
  {
    id: "india",
    name: "India",
    shortName: "IND",
    logo: "/india-logo.svg",
    primaryColor: "#1C2C5B",
    secondaryColor: "#FF9933",
    accentColor: "#138808",
    textColor: "#FFFFFF",
  },
  {
    id: "australia",
    name: "Australia",
    shortName: "AUS",
    logo: "/australia-logo.svg",
    primaryColor: "#FFCD00",
    secondaryColor: "#007A33",
    accentColor: "#000000",
    textColor: "#000000",
  },
  {
    id: "england",
    name: "England",
    shortName: "ENG",
    logo: "/england-logo.svg",
    primaryColor: "#00247D",
    secondaryColor: "#FFFFFF",
    accentColor: "#CF142B",
    textColor: "#FFFFFF",
  },
];

export const getCricketTeamById = (id: string): CricketTeam | undefined => {
  return cricketTeams.find((team) => team.id === id);
};