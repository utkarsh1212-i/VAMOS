export interface FootballTeam {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
  }
  
  export const teams: FootballTeam[] = [
    {
      id: "manchester-united",
      name: "Manchester United",
      shortName: "Man Utd",
      logo: "united-logo.svg",
      primaryColor: "#DA291C",
      secondaryColor: "#000000",
      accentColor: "#000",
      textColor: "#000"
    },
    {
      id: "real-madrid",
      name: "Real Madrid",
      shortName: "Real",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      primaryColor: "#FFFFFF",
      secondaryColor: "#00529F",
      accentColor: "#FFCD00",
      textColor: "#000000"
    },
    {
      id: "barcelona",
      name: "FC Barcelona",
      shortName: "Barça",
      logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
      primaryColor: "#004D98",
      secondaryColor: "#A50044",
      accentColor: "#FFED02",
      textColor: "#FFFFFF"
    },
    {
      id: "liverpool",
      name: "Liverpool FC",
      shortName: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      primaryColor: "#C8102E",
      secondaryColor: "#F6EB61",
      accentColor: "#00B2A9",
      textColor: "#FFFFFF"
    },
    {
      id: "manchester-city",
      name: "Manchester City",
      shortName: "Man City",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      primaryColor: "#6CABDD",
      secondaryColor: "#1C2C5B",
      accentColor: "#FFC659",
      textColor: "#FFFFFF"
    }
  ];
  
  export const getTeamById = (id: string): FootballTeam | undefined => {
    return teams.find(team => team.id === id);
  };