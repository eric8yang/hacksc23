import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

<head>
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-storage.js"></script>
</head>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);