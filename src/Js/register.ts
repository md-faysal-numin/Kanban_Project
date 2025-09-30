const nameInput = document.querySelector<HTMLInputElement>("#usernameInput")!;
const emailInput = document.querySelector<HTMLInputElement>("#emailInput")!;
const passwordInput =
  document.querySelector<HTMLInputElement>("#passwordInput")!;
const usernameError =
  document.querySelector<HTMLSpanElement>("#usernameError")!;
const emailError = document.querySelector<HTMLSpanElement>("#emailError")!;
const passwordError =
  document.querySelector<HTMLSpanElement>("#passwordError")!;
const regForm = document.querySelector<HTMLFormElement>("#regForm")!;
// console.log(regForm);

function validateUsername(username: string): boolean {
  //   const regex = /^[0-9A-Za-z]{2,16}$/;
  const regex = /^(?![0-9]+$)[a-zA-Z0-9 ]{2,}$/;

  return regex.test(username);
}
let isValid = true;
nameInput.addEventListener("keyup", () => {
  let objStr: string | null = localStorage.getItem("User");
  let username: string = nameInput.value.toString();
  if (typeof objStr === "string") {
    let obj = JSON.parse(objStr);
    if (obj[username]) {
      usernameError.textContent = "Username already exists";
      isValid = false;
      return;
    } else {
      usernameError.textContent = "";
    }
  }

  if (!validateUsername(username)) {
    usernameError.textContent = "Enter Valid username  ";
    isValid = false;
  } else {
    usernameError.textContent = "";
    isValid = true;
  }
});

function validateEmail(email: string): boolean {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}
emailInput.addEventListener("keyup", () => {
  let objStr: string | null = localStorage.getItem("Email");
  let email: string = emailInput.value.toString();
  if (typeof objStr === "string") {
    let obj = JSON.parse(objStr);
    // console.log(email, obj[email]);
    if (obj[email]) {
      emailError.textContent = "Email already exists";

      isValid = false;

      return;
    } else {
      emailError.textContent = "";
    }
  }

  if (!validateEmail(email)) {
    emailError.textContent = "Enter Valid Email ";
    isValid = false;
  } else {
    emailError.textContent = "";
    isValid = true;
  }
});
console.log(validateUsername("454as"));

function validatePassword(password: string): boolean {
  const regex =
    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{6,32}$/;
  return regex.test(password);
}

passwordInput.addEventListener("keyup", () => {
  let password: string = passwordInput.value.toString();
  //   console.log(password);
  if (!validatePassword(password)) {
    passwordError.textContent =
      "Password should be at least length of 6 (minimum one number,uppercase letter,lowercase letter ,symbol)";
    isValid = false;
  } else {
    passwordError.textContent = "";
    isValid = true;
  }
});

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isValid) {
  } else {
    alert("You have invalid input");
    return;
  }

  let username: string = nameInput.value.toString();
  let email: string = emailInput.value.toString();
  let password: string = passwordInput.value.toString();

  let userObjStr = localStorage.getItem("User");
  if (userObjStr) {
    let userObj = JSON.parse(userObjStr);
    let emailObj = JSON.parse(localStorage.getItem("Email")!);
    userObj[username] = {
      email: `${email}`,
      password: `${password}`,
      task: [],
    };
    emailObj[email] = `${username}`;
    localStorage.setItem("User", JSON.stringify(userObj));
    localStorage.setItem("Email", JSON.stringify(emailObj));
  } else {
    let userObj = {
      [username]: {
        email: `${email}`,
        password: `${password}`,
        task: [],
      },
    };
    let emailObj = {
      [email]: `${username}`,
    };
    console.log(emailObj, userObj);
    localStorage.setItem("User", JSON.stringify(userObj));
    localStorage.setItem("Email", JSON.stringify(emailObj));
  }
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 500);
  alert("Registration Successful");
});
