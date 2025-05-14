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
      logo: "/manchester-united.svg",
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
    },

    // BASKETBALL
    {
      id: "wizards",
      name: "Washington Wizards",
      shortName: "wizards",
      logo: "/washington-wizards-3.svg",
      primaryColor: "#552583",
      secondaryColor: "#FDB927",
      accentColor: "#000000",
      textColor: "#000",
    },
    {
      id: "lakers",
      name: "Los Angeles Lakers",
      shortName: "Lakers",
      logo: "/los-angeles-lakers-1.svg",
      primaryColor: "#FDB927",
      secondaryColor: "#552583",
      accentColor: "#0E2240",
      textColor: "#000",
    },
    {
      id: "chicago-bulls",
      name: "Chicago Bulls",
      shortName: "Bulls",
      logo: "/chicago-bulls-logo.svg",
      primaryColor: "#CE1141",
      secondaryColor: "#000000",
      accentColor: "#FFFFFF",
      textColor: "#000",
    },
    // CRICKET
    {
      id: "india",
      name: "India",
      shortName: "IND",
      logo: "/bcci-seeklogo.png",
      primaryColor: "#3858b5",
      secondaryColor: "#FF9933",
      accentColor: "#138808",
      textColor: "#000",
    },
    {
      id: "australia",
      name: "Australia",
      shortName: "AUS",
      logo: "/Cricket-Australia.svg",
      primaryColor: "#FFCD00",
      secondaryColor: "#007A33",
      accentColor: "#000000",
      textColor: "#000",
    },
    {
      id: "england",
      name: "England",
      shortName: "ENG",
      logo: "/england-logo.svg",
      primaryColor: "#00247D",
      secondaryColor: "#FFFFFF",
      accentColor: "#CF142B",
      textColor: "#000",
    },
    {
      id: "mumbai-indians",
      name: "Mumbai Indians",
      shortName: "MI",
      logo: "/mumbai-indians-seeklogo.png",
      primaryColor: "#3d5fc3",
      secondaryColor: "#FFFFFF",
      accentColor: "#FFCD00",
      textColor: "#000",
    },
  ];
  
  export const getTeamById = (id: string): FootballTeam | undefined => {
    return teams.find(team => team.id === id);
  };