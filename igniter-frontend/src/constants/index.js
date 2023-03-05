import {
  home,
  createProject,
  profile,
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
  {
    name: "Profile",
    imgUrl: profile,
    link: "/profile",
  },
];
