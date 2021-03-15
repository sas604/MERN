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

h2{
  margin:unset;
 margin-top:2rem;
 margin-bottom:1rem;
}
fieldset{
  margin-top :1rem;
}
.desc {
    display: block;
    font-size: 0.8rem;
    color: var(--gray);
  }
  

  .button {
    border: 0;
    display:inline-block;
    background-color: var(--black);
    color: var(--white);
    text-decoration: none;
    padding: 0.5rem 1rem;
    text-align: center;
    font-size: 1.3rem;
    transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s;
    &:hover {
      transform: scale(1.01);
    }
  }
  .button--red{
    background-color:var(--red)
  }
  .button--blue{
    background-color:var(--blue)
  }
  .warning{
    color: var(--red);
  }

#modal{
  position:fixed;
  top:0;
  left:0;
  width:100vh;
  min-height:100vh;
  z-index:999;
  background-color:black;
}

.max-width{
  max-width:1100px;
  margin: 0 auto;
}

.top-bottom {
  padding-top:3rem;
  padding-bottom:3rem;
}
`;

export default GlobalStyle;
