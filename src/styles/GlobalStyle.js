import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
  html, body {
    font-family: Open Sans, serif !important;
    font-size: 14px;
    background: #f1f1f1 !important;
    font-weight: 400;
    color: #333;
    line-height: 1.2;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    overflow: hidden;
  }

  // helpers
  
  .relative {
    position: relative;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .fill {
    width: 100%;
  }

  .mb30 {
    margin-bottom: 30px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mt30 {
    margin-top: 30px;
  }
  .mr5 {
    margin-right: 5px;
  }
  .mr20 {
    margin-right: 20px;
  }

  .pv10 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .ph30 {
    padding-left: 30px;
    padding-right: 30px;
  }

  .flex-1 {
    flex: 1 !important;
  }
  .flex-2 {
    flex: 2 !important;
  }
  .flex-v {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .flex-v.flex-end {
    align-items: flex-end;
    justify-content: flex-end;
  }
  .flex-v.flex-start {
    align-items: flex-start !important;
  }
  .flex-v.flex-center {
    justify-content: center;
  }
  .flex-h {
    display: flex !important;
    flex-direction: row;
  }
  .flex-h.flex-end {
    align-items: flex-end;
    justify-content: flex-end;
  }
  .flex-h.flex-start {
    align-items: flex-start !important;
  }
  .flex-h.flex-center {
    justify-content: center;
    align-items: center;
  }

`;
