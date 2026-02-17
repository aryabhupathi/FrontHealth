// import { createTheme, type PaletteMode } from "@mui/material/styles";
// declare module "@mui/material/styles" {
//   interface Palette {
//     gradient: {
//       primary: string;
//       primaryHover: string;
//       accent: string;
//       accentHover: string;
//     };
//     glass: {
//       soft: string;
//       darker: string;
//       cardBorder: string;
//       cardShadow: string;
//     };
//     layout: {
//       authBg: string;
//     };
//   }
//   interface PaletteOptions {
//     gradient?: {
//       primary?: string;
//       primaryHover?: string;
//       accent?: string;
//       accentHover?: string;
//     };
//     glass?: {
//       soft?: string;
//       cardBorder?: string;
//       cardShadow?: string;
//     };
//     layout?: {
//       authBg?: string;
//     };
//   }
// }
// const getDesignTokens = (mode: PaletteMode) =>
//   mode === "light"
//     ? {
//         palette: {
//           mode: "light" as const,
//           primary: { main: "#2563eb" },
//           secondary: { main: "#16a34a" },
//           background: {
//             default: "#f1f5f9",
//             paper: "#ffffff",
//           },
//           text: {
//             primary: "#020617",
//             secondary: "#475569",
//             default: "#ffffff",
//           },
//           gradient: {
//             primary: "linear-gradient(135deg, #2563eb, #4f46e5, #0ea5e9)",
//             primaryHover: "linear-gradient(135deg, #1d4ed8, #4338ca, #0284c7)",
//             accent: "linear-gradient(135deg, #22c55e, #0ea5e9, #6366f1)",
//             accentHover: "linear-gradient(135deg, #16a34a, #0284c7, #4f46e5)",
//           },
//           glass: {
//             soft: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(248,250,252,0.96))",
//             cardBorder: "rgba(148,163,184,0.55)",
//             cardShadow:
//               "0 22px 45px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.9)",
//           },
//           layout: {
//             authBg:
//               "radial-gradient(circle at top left, #eff6ff 0, #e0f2fe 35%, #f8fafc 80%)",
//           },
//         },
//       }
//     : {
//         palette: {
//           mode: "dark" as const,
//           primary: { main: "#4f46e5" },
//           secondary: { main: "#22c55e" },
//           background: {
//             default: "#020617",
//             paper: "#020617",
//           },
//           text: {
//             primary: "#e5e7eb",
//             secondary: "rgba(148,163,184,0.95)",
//           },
//           gradient: {
//             primary: "linear-gradient(135deg, #4f46e5, #2563eb, #06b6d4)",
//             primaryHover: "linear-gradient(135deg, #4338ca, #1d4ed8, #0891b2)",
//             accent: "linear-gradient(135deg, #22c55e, #22d3ee, #6366f1)",
//             accentHover: "linear-gradient(135deg, #16a34a, #06b6d4, #4f46e5)",
//           },
//           glass: {
//             soft: "linear-gradient(135deg, rgba(15,23,42,0.88), rgba(15,23,42,0.96))",
//             // darker: "linear-gradient(135deg, rgba(34, 53, 97, 0.88), rgba(27, 42, 78, 0.96))",
//             darker: "rgba(114, 107, 234, 0.23)",
//             cardBorder: "rgba(148,163,184,0.45)",
//             cardShadow:
//               "0 24px 60px rgba(15,23,42,0.85), 0 0 0 1px rgba(15,23,42,0.9)",
//           },
//           layout: {
//             authBg:
//               "radial-gradient(circle at top left, #1e88e5 0, #0d47a1 30%, #020617 80%)",
//           },
//         },
//       };
// const getTheme = (mode: PaletteMode) =>
//   createTheme({
//     ...getDesignTokens(mode),
//     shape: {
//       borderRadius: 16,
//     },
//     typography: {
//       fontFamily:
//         "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
//       h4: { fontWeight: 700, letterSpacing: 0.4 },
//       button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.4 },
//     },
//     components: {
//       MuiCssBaseline: {
//         styleOverrides: (themeParam) => ({
//           body: {
//             backgroundColor: themeParam.palette.background.default,
//             backgroundImage: themeParam.palette.layout.authBg,
//             backgroundRepeat: "no-repeat",
//             backgroundAttachment: "fixed",
//           },
//         }),
//       },
//       MuiTextField: {
//         defaultProps: {
//           variant: "outlined",
//           margin: "normal",
//         },
//         styleOverrides: {
//           root: ({ theme }) => ({
//             "& .MuiInputLabel-root": {
//               color: theme.palette.text.secondary,
//             },
//             "& .MuiOutlinedInput-root": {
//               borderRadius: 16,
//               color: theme.palette.text.primary,
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? "rgba(15,23,42,0.9)"
//                   : "rgba(255,255,255,0.9)",
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "rgba(148,163,184,0.45)",
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "rgba(129,140,248,0.9)",
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "rgba(129,140,248,1)",
//                 boxShadow: "0 0 0 1px rgba(129,140,248,0.6)",
//               },
//             },
//             "& .MuiFormHelperText-root.Mui-error": {
//               marginTop: 4,
//               // color: "rgba(252,165,165,0.9)",
//             },
//           }),
//         },
//       },
//       MuiPaper: {
//         styleOverrides: {
//           root: ({ theme }) => ({
//             borderRadius: 24,
//             background: theme.palette.glass.soft,
//             border: `1px solid ${theme.palette.glass.cardBorder}`,
//             boxShadow: theme.palette.glass.cardShadow,
//             backdropFilter: "blur(26px)",
//             color: theme.palette.text.primary,
//           }),
//         },
//       },
//       MuiAppBar: {
//         defaultProps: {
//           position: "sticky",
//           color: "transparent",
//           elevation: 0,
//         },
//         styleOverrides: {
//           root: ({ theme }) => ({
//             backdropFilter: "blur(18px)",
//             background:
//               theme.palette.mode === "dark"
//                 ? "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(15,23,42,0.98))"
//                 : "linear-gradient(135deg, rgba(248,250,252,0.96), rgba(241,245,249,0.98))",
//             borderBottom:
//               theme.palette.mode === "dark"
//                 ? "1px solid rgba(148,163,184,0.28)"
//                 : "1px solid rgba(148,163,184,0.35)",
//             boxShadow:
//               theme.palette.mode === "dark"
//                 ? "0 14px 40px rgba(15,23,42,0.7), 0 0 0 1px rgba(15,23,42,0.8)"
//                 : "0 12px 35px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.9)",
//           }),
//         },
//       },
//       MuiToolbar: {
//         styleOverrides: {
//           root: {
//             minHeight: 64,
//             paddingInline: 24,
//             display: "flex",
//             justifyContent: "space-between",
//           },
//         },
//       },
//       MuiDrawer: {
//         styleOverrides: {
//           paper: ({ theme }) => ({
//             background: theme.palette.glass.soft,
//             borderLeft: `1px solid ${theme.palette.glass.cardBorder}`,
//             boxShadow: theme.palette.glass.cardShadow,
//             backdropFilter: "blur(22px)",
//           }),
//         },
//       },
//       MuiListItemButton: {
//         styleOverrides: {
//           root: ({ theme }) => ({
//             borderRadius: 999,
//             marginBlock: 4,
//             paddingInline: 14,
//             "&.Mui-selected": {
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? "rgba(129,140,248,0.18)"
//                   : "rgba(191,219,254,0.6)",
//               color:
//                 theme.palette.mode === "dark"
//                   ? theme.palette.primary.light
//                   : theme.palette.primary.main,
//             },
//             "&:hover": {
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? "rgba(148,163,184,0.12)"
//                   : "rgba(226,232,240,0.8)",
//             },
//           }),
//         },
//       },
//       MuiIconButton: {
//         styleOverrides: {
//           root: ({ theme }) => ({
//             borderRadius: 999,
//             padding: 7,
//             color: theme.palette.text.secondary,
//             "&:hover": {
//               backgroundColor:
//                 theme.palette.mode === "dark"
//                   ? "rgba(148,163,184,0.16)"
//                   : "rgba(148,163,184,0.12)",
//               color: theme.palette.text.primary,
//             },
//           }),
//         },
//       },
//       MuiButton: {
//         variants: [
//           {
//             props: { variant: "text", color: "inherit" },
//             style: {
//               fontWeight: 600,
//               borderRadius: 999,
//               paddingInline: 16,
//               "&:hover": {
//                 backgroundColor: "rgba(148,163,184,0.12)",
//               },
//             },
//           },
//         ],
//       },
//       MuiOutlinedInput: {
//         styleOverrides: {
//           root: ({ theme }) => ({
//             borderRadius: 16,
//             backgroundColor:
//               theme.palette.mode === "dark"
//                 ? "rgba(15,23,42,0.9)"
//                 : "rgba(255,255,255,0.9)",
//           }),
//         },
//       },
//     },
//   });
// export { getTheme };


import { createTheme, type PaletteMode } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";
declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      primary: string;
      primaryHover: string;
      accent: string;
      accentHover: string;
    };
    glass: {
      soft: string;
      darker: string;
      cardBorder: string;
      cardShadow: string;
    };
    layout: {
      authBg: string;
    };
  }
  interface PaletteOptions {
    gradient?: {
      primary?: string;
      primaryHover?: string;
      accent?: string;
      accentHover?: string;
    };
    glass?: {
      soft?: string;
      cardBorder?: string;
      cardShadow?: string;
    };
    layout?: {
      authBg?: string;
    };
  }
}
const getDesignTokens = (mode: PaletteMode) =>
  mode === "light"
    ? {
        palette: {
          mode: "light" as const,
          primary: { main: "#2563eb" },
          secondary: { main: "#16a34a" },
          background: {
            default: "#f1f5f9",
            paper: "#ffffff",
          },
          text: {
            primary: "#020617",
            secondary: "#475569",
            default: "#ffffff",
          },
          gradient: {
            primary: "linear-gradient(135deg, #2563eb, #4f46e5, #0ea5e9)",
            primaryHover: "linear-gradient(135deg, #1d4ed8, #4338ca, #0284c7)",
            accent: "linear-gradient(135deg, #22c55e, #0ea5e9, #6366f1)",
            accentHover: "linear-gradient(135deg, #16a34a, #0284c7, #4f46e5)",
          },
          glass: {
            soft: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(248,250,252,0.96))",
            cardBorder: "rgba(148,163,184,0.55)",
            cardShadow:
              "0 22px 45px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.9)",
          },
          layout: {
            authBg:
              "radial-gradient(circle at top left, #eff6ff 0, #e0f2fe 35%, #f8fafc 80%)",
          },
        },
      }
    : {
        palette: {
          mode: "dark" as const,
          primary: { main: "#4f46e5" },
          secondary: { main: "#22c55e" },
          background: {
            default: "#020617",
            paper: "#020617",
          },
          text: {
            primary: "#e5e7eb",
            secondary: "rgba(148,163,184,0.95)",
          },
          gradient: {
            primary: "linear-gradient(135deg, #4f46e5, #2563eb, #06b6d4)",
            primaryHover: "linear-gradient(135deg, #4338ca, #1d4ed8, #0891b2)",
            accent: "linear-gradient(135deg, #22c55e, #22d3ee, #6366f1)",
            accentHover: "linear-gradient(135deg, #16a34a, #06b6d4, #4f46e5)",
          },
          glass: {
            soft: "linear-gradient(135deg, rgba(15,23,42,0.88), rgba(15,23,42,0.96))",
            // darker: "linear-gradient(135deg, rgba(34, 53, 97, 0.88), rgba(27, 42, 78, 0.96))",
            darker: "rgba(114, 107, 234, 0.23)",
            cardBorder: "rgba(148,163,184,0.45)",
            cardShadow:
              "0 24px 60px rgba(15,23,42,0.85), 0 0 0 1px rgba(15,23,42,0.9)",
          },
          layout: {
            authBg:
              "radial-gradient(circle at top left, #1e88e5 0, #0d47a1 30%, #020617 80%)",
          },
        },
      };

const getTheme = (mode: PaletteMode) =>
  createTheme({
    ...getDesignTokens(mode),

    shape: {
      borderRadius: 16,
    },

    typography: {
      fontFamily:
        "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      h4: { fontWeight: 700, letterSpacing: 0.4 },
      button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.4 },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam) => ({
          body: {
            backgroundColor: themeParam.palette.background.default,
            backgroundImage: themeParam.palette.layout.authBg,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        }),
      },

      MuiPickersOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,

            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(15,23,42,0.9)"
                : "rgba(255,255,255,0.9)",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(148,163,184,0.45)",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(129,140,248,0.9)",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(129,140,248,1)",
              boxShadow: "0 0 0 1px rgba(129,140,248,0.6)",
            },
          }),
        },
      },

      /* ------------------------------------------------ */
      /* TEXT FIELD WRAPPER (labels + helper text only) */
      /* ------------------------------------------------ */
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          margin: "normal",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary,
            },
            "& .MuiFormHelperText-root.Mui-error": {
              marginTop: 4,
            },
          }),
        },
      },

      /* ------------------------------------------------ */
      /* CORE INPUT VISUAL LAYER (applies to ALL fields) */
      /* ------------------------------------------------ */
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            color: theme.palette.text.primary,

            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(15,23,42,0.9)"
                : "rgba(255,255,255,0.9)",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(148,163,184,0.45)",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(129,140,248,0.9)",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(129,140,248,1)",
              boxShadow: "0 0 0 1px rgba(129,140,248,0.6)",
            },

            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
            },
          }),
        },
      },

      /* ------------------------------------------------ */
      /* PAPER */
      /* ------------------------------------------------ */
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 24,
            background: theme.palette.glass.soft,
            border: `1px solid ${theme.palette.glass.cardBorder}`,
            boxShadow: theme.palette.glass.cardShadow,
            backdropFilter: "blur(26px)",
            color: theme.palette.text.primary,
          }),
        },
      },

      /* ------------------------------------------------ */
      /* APP BAR */
      /* ------------------------------------------------ */
      MuiAppBar: {
        defaultProps: {
          position: "sticky",
          color: "transparent",
          elevation: 0,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            backdropFilter: "blur(18px)",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(15,23,42,0.98))"
                : "linear-gradient(135deg, rgba(248,250,252,0.96), rgba(241,245,249,0.98))",
            borderBottom:
              theme.palette.mode === "dark"
                ? "1px solid rgba(148,163,184,0.28)"
                : "1px solid rgba(148,163,184,0.35)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 14px 40px rgba(15,23,42,0.7), 0 0 0 1px rgba(15,23,42,0.8)"
                : "0 12px 35px rgba(15,23,42,0.12), 0 0 0 1px rgba(226,232,240,0.9)",
          }),
        },
      },

      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: 64,
            paddingInline: 24,
            display: "flex",
            justifyContent: "space-between",
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            background: theme.palette.glass.soft,
            borderLeft: `1px solid ${theme.palette.glass.cardBorder}`,
            boxShadow: theme.palette.glass.cardShadow,
            backdropFilter: "blur(22px)",
          }),
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 999,
            marginBlock: 4,
            paddingInline: 14,
            "&.Mui-selected": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(129,140,248,0.18)"
                  : "rgba(191,219,254,0.6)",
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
            },
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(148,163,184,0.12)"
                  : "rgba(226,232,240,0.8)",
            },
          }),
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 999,
            padding: 7,
            color: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(148,163,184,0.16)"
                  : "rgba(148,163,184,0.12)",
              color: theme.palette.text.primary,
            },
          }),
        },
      },

      MuiButton: {
        variants: [
          {
            props: { variant: "text", color: "inherit" },
            style: {
              fontWeight: 600,
              borderRadius: 999,
              paddingInline: 16,
              "&:hover": {
                backgroundColor: "rgba(148,163,184,0.12)",
              },
            },
          },
        ],
      },
    },
  });

export { getTheme };
