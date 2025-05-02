// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Save, UploadCloud } from "lucide-react";

// // Define user data structure to avoid 'any' issues
// interface UserData {
//   fullName: string;
//   username: string;
//   email: string;
//   age: string;
//   gender: string;
//   contactNumber: string;
//   medicalHistory: string;
//   profilePicture: string;
// }

// const Profile: React.FC = () => {
//   const navigate = useNavigate();

//   // Load user data from localStorage with proper typing
//   const getStoredUser = (): UserData =>
//     JSON.parse(localStorage.getItem("user") || "{}") as UserData;

//   const [userData, setUserData] = useState<UserData>(getStoredUser);
//   const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
//     getStoredUser().profilePicture || null
//   );

//   // Reload data on mount
//   useEffect(() => {
//     setUserData(getStoredUser());
//   }, []);

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!userData.email) navigate("/login");
//   }, [navigate, userData.email]);

//   // Handle input field changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle profile picture upload
//   const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicPreview(reader.result as string);
//         setUserData((prev) => ({ ...prev, profilePicture: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Save profile to localStorage
//   const handleSave = () => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     alert("Profile updated successfully!");
//   };

//   // Reset profile
//   const handleReset = () => {
//     localStorage.removeItem("user");
//     setUserData({
//       fullName: "",
//       username: "",
//       email: "",
//       age: "",
//       gender: "male",
//       contactNumber: "",
//       medicalHistory: "",
//       profilePicture: "",
//     });
//     setProfilePicPreview(null);
//     alert("Profile reset to default!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-700 flex flex-col items-center justify-center py-20">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
//         <h2 className="text-3xl font-bold text-center text-purple-600 mb-8 flex items-center justify-center gap-2">
//           <User className="h-8 w-8" /> Profile Settings
//         </h2>

//         {/* Profile Picture Upload */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-100 shadow-lg transform transition-all duration-300 hover:scale-110">
//             <img
//               src={profilePicPreview || "https://via.placeholder.com/150"}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//             <label
//               htmlFor="profile-pic"
//               className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer opacity-0 hover:opacity-100 transition"
//             >
//               <UploadCloud className="text-white h-5 w-5" />
//             </label>
//           </div>
//           <input
//             id="profile-pic"
//             type="file"
//             accept="image/*"
//             onChange={handleProfilePicChange}
//             className="hidden"
//           />
//           <p className="text-sm text-gray-500 mt-2 text-center">Click to upload a profile picture</p>
//         </div>

//         {/* Form Fields */}
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={userData.fullName}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={userData.username}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               disabled
//               className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={userData.age}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//               <select
//                 name="gender"
//                 value={userData.gender}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
//               >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={userData.contactNumber}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
//             <textarea
//               name="medicalHistory"
//               rows={4}
//               value={userData.medicalHistory}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex gap-4">
//           <button
//             onClick={handleSave}
//             className="flex-1 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
//           >
//             <Save className="h-5 w-5" /> Save Changes
//           </button>
//           <button
//             onClick={handleReset}
//             className="flex-1 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition transform hover:scale-105"
//           >
//             Reset to Default
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Save, UploadCloud } from "lucide-react";

// Define user data structure to avoid 'any' issues
interface UserData {
  fullName: string;
  username: string;
  email: string;
  age: string;
  gender: string;
  contactNumber: string;
  medicalHistory: string;
  profilePicture: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Load user data from localStorage with proper typing
  const getStoredUser = (): UserData =>
    JSON.parse(localStorage.getItem("user") || "{}") as UserData;

  const [userData, setUserData] = useState<UserData>(getStoredUser);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    getStoredUser().profilePicture || null
  );

  // Reload data on mount
  useEffect(() => {
    setUserData(getStoredUser());
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!userData.email) navigate("/login");
  }, [navigate, userData.email]);

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
        setUserData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Profile updated successfully!");
  };

  // Reset profile
  const handleReset = () => {
    localStorage.removeItem("user");
    setUserData({
      fullName: "",
      username: "",
      email: "",
      age: "",
      gender: "male",
      contactNumber: "",
      medicalHistory: "",
      profilePicture: "",
    });
    setProfilePicPreview(null);
    alert("Profile reset to default!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8 flex items-center justify-center gap-2">
          <User className="h-8 w-8" /> Profile Settings
        </h2>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-100 shadow-lg transform transition-all duration-300 hover:scale-110">
            <img
              src={profilePicPreview || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="profile-pic"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer opacity-0 hover:opacity-100 transition"
            >
              <UploadCloud className="text-white h-5 w-5" />
            </label>
          </div>
          <input
            id="profile-pic"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
          <p className="text-sm text-gray-500 mt-2 text-center">Click to upload a profile picture</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={userData.contactNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
            <textarea
              name="medicalHistory"
              rows={4}
              value={userData.medicalHistory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition hover:border-purple-400"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            <Save className="h-5 w-5" /> Save Changes
          </button>
          <button
            onClick={handleReset}
            className="flex-1 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition transform hover:scale-105"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
