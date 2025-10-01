import "./style.css";
import "./Css/addTask.css";
import "./Css/board.css";
import "./Css/editTask.css";
import "./Css/login.css";
import "./Css/register.css";
// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//  hello
// `;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

const regBtn = document.querySelector<HTMLButtonElement>("#registerBtn")!;
const loginBtn = document.querySelector<HTMLButtonElement>("#loginBtn")!;

regBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "./src/Pages/register.html";
  }, 1000);
});
loginBtn.addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "./src/Pages/login.html";
  }, 1000);
});
