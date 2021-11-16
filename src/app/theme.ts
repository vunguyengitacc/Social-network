import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    bold1: React.CSSProperties;
    bold2: React.CSSProperties;
    bold3: React.CSSProperties;
    bold4: React.CSSProperties;
    bold5: React.CSSProperties;
    bold6: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    bold1?: React.CSSProperties;
    bold2?: React.CSSProperties;
    bold3?: React.CSSProperties;
    bold4?: React.CSSProperties;
    bold5?: React.CSSProperties;
    bold6?: React.CSSProperties;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    disable: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    disable?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    disable: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bold1: true;
    bold2: true;
    bold3: true;
    bold4: true;
    bold5: true;
    bold6: true;
  }
}

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#667eea",
    },
    disable: {
      main: "#9c9c9c",
    },
  },
  typography: {
    bold1: {
      fontSize: "10px",
      lineHeight: "12px",
      fontWeight: 700,
    },
    bold2: {
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 700,
    },
    bold3: {
      fontSize: "14px",
      lineHeight: "22px",
      fontWeight: 700,
    },
    bold4: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700,
    },
    bold5: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 700,
    },
    bold6: {
      fontSize: "20px",
      lineHeight: "28px",
      fontWeight: 700,
    },
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "10px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "0 10px 0 10px",
          borderRadius: "0",
          boxShadow: "0 0 8px 0 rgb(0 0 0 / 12%)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "10px !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          paddingLeft: "40px",
          paddingRight: "40px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:focus": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          height: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-start",
          textAlign: "start",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          height: "30px",
          width: "30px",
          border: "2px solid #83888f",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: "12px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "40px",
          borderRadius: "10px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "40px",
          borderRadius: "0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paperAnchorBottom: {
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
        },
        paperAnchorLeft: {
          borderTopRightRadius: "15px",
          borderBottomRightRadius: "15px",
        },
      },
    },
  },
});

export default theme;
