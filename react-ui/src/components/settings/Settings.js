import React, { useEffect, useState } from 'react';
import { 
  Link, BrowserRouter as Router, Switch, Route 
} from 'react-router-dom';

function Settings() {
  return (
    <div>
      <h1>Settings</h1> 

      {/* Pretty line to separate search/filter from profiles */}
      <hr class="solid"></hr>

      <div style={{
          display: "flex",
          paddingLeft: 20
        }}>
        <Link to= './profile_manage/ProfileManage'>
          <p className="paraLink"> 
            Manage Pet Profiles
          </p>       
        </Link>
      </div>
    </div>
  )
}

export default Settings