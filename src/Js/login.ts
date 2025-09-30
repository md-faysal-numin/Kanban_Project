const emailInput = document.querySelector<HTMLInputElement>("#emailInput")!;
const passwordInput =
  document.querySelector<HTMLInputElement>("#passwordInput")!;

const loginForm = document.querySelector<HTMLFormElement>("#loginForm")!;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let objStr: string | null = localStorage.getItem("Email");
  if (objStr) {
    let emailObj = JSON.parse(objStr);

    let email = emailInput.value.toString();
    let password = passwordInput.value.toString();
    if (emailObj[email]) {
      let userObjStr: string | null = localStorage.getItem("User")!;
      let userObj = JSON.parse(userObjStr);
      let savedPass = userObj[emailObj[email]].password;
      if (savedPass === password) {
        sessionStorage.setItem("isLoggedIn", emailObj[email]);
        setTimeout(() => {
          window.location.href = "./board.html";
        }, 500);
        alert("Logged In Successful");
      } else {
        alert("You have entered wrong password");
        return;
      }
    } else {
      alert("You are not registred");
      return;
    }
  } else {
    alert("You are not registred");
    return;
  }
});
