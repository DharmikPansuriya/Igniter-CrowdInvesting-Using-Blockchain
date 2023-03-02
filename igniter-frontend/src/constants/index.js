import {
  home,
  createProject,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "Dashboard",
    imgUrl: home,
    link: "/",
  },
  {
    name: "Project",
    imgUrl: createProject,
    link: "/create-project",
  },
  // {
  //   name: "payment",
  //   imgUrl: payment,
  //   link: "/",
  //   disabled: true,
  // },
  // {
  //   name: "withdraw",
  //   imgUrl: withdraw,
  //   link: "/",
  //   disabled: true,
  // },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/profile",
  },
  // {
  //   name: "logout",
  //   imgUrl: logout,
  //   link: "/",
  //   disabled: true,
  // },
];
