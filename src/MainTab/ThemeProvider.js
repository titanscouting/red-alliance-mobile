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
      },
      statsStyle: {
        backgroundColor: isDarkMode ? "#121212": "#ffffff",
        color: isDarkMode ? "white" : "black",
        teamCellStyle: {
            ribbon: {
              width: 8,
              height: 8,
              borderRadius: 4,
              alignSelf: 'flex-start',
          },
          team: {
            color: isDarkMode ? 'white' : 'black',
            fontSize: 18,
            flex: 1,
          },
          type: {
            color: isDarkMode ? 'white' : 'black',
            fontSize: 16,
            flex: 1,
          },
          scouter: {
              flexDirection: 'column',
              justifyContent: 'space-between',
          },
          cell: {
              flexDirection: 'row',
          },
          nickname: {
            color: isDarkMode ? 'white' : 'black',
          }
        }
      }
}