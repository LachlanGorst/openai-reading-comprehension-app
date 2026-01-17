// Mission Control inspired theme
export const theme = {
  colors: {
    // Dark cosmic background
    background: "#0a0e27",
    backgroundDarker: "#050609",

    // Text
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
      muted: "#a0a0a0",
    },

    // Primary accent - Magenta/Purple
    primary: "#d200ff",
    primaryLight: "#e634ff",
    primaryDim: "rgba(210, 0, 255, 0.1)",

    // Secondary accent - Orange/Gold
    secondary: "#ff9500",
    secondaryLight: "#ffb347",
    secondaryDim: "rgba(255, 149, 0, 0.1)",

    // Utility colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",

    // Surface colors
    surface: "#1a1f3a",
    surfaceHover: "#252d4a",
    border: "rgba(210, 0, 255, 0.2)",
  },

  gradients: {
    // Primary accent gradient
    primary: "from-purple-600 via-magenta-500 to-pink-500",

    // Secondary accent gradient
    secondary: "from-orange-400 via-amber-400 to-yellow-300",

    // Full spectrum gradient (like the homepage)
    cosmic: "from-purple-600 via-red-500 to-yellow-400",

    // Subtle glow
    glow: "from-purple-500/50 to-orange-500/50",
  },

  shadows: {
    glow: "0 0 20px rgba(210, 0, 255, 0.4)",
    glowOrange: "0 0 20px rgba(255, 149, 0, 0.4)",
    glowSmall: "0 0 10px rgba(210, 0, 255, 0.2)",
  },

  typography: {
    fontFamily:
      "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
};
