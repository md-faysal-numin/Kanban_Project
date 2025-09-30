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

  let editTaskForm = document.querySelector<HTMLFormElement>("#editTaskForm")!;
  let taskTitle = document.querySelector<HTMLInputElement>("#task-title")!;
  let taskDescription =
    document.querySelector<HTMLInputElement>("#task-description")!;
  let section = document.querySelector<HTMLSelectElement>("#section")!;

  dashboardBtn.addEventListener("click", () => {
    localStorage.removeItem("Edit");
    window.location.href = "./board.html";
  });

  let editId = localStorage.getItem("Edit")!;
  let taskObjStr = localStorage.getItem("Tasks")!;
  if (taskObjStr) {
    let taskObj = JSON.parse(taskObjStr);

    taskTitle.value = taskObj[editId].title;
    taskDescription.value = taskObj[editId].description;

    let selectedSection = taskObj[editId].section;
    for (let i = 0; i < section.options.length; i++) {
      if (section.options[i].value === selectedSection) {
        section.options[i].selected = true;
      }
    }

    let assignedUserList = taskObj[editId].assigned.split(",");

    let userObjStr = localStorage.getItem("User")!;
    let userObj = JSON.parse(userObjStr);
    for (let k in userObj) {
      let x: boolean = true;
      for (let j of assignedUserList) {
        if (j === k) {
          assignUser.innerHTML += `<option value="${k}" selected>${k}</option>`;
          x = false;
          break;
        }
      }
      if (x) {
        assignUser.innerHTML += `<option value="${k}">${k}</option>`;
      }
    }

    let creator = taskObj[editId].creator;
    if (isLoggedIn !== creator) {
      taskTitle.disabled = true;
      taskDescription.disabled = true;
      assignUser.disabled = true;
    }
  }

  editTaskForm.addEventListener("submit", (e) => {
    // e.preventDefault();
    // localStorage.removeItem("Edit");
    let taskObj = JSON.parse(taskObjStr);
    taskObj[editId].section = `${section.value}`;
    taskObj[editId].title = `${taskTitle.value}`;
    taskObj[editId].description = `${taskDescription.value}`;

    let userObjStr = localStorage.getItem("User")!;
    let userObj = JSON.parse(userObjStr);

    let deleteTaskUsers = taskObj[editId].assigned.split(",");
    // console.log(deleteTaskUsers);
    for (let i = 0; i < deleteTaskUsers.length; i++) {
      let user = deleteTaskUsers[i];
      userObj[user].task = userObj[user].task.filter(
        (cur: string) => cur !== editId
      );
    }
    // console.log(userObj);

    let assignedUsersList: string[] = [];
    for (let i = 0; i < assignUser.options.length; i++) {
      if (assignUser.options[i].selected) {
        let val = assignUser.options[i].value;
        assignedUsersList.push(val);
        userObj[val].task.push(String(editId));
      }
    }
    taskObj[editId].assigned = `${assignedUsersList}`;

    localStorage.setItem("User", JSON.stringify(userObj));
    localStorage.setItem("Tasks", JSON.stringify(taskObj));

    alert("Successfully Edited task");
  });
} else {
  goToLogIn();
}
