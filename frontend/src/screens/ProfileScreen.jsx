import React, { useEffect, useState } from "react";
import { apiHelper } from "../utils/utils";
import { toast } from "react-toastify";

function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiHelper.get("/api/username")
      .then((res) => setUser(res.data))
      .catch(() => toast.error("Failed to load user data"));
  }, []);

  if (!user) {
    return <h1 className="text-center text-xl font-semibold">Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center pt-[12vh] p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 text-center w-full max-w-md">
        <img
          src={user.image}
          alt="User Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto border-4 border-green-500"
        />
        <h1 className="text-2xl font-semibold mt-4">
          {user.name}
        </h1>
        <p className="text-gray-600">{user.email}</p>

        {/* Profile Details */}
        <div className="mt-4 text-left">
          <p className="text-lg font-semibold">User Details:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Username:</strong> {user.username}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Role:</strong> {user.role || "User"}</li>
          </ul>
        </div>

        {/* Edit Button */}
        <button
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => toast.info("Edit Profile Coming Soon!")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileScreen;
