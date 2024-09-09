import './App.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import LandingPG from './Pages/LandingPG';
import NotFoundPG from './Pages/NotFoundPG';
import SignUpPG from './Pages/SignUpPG';

import HomePGU from './Pages/User/HomePGU';
import ListingsPGU from './Pages/User/ListingsPGU';
import MessagesPGU from './Pages/User/MessagesPGU';
import MyProfilePGU from './Pages/User/MyProfilePGU';
import ViewprofilePGU from './Pages/User/ViewprofilePGU';
import NetworkPGU from './Pages/User/NetworkPGU';

import AccountViewPGA from './Pages/Admin/AccountViewPGA';
import AdminDashboardPGA from './Pages/Admin/AdminDashboardPGA';
import NotificationsPGU from './Pages/User/NotificationsPGU';
import SettingsPGU from './Pages/User/SettingsPGU';
import SettingsPGA from './Pages/Admin/SettingsPGA';

function App() {  
  return (
   <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<LandingPG />}/>
            <Route path="user">
              <Route index element={<HomePGU />} />
              <Route path="listings" element={<ListingsPGU />} />
              <Route path="messages" element={<MessagesPGU />} />
              <Route path="profile" element={<MyProfilePGU />} />
              <Route path="viewprofile" element={<ViewprofilePGU />} />
              <Route path="network" element={<NetworkPGU />} />
              <Route path="notifications" element={<NotificationsPGU />} />
              <Route path="settings" element={<SettingsPGU />} />
            </Route>
            <Route path="admin" >
              <Route index element={<AdminDashboardPGA />} />
              <Route path="view" element={<AccountViewPGA />} />
              <Route path="settings" element={<SettingsPGA />} />
            </Route>
            <Route path="signup" element={<SignUpPG />} />
            <Route path="*" element={<NotFoundPG />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);