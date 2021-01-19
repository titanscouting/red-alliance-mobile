import AsyncStorage from "@react-native-community/async-storage";
let isDarkMode;
module.exports.refreshTheme = async () => {
  isDarkMode = await AsyncStorage.getItem('tra-dark-mode') == 'true'
}
export default {
  optionsStyle: {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    color: isDarkMode ? "white" : "black",
  },
  enrollmentStyle: {
    generic: {
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      color: isDarkMode ? "white" : "black",
    },
    title1Style: {
      color: isDarkMode ? "white" : "black",
      fontSize: 30,
    },
    disclaimerStyle: {
      color: isDarkMode ? "white" : "black",
      fontSize: 18,
      padding: 50
    },
    textInputStyle: {
      height: 60,
      width: 'auto',
      fontSize: 24,
      borderColor: 'gray',
      borderWidth: 1,
      width: '100%',
      textAlign: 'center',
      borderRadius: 5,
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      color: isDarkMode ? "white" : "black",
    }
  },
  generic: {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    color: isDarkMode ? "white" : "black",
  },
  matchesStyle: {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    color: isDarkMode ? "white" : "black",
    fontSize: 20,
    cellStyle: {
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      color: isDarkMode ? "white" : "black",
      fontSize: 20,
    },
    teamCellStyle: {
      ribbon: {
        width: 15,
        height: 40,
      },
      team: {
        color: isDarkMode ? "white" : "black",
        fontSize: 18,
        flex: 1,
      },
      type: {
        color: isDarkMode ? "white" : "black",
        fontSize: 16,
        flex: 1,
      },
      scouter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: isDarkMode ? "white" : "black",
      },
      cell: {
        flexDirection: 'row'
      }
    }
  },
  statsStyle: {
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
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
    backgroundColor: isDarkMode ? "#121212" : "#ffffff",
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
    },
    tableViewStyle: {
      listStyle: {
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        color: isDarkMode ? "white" : "black",
      },
      generic: {
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        color: isDarkMode ? "white" : "black",
      },
      noStrats: {
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        color: isDarkMode ? "white" : "black",
      },
      container: {
        flex: 1,
        alignItems: 'flex-start',
      },
      stepper: {
        flex: 1,
      },
      tabStyle: {
        borderColor: isDarkMode ? "#121212" : "#ffffff",
      },
      activeTabStyle: {
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      },
      tabTextStyle: {
        color: isDarkMode ? "white" : "black",
      },
      textarea: {
        height: 120,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        color: isDarkMode ? "white" : "black",
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      },
      headerStyle: {
        ribbon: {
          width: 10,
          height: 60,
        },
        team: {
          color: isDarkMode ? "white" : "black",
          fontSize: 18,
          flex: 1,
        },
        type: {
          color: isDarkMode ? "white" : "black",
          fontSize: 16,
          flex: 1,
        },
        match: {
          color: isDarkMode ? "white" : "black",
          fontSize: 20,
        },
        blue: {
          flexDirection: 'column',
        },
        cell: {
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: 'auto',
          backgroundColor: isDarkMode ? "#121212" : "#ffffff",
        },
        left: {
          flexDirection: 'row',
        },
        right: {
          paddingTop: 10,
          flexDirection: 'row',
          textAlign: 'right',
        }
      }
    }
  }
}