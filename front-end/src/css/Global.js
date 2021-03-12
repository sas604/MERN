import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root{
  --red: #E1261C;
  --blue: #0071CE;
  --black: #1B1C1F;
  --white:#EBEDED;
  --gray:#A8A8AA;

}


html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}



body{
  background-color: var(--white);
}
input{
  padding: 0.5rem 1rem;
}

a{
  display:inline-block;
}



`;

export default GlobalStyle;
