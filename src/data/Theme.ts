'use client';

import { createTheme } from '@mui/material/styles';

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8f8686', // Google Doc blue
//     },
//     secondary: {
//       main: '#F57C00', // Google Doc orange
//     },
//     background: {
//       default: '#ffffff', // White background
//     },
//     text: {
//       primary: '#000000', // Black text
//     },
//   },
//   typography: {
//     fontFamily: 'sans-serif', // Default font
//     h1: {
//       fontSize: '24px', // Heading size
//     },
//     body1: {
//       fontSize: '14px', // Body text size
//     },
//   },
//   spacing: 8, // Adjust spacing as needed
//   components: {
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#f5f5f5', // Light gray for app bar
//           boxShadow: 'none', // Remove default shadow
//         },
//       },
//     },
//     MuiToolbar: {
//       styleOverrides: {
//         root: {
//           minHeight: '64px', // Adjust toolbar height if needed
//         },
//       },
//     },
//     MuiDivider: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#e0e0e0', // Light gray for dividers
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ffffff', // White for paper elements (like cards)
//           boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05)', // Subtle shadow
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Border for table cells
//         },
//       },
//     },
//   },
// });



export const theme = createTheme({
  palette: {
    primary: {
      main: '#04ac48', // Deep purple (elegant accent)
    },
    secondary: {
      main: '#f5f5f5', // Light gray (subtle contrast)
    },
    background: {
      default: '#ffffff', // White background
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#424242', // Lighter gray for subtle accents
    },
  },
  typography: {
    fontFamily: 'Roboto', // Default Material UI font
    h1: {
      fontSize: '2.5rem', // Adjust heading size as needed
      fontWeight: 500, // Medium weight for headings
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6, // Adjust line height for better readability
    },
  },
  spacing: 8, // Adjust spacing as needed
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // Rounded button corners
          textTransform: 'none', // Remove uppercase transformation
          fontWeight: 500, // Slightly bold weight for buttons
          fontSize: '0.875rem', // Adjust button text size
        },
        contained: {
          backgroundColor: '#3f51b5', // Primary color for contained buttons
          color: '#ffffff', // White text for contained buttons
          '&:hover': {
            backgroundColor: '#303f9f', // Darken primary on hover
          },
        },
        outlined: {
          borderColor: '#3f51b5', // Primary color for outlined buttons
          color: '#3f51b5', // Primary text for outlined buttons
          '&:hover': {
            backgroundColor: '#f5f5f5', // Light gray background on hover
            borderColor: '#303f9f', // Darken primary border on hover
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottom: '1px solid #dddddd', // Light gray underline for inputs
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.1)', // Subtle shadow for paper elements
        },
      },
    },
  },
});

export default theme;
