import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import {RecoilRoot} from "recoil";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {Theme} from "./theme.ts";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: inherit;
  }
  body {
    font-family: 'SUIT Variable', sans-serif;
    color: ${(props) => props.theme.textColor};
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>
);
