import React, { useEffect, useState } from 'react';

function Users() { 
    const [users, setUsers] = useState(false);
    const [user, setUser] = useState(false);

    // run when mounted
    useEffect(() => {
        getUsers();
    }, []);
    
    function getUsers() {
        fetch('/api/user')
            .then(res => res.json())
            .then((res) => {
                setUsers(res)
            });
    }

    const getUserByEmail = () => {
        let email = prompt('Enter user email');

        fetch('/api/user/' + email)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setUser(res)
                getUsers();
            });
    }

    const createUser = () => {
        let username = prompt('Enter username');
        let email = prompt('Enter email');
        let isAdmin = prompt('isAdmin');
        let isCreator = prompt('isCreator');
        let profilePicId = prompt('profilePicId');
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username,
                isAdmin,
                isCreator,
                profilePicId
            }),
        }

        console.log(requestOptions)

        fetch('/api/user/insert', requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setUser(res)
                getUsers();
            });
    }

    return (
        <div>
            <h1>USERS</h1>
            <button onClick={getUserByEmail}>Find user by email</button>
            <button onClick={createUser}>Add user</button>
            <br />
            <h3>data from DB:</h3>
            {users ? 
                users.map(user =>
                    <div>
                        {user.internal_user_id} {user.email} {user.username} {user.is_admin} {user.is_creator}
                    </div>) :
                'there is no user data available'}
            <h3>result from buttons: </h3> 
            {user ? user.map(data => <div>
                        {data.internal_user_id} {data.email} {data.username} {data.is_admin} {data.is_creator}
                    </div> ) :
                'there is no user found'}
        </div>
    );
}

export default Users;
