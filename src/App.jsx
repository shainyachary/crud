import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import UserEdit from "./UserEdit";
import UserCreate from "./UserCreate";

const App = () => {
  return (
    <div>
      <h1>React crud Operation</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path="/user/details/:id" element={<UserDetails />} />
          <Route path="/user/edituser/:uid" element={<UserEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
