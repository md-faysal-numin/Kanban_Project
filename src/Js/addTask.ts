let isLoggedIn = sessionStorage.getItem("isLoggedIn");

function goToLogIn(): void {
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 500);
}

if (isLoggedIn) {
  let dashboardBtn =
    document.querySelector<HTMLButtonElement>(".dashboardBtn")!;
  let assignUser = document.querySelector<HTMLSelectElement>("#assign-user")!;

  let addTaskForm = document.querySelector<HTMLFormElement>("#addTaskForm")!;
  let taskTitle = document.querySelector<HTMLInputElement>("#task-title")!;
  let taskDescription =
    document.querySelector<HTMLInputElement>("#task-description")!;
  let section = document.querySelector<HTMLSelectElement>("#section")!;

  dashboardBtn.addEventListener("click", () => {
    window.location.href = "./board.html";
  });

  let userObjStr = localStorage.getItem("User");
  if (userObjStr) {
    let userObj = JSON.parse(userObjStr);
    // console.log(userObjStr);
    for (let k in userObj) {
      assignUser.innerHTML += `<option value="${k}">${k}</option>`;
    }
  }

  addTaskForm.addEventListener("submit", () => {
    // e.preventDefault();
    let tasksStr = localStorage.getItem("Tasks");
    if (tasksStr === null) {
      let obj = {};
      localStorage.setItem("Tasks", JSON.stringify(obj));
    }
    tasksStr = localStorage.getItem("Tasks")!;
    const tasksObj = JSON.parse(tasksStr);
    let id = Date.now();

    let assignedUsers: string[] = [];
    if (userObjStr) {
      let userObj = JSON.parse(userObjStr);
      for (let i = 0; i < assignUser.options.length; i++) {
        if (assignUser.options[i].selected) {
          let val = assignUser.options[i].value;
          assignedUsers.push(val);
          userObj[val].task.push(String(id));
        }
      }
      localStorage.setItem("User", JSON.stringify(userObj));
    }
    let sectionVal = section.value;
    tasksObj[id] = {
      title: `${taskTitle.value}`,
      description: `${taskDescription.value}`,
      assigned: `${assignedUsers}`,
      section: `${sectionVal}`,
      creator: `${isLoggedIn}`,
    };
    localStorage.setItem("Tasks", JSON.stringify(tasksObj));

    taskTitle.value = "";
    taskDescription.value = "";
    alert("Successfully added task");
  });
} else {
  goToLogIn();
}
