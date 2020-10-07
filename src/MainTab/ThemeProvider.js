const isDarkMode = false;
export default {
    optionsStyle: {
      backgroundColor: isDarkMode ? "#121212": "#ffffff",
      color: isDarkMode ? "white" : "black",
    },
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
      },
      strategiesStyle: {
        color: isDarkMode ? 'white' : 'black',
        backgroundColor: isDarkMode ? "#121212": "#ffffff",
        stratCellStyle: {
          ribbon: {
            width: 10,
            height: 60,
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
        match: {
          color: isDarkMode ? 'white' : 'black',
          fontSize: 20,
        },
        blue: {
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        cell: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        left: {
            flexDirection: 'row',
        },
        right: {
            flexDirection: 'row-reverse'
        }
        }
      }
}