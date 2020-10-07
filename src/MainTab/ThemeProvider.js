const isDarkMode = false;
export default {
    matchesStyle: isDarkMode ? {
        backgroundColor: "#121212",
        color: "white",
        fontSize: 20
      } : {
        backgroundColor: "#ffffff",
        color: "black",
        fontSize: 20
      } 
}