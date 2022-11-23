import { Theme, ThemeOptions } from "@mui/material/styles";
import * as createPalette from "@mui/material/styles/createPalette"

//define additional property for createTheme (see src/theme/theme.ts)
declare module "@mui/material/styles/createPalette" {
    interface PaletteOptions {
        customYellow?: {
            dark?: any;
            main?: string;
            light?: string
        }
    }
}