import { createMuiTheme } from "@material-ui/core/styles";

export default class DefaultTheme {
  theme = createMuiTheme({
    palette: {
      type: "light",
      primary: { main: "#62BEC4" },
      secondary: { main: "#4F575C" },
      background: {
        default: "#f0f0f0",
        paper: "#f0f0f0"
      }
    }
  });
}
