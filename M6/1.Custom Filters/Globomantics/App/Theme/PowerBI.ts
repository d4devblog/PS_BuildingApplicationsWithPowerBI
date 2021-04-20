export const GlobomanticsLightTheme = {
  name: "Globomantics Light",

  dataColors: [
    "#127C9A",
    "#4B0363",
    "#025959",
    "#CCAF00",
    "#127C9A",
    "#0B5B6D",
    "#1AAB40",
    "#490800"
  ],

  background: "#FFFFFF",
  foreground: "#252423",
  tableAccent: "#4316A6",

  good: "#1AAB40",
  neutral: "#D9B300",
  bad: "#D64554",
  maximum: "#490800",
  center: "#D9B300",
  minimum: "#FF5F46",
  null: "#FF7F48",

  textClasses: {
    callout: {
      fontSize: 12,
      fontFace: "Segoe UI Light",
      color: "#252423"
    },
    title: {
      fontSize: 16,
      fontFace: "Segoe UI Light",
      color: "#252423"
    },
    header: {
      fontSize: 12,
      fontFace: "Segoe UI Light",
      color: "#252423"
    },
    label: {
      fontSize: 10,
      fontFace: "Segoe UI Light",
      color: "#252423"
    }
  }
};

export const GlobomanticsDarkTheme = {
  name: "Globomantics Dark",

  dataColors: [
    "#127C9A",
    "#4B0363",
    "#025959",
    "#CCAF00",
    "#127C9A",
    "#0B5B6D",
    "#1AAB40",
    "#490800"
  ],

  background: "#474747",
  foreground: "#F1F1F1",
  tableAccent: "#4316A6",

  good: "#1AAB40",
  neutral: "#D9B300",
  bad: "#D64554",
  maximum: "#490800",
  center: "#D9B300",
  minimum: "#FF5F46",
  null: "#FF7F48",

  textClasses: {
    callout: {
      fontSize: 12,
      fontFace: "Segoe UI Light",
      color: "#252423"
    },
    title: {
      fontSize: 16,
      fontFace: "Segoe UI Light",
      color: "#FFFFFF"
    },
    header: {
      fontSize: 12,
      fontFace: "Segoe UI Light",
      color: "#FFFFFF"
    },
    label: {
      fontSize: 10,
      fontFace: "Segoe UI Light",
      color: "#FFFFFF"
    }
  },

  visualStyles: {
    "*": {
      "*": {
        "*": [
          {
            fontFamily: "Segoe UI",
            color: { solid: { color: "#474747" } },
            labelColor: { solid: { color: "#FFFFFF" } },
            titleColor: { solid: { color: "#FFFFFF" } }
          }
        ],
        labels: [
          {
            color: { solid: { color: "#FFFFFF" } }
          }
        ],
        categoryLabels: [
          {
            color: { solid: { color: "#FFFFFF" } }
          }
        ]
      }
    }
  }
};
