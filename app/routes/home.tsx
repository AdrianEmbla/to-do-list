import ToDoList from "~/components/to-do-list";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "To-Do List" },
    { name: "description", content: "To-Do List" },
  ];
}

export default function Home() {
  return <ToDoList />;
}
