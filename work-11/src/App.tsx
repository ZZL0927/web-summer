import styles from "./App.module.scss";
import { useState } from "react";
import Todos from "./pages/Todos";
import Important from "./pages/Important";
import Finished from "./pages/Finished";
import { TodoProvider } from "./hooks/store";
import { NavLink, Routes, Route } from "react-router-dom";
import { ReactComponent as IconMenu } from "../src/assets/imgs/menu.svg";
import { ReactComponent as IconHome } from "../src/assets/imgs/home.svg";
import { ReactComponent as IconStar } from "../src/assets/imgs/star.svg";
import { ReactComponent as IconFinished } from "../src/assets/imgs/finished.svg";
import { ITodo } from "./libs/todo";
import Mask from "./component/Mask";
function App() {
  const [showMenu, setMenu] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showFooter, setFooter] = useState(false);
  const [todo, setTodo] = useState({
    id: "",
    content: "",
    star: false,
    finished: false,
  });
  return (
    <TodoProvider
      value={{ todos, showFooter, todo, setTodos, setFooter, setTodo }}
    >
      <div className={styles.App}>
        <div className={showMenu ? styles.menu : styles["close-menu"]}>
          <div className={styles.sider}>
            <div className={styles["sider-header"]}>
              <span
                onClick={() => {
                  setMenu((showMenu) => !showMenu);
                }}
              >
                <IconMenu />
              </span>
            </div>
            <NavLink
              to="/"
              onClick={() => {
                setMenu((showMenu) => !showMenu);
              }}
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
            >
              <IconHome />
              任务
            </NavLink>
            <NavLink
              to="/important"
              onClick={() => {
                setMenu((showMenu) => !showMenu);
              }}
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
            >
              <IconStar />
              重要
            </NavLink>
            <NavLink
              to="/finished"
              onClick={() => {
                setMenu((showMenu) => !showMenu);
              }}
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
            >
              <IconFinished />
              完成
            </NavLink>
          </div>
          <div
            className={styles.mask}
            onClick={() => {
              setMenu(false);
            }}
          ></div>
        </div>
        <header className={styles["content-header"]}>
          <span
            onClick={() => {
              setMenu(true);
            }}
          >
            <IconMenu />
          </span>
        </header>
        <div className={styles["content-body"]}>
          <Routes>
            <Route path="/" element={<Todos></Todos>}></Route>
            <Route path="/important" element={<Important></Important>}></Route>
            <Route path="/finished" element={<Finished></Finished>}></Route>
          </Routes>
        </div>
        <Mask />
      </div>
    </TodoProvider>
  );
}

export default App;
