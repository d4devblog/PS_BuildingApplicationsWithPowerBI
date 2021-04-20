import { createMuiTheme } from "@material-ui/core/styles";

export default class DarkTheme {
  theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: { main: "#f7f7f7" },
      secondary: { main: "#4F575C" },
      background: {
        default: "#333",
        paper: "#333"
      }
    }
  });
}
