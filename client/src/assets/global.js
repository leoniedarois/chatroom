import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: linear-gradient(0deg, rgba(22,46,93,1) 45%, rgba(30,68,140,1) 100%);
    color: ${({theme}) => theme.text};
    height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  .button {
    path {
      stroke: ${({theme}) => theme.actionColor};
    }
    &:hover {
       path {
        -webkit-filter: drop-shadow(2px 2px 2px rgba(255,255,255,0.3));      
        filter: drop-shadow(2px 2px 2px rgba(255,255,255,0.3));  
        transition-duration: 200ms;
       }
    }
  }
  
  .userMessages {
    text-align: right;
    background: ${({theme}) => theme.messageBackground};
    border-radius: 25px;
    padding: 15px;
    margin-bottom: 10px;
    float: right;
  }

  .devMessages {
    color: #FFFFFF;
    text-align: left;
    background: rgba(255,255,255,0.06);
    border: ${({theme}) => theme.themeColor} 2px solid;
    border-radius: 25px;
    padding: 15px;
    max-width: 45%;
    margin-bottom: 10px;
    float: left;
  }
  
  .desMessages {
    color: #FFFFFF;
    text-align: left;
    background: rgba(255,255,255,0.06);
    border: ${({theme}) => theme.themeColor} 2px solid;
    border-radius: 25px;
    padding: 15px;
    max-width: 45%;
    margin-bottom: 10px;
    float: left;
  }
  
  .decoration {
    circle {
      fill: ${({theme}) => theme.actionColor};
    }
  }
  
  .notification {
    position: absolute;
    left: -15px;
    margin-bottom: 20px;
    height: 53px;
    circle {
      fill: ${({theme}) => theme.actionColor};
    }
  }
`;
