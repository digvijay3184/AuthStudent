import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isTeacher = user?.role === 'teacher';

  useEffect(() => {
    fetchData();
  }, [isTeacher]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Always fetch students list
      const studentsResponse = await api.get('/user/students');
      setStudents(studentsResponse.data);

      // If teacher, also fetch all users
      if (isTeacher) {
        const usersResponse = await api.get('/user');
        setAllUsers(usersResponse.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handlePromote = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to promote ${username} to Teacher?`)) {
      return;
    }

    try {
      await api.put(`/user/promote/${userId}`);
      setSuccessMessage(`Successfully promoted ${username} to Teacher`);
      fetchData(); // Refresh data
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to promote user');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete ${username}? This action cannot be undone.`)) {
      return;
    }

    try {
      await api.delete(`/user/${userId}`);
      setSuccessMessage(`Successfully deleted ${username}`);
      fetchData(); // Refresh data
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isTeacher ? 'Teacher Dashboard' : 'Student Dashboard'}
              </h1>
              <p className="text-sm text-gray-600">Welcome, {user?.username}!</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 px-4 py-2 rounded">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Students List - Visible to Everyone */}
            <section>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="bg-indigo-600 px-6 py-3">
                  <h2 className="text-lg font-semibold text-white">
                    Students ({students.length})
                  </h2>
                </div>
                <div className="p-6">
                  {students.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No students found</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {students.map((student) => (
                        <div
                          key={student.id}
                          className="p-4 bg-gray-50 rounded border border-gray-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                              {student.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{student.username}</p>
                              <p className="text-sm text-gray-500 capitalize">{student.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* All Users - Teacher Only */}
            {isTeacher && (
              <section>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="bg-purple-600 px-6 py-3">
                    <h2 className="text-lg font-semibold text-white">
                      All Users Management ({allUsers.length})
                    </h2>
                  </div>
                  <div className="p-6">
                    {allUsers.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No users found</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {allUsers.map((targetUser) => (
                              <tr key={targetUser.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                                      {targetUser.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {targetUser.username}
                                        {targetUser.id === user?.id && (
                                          <span className="ml-2 text-xs text-purple-600">(You)</span>
                                        )}
                                      </div>
                                      <div className="text-sm text-gray-500">ID: {targetUser.id}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    targetUser.role === 'teacher'
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {targetUser.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="flex space-x-2">
                                    {targetUser.role === 'student' && (
                                      <button
                                        onClick={() => handlePromote(targetUser.id, targetUser.username)}
                                        className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
                                      >
                                        Promote
                                      </button>
                                    )}
                                    {targetUser.id !== user?.id && (
                                      <button
                                        onClick={() => handleDelete(targetUser.id, targetUser.username)}
                                        className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
