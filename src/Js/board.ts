let isLoggedIn = localStorage.getItem("isLoggedIn");

function goToLogIn(): void {
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 500);
}

function load(username: string): void {
  let userObjStr = localStorage.getItem("User");

  let tasksObjStr = localStorage.getItem("Tasks");
  let todoTasks = document.querySelector<HTMLDivElement>("#todoTasks")!;
  let inProgressTasks =
    document.querySelector<HTMLDivElement>("#inProgressTasks")!;
  let testingTasks = document.querySelector<HTMLDivElement>("#testingTasks")!;
  let finishedTasks = document.querySelector<HTMLDivElement>("#finishedTasks")!;
  if (userObjStr) {
    let userObj = JSON.parse(userObjStr);
    let tasksId = [...userObj[username].task];

    if (tasksObjStr) {
      let tasksObj = JSON.parse(tasksObjStr);
      for (let i = 0; i < tasksId.length; i++) {
        let taskTitle = tasksObj[tasksId[i]].title;
        let taskDescription = tasksObj[tasksId[i]].description;
        // console.log(tasksObj[tasksId[i]].assigned);
        let assignedUserList = tasksObj[tasksId[i]].assigned.split(",");
        let username = isLoggedIn;
        let task = document.createElement("div");
        task.className = "task";
        let asd: any;
        for (let i = 0; i < assignedUserList.length; i++) {
          asd += `<option value="${assignedUserList[i]}">${assignedUserList[i]}</option>`;
        }
        task.innerHTML = `
        
                            <div class="task-detail">
                            <h4 class="task-title">
                            Title: <span class="task-explain">${taskTitle}</span>
                            </h4>
                            <p class="description">
                            Description :
                            <span class="task-explain"
                            >${taskDescription}
                            </span>
                            </p>
                            <label>Assigned for</label>
                            <select class="assginedList">${asd}</select>
                            <p class="creator">
                            Task Created By: <span class="creatorName">${username}</span>
                            </p>
                            </div>
                            <div class="task-btn">
          
                            <button class="btn editBtn data-id="${tasksId[i]}">Edit</button>
                            <button class="btn deleteBtn" data-id="${tasksId[i]}">Delete</button>
                            </div>
                            </div>   `;

        let section = tasksObj[tasksId[i]].section;
        let sectionEl = document.querySelector<HTMLDivElement>(`#${section}`)!;
        sectionEl.appendChild(task);

        let editBtn = document.querySelector<HTMLButtonElement>(".editBtn")!;
        let deleteBtn =
          document.querySelector<HTMLButtonElement>(".deleteBtn")!;
        // console.log(deleteBtn.dataset.id);

        deleteBtn.addEventListener("click", () => {
          let keyToRemove = deleteBtn.dataset.id!.toString();
          // console.log("hello", keyToRemove);
          // console.log(tasksObj[keyToRemove]);
          let deleteTaskUsers = tasksObj[keyToRemove].assigned.split(",");
          for (let i = 0; i < deleteTaskUsers.length; i++) {
            userObj[deleteTaskUsers[i]].task = userObj[
              deleteTaskUsers[i]
            ].task.map((cur: string) => cur !== keyToRemove);
          }
          localStorage.setItem("User", JSON.stringify(userObj));

          const newObject = Object.fromEntries(
            Object.entries(tasksObj).filter(([key]) => key !== keyToRemove)
          );
          // console.log(newObject);
          localStorage.setItem("Tasks", JSON.stringify(newObject));

          todoTasks.innerHTML = "";
          inProgressTasks.innerHTML = "";
          testingTasks.innerHTML = "";
          finishedTasks.innerHTML = "";
          if (isLoggedIn) {
            load(isLoggedIn);
          }
          alert("Deleted Successfully");
          return;
        });
      }
    }
  }
}

if (isLoggedIn) {
  load(isLoggedIn);

  let addBtn = document.querySelector<HTMLButtonElement>(".addBtn")!;
  let logoutBtn = document.querySelector<HTMLButtonElement>(".logoutBtn")!;

  addBtn.addEventListener("click", () => {
    window.location.href = "./addTask.html";
  });
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    goToLogIn();
  });
} else {
  goToLogIn();
}
