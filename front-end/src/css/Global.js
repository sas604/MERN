import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root{
  --red: #E1261C;
  --blue: #0071CE;
  --black: #1B1C1F;
  --white:#EBEDED;
  --gray:#A8A8AA;

}
body{
  background-color: var(--white);
}


`;

export default GlobalStyle;
