import React, { useEffect, useState } from 'react';
import { apiHelper } from '../utils/utils';
import UserCard from '../components/UserCard';

function Dashboard() {
    const [Users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        apiHelper.get("/api/admin/getUsers").then((res) => setUsers(res.data));
    };

    return (
        <div className="w-full px-4 md:px-10 lg:px-20 overflow-x-auto">
            <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base border-collapse">
                    <thead className="bg-gray-200">
                        <tr className="text-left text-gray-700">
                            <th className="p-3">ID</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3 hidden md:table-cell">Email</th>
                            <th className="p-3 hidden lg:table-cell">Contact</th>
                            <th className="p-3 hidden lg:table-cell">City</th>
                            <th className="p-3 hidden xl:table-cell">State</th>
                            <th className="p-3">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((items, i) => (
                            <UserCard key={i} items={items} fetchData={fetchData} i={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
