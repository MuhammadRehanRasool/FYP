import axios from "axios";

// export const CONSTANT = {
//   server: "https://test0073.herokuapp.com/", // CHANGE WITH YOUR BACKEND LINK (/ is MUST IN END)
//   client: "https://quizweb-client.netlify.app/", // CHANGE WITH YOUR FRONTEND LINK (/ is MUST IN END)
// };

export const CONSTANT = {
  client: "http://localhost:3000/", // CHANGE WITH YOUR BACKEND LINK (/ is MUST IN END)
  server: "http://127.0.0.1:8000/", // CHANGE WITH YOUR FRONTEND LINK (/ is MUST IN END)
};

export const checkLoginFromLogin = () => {
  return localStorage.getItem("loggedin") &&
    JSON.parse(localStorage.getItem("loggedin")).data
    ? true
    : false;
};

export const checkLoginFromNonLogin = () => {
  return localStorage.getItem("loggedin") &&
    JSON.parse(localStorage.getItem("loggedin")).data
    ? false
    : true;
};

export const Loader = (extra = "") => {
  return (
    <div className={`spinner-grow ${extra}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export const setMessage = (text, color) => {
  let error = document.getElementById("error");
  error.innerHTML = text;
  error.classList.add("text-" + color);
  error.style.display = "block";
};

export const resetMessage = () => {
  let error = document.getElementById("error");
  error.innerText = "";
  error.style.display = "none";
  error.classList.remove("text-red-500");
  error.classList.remove("text-green-500");
};

export const isMessage = () => {
  let error = document.getElementById("error");
  if (error.style.display === "none") {
    return false;
  }
  return true;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Set a Cookie
export function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

export function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
