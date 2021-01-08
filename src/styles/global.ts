import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Noto Sans', sans-serif;
  }

  :root {
    font-size: 62.5%;
  }

  body {
    width: 100vw;
    min-height: 100vh;

    font-size: 1.6rem;
  }

  input, textarea, select, button {
    font-family: 'Noto Sans', sans-serif;
    color: ${({ theme }) => theme.colors.primary};

    background-color: ${({ theme }) => theme.colors.secondaryWhite};
  }
`;

export default GlobalStyle;
