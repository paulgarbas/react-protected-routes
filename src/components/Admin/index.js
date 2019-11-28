import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../Firebase/context';

const Admin = () => {
    const firebaseContext = useContext(FirebaseContext);

    const [users, setUsers] = useState({
        allUsers: [],
        loading: false
    });

    const { allUsers, loading } = users;

    useEffect(() => {
        setUsers({
            ...users,
            loading: true
        });

        firebaseContext.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key
            }));

            setUsers({
                users: usersList,
                loading: false
            });
        })

        return () => {
            firebaseContext.users().off();
        }
    }, [firebaseContext])

    
    const UserList = ({ users }) => {
        console.log(users);
        return (
            <ul>
                {users.map(user => (
                    <li key={user.uid}>
                        <span>
                            <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                            <strong>E-Mail:</strong> {user.email}
                        </span>
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                    </li>
                ))}
            </ul>
        )
    };

    return (
        <div>
            <h1>Admin</h1>
            {loading && <div>Loading...</div>}
            <UserList users={allUsers} />
        </div>
    )
};

export default Admin;
