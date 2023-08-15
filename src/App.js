import LandingPage from "./Level1/LandingPage";
import NewPost from './Level1/NewPost';
import EditPost from './Level1/EditPost';
import ReadMore from './Level1/ReadMore';
import SignUp from './Level2/SignUp';
import SignIn from './Level2/SignIn';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from "./Level2/Profile";
import TopicsList from "./Level3/TopicsList";
import AllUsers from "./Level2/AllUsers";
import MyProfile from "./Level2/MyProfile";
import MembershipPage from "./Level3/MembershipPage";
import SavedLater from "./Level5/SavedLater";
import ListPage from "./Level5/Lists/ListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>
  },
  {
    path: "/addPost",
    element: <NewPost/>
  },
  {
    path:"/editPost/:id",
    element: <EditPost />
  },
  {
    path:"/readmore/:id",
    element:<ReadMore />
  },
  {
    path:"/signup",
    element:<SignUp />
  },
  {
    path:"/signin",
    element:<SignIn />
  },
  {
    path:"/profile/:id",
    element:<Profile/>
  },
  {
    path:"/alltopics",
    element:<TopicsList/>
  },
  {
    path:"/allusers",
    element:<AllUsers/>
  },
  {
    path:"/myprofile",
    element:<MyProfile/>
  },
  {
    path:"/membership",
    element:<MembershipPage />
  },
  {
    path:"/savedLater",
    element:<SavedLater />
  },
  {
    path:"/lists/:id",
    element:<ListPage />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
