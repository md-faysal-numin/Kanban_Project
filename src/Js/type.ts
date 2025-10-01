type Email = {
  [key: string]: string;
};

type User = {
  [key: string]: UserInfo;
};
type UserInfo = {
  email: string;
  password: string;
  task: string[];
};

type TaskInfo = {
    title:string;
    description:string;
    assigned:string;
    section:string;
    creator:string;
}

type Task = {
    [key:string] : TaskInfo;
}



export type { Email, User ,Task};
