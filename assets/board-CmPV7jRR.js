import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */let d=sessionStorage.getItem("isLoggedIn");function S(){setTimeout(()=>{window.location.href="./login.html"},500)}function T(i){let a=localStorage.getItem("User"),g=localStorage.getItem("Tasks"),f=document.querySelector("#todoTasks"),b=document.querySelector("#inProgressTasks"),y=document.querySelector("#testingTasks"),L=document.querySelector("#finishedTasks"),h=document.querySelector("#username");if(h.textContent=`Username: ${i}`,a){let o=JSON.parse(a),t=[...o[i].task];if(g){let s=JSON.parse(g);for(let e=0;e<t.length;e++){let v=s[t[e]].title,I=s[t[e]].description,c=s[t[e]].assigned.split(","),u=document.createElement("div");u.className="task";let k="";for(let l=0;l<c.length;l++)k+=`<option value="${c[l]}">${c[l]}</option>`;u.innerHTML=`
        
                            <div class="task-detail">
                            <h4 class="task-title">
                            Title: <span class="task-explain">${v}</span>
                            </h4>
                            <p class="description">
                            Description :
                            <span class="task-explain"
                            >${I}
                            </span>
                            </p>
                            <label>Assigned for :</label>
                            <select class="assginedList">${k}</select>
                            <p class="creator">
                            Task Created By: <span class="creatorName">${s[t[e]].creator}</span>
                            </p>
                            </div>
                            <div class="task-btn">
          
                            <button class="btn editBtn data-id="${t[e]}">Edit</button>
                            <button class="btn deleteBtn" data-id="${t[e]}">Delete</button>
                            </div>
                            </div>   `;let B=s[t[e]].section;document.querySelector(`#${B}`).appendChild(u);let E=document.querySelector(".editBtn"),m=document.querySelector(".deleteBtn"),r=m.dataset.id.toString();m.addEventListener("click",()=>{let l=s[r].assigned.split(",");for(let n=0;n<l.length;n++){let p=l[n];o[p].task=o[p].task.filter(q=>q!==r)}localStorage.setItem("User",JSON.stringify(o));const O=Object.fromEntries(Object.entries(s).filter(([n])=>n!==r));localStorage.setItem("Tasks",JSON.stringify(O)),f.innerHTML="",b.innerHTML="",y.innerHTML="",L.innerHTML="",d&&T(d),alert("Deleted Successfully")}),E.addEventListener("click",()=>{localStorage.setItem("Edit",r),setTimeout(()=>{window.location.href="editTask.html"},300)})}}}}if(d){T(d);let i=document.querySelector(".addBtn"),a=document.querySelector(".logoutBtn");i.addEventListener("click",()=>{window.location.href="./addTask.html"}),a.addEventListener("click",()=>{sessionStorage.removeItem("isLoggedIn"),S()})}else S();
