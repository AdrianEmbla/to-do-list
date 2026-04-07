import type { Route } from "./+types/home";
import ToDoList from "~/to-list-list/to-do-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <ToDoList />;
}
