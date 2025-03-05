'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UsersClient = () => {
  const [users, setUsers] = useState<{ id: string; password: string }[]>([]);
  const route = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('currentId')) {
      sessionStorage.setItem('toastMessage', '로그인이 필요합니다.');
      sessionStorage.setItem('toastType', 'error');
      route.push('/sign-in');
    }
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem('admin');
    setUsers(userData ? JSON.parse(userData) : []);
  }, []);

  const handleDelete = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('admin', JSON.stringify(updatedUsers));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">유저 목록</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-white">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-3 dark:text-white">아이디</th>
              <th className="border p-3 dark:text-white">비밀번호</th>
              <th className="border p-3 dark:text-white">삭제</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id} className="bg-white dark:bg-gray-500">
                  <td className="border p-3 dark:text-gray-200">{user.id}</td>
                  <td className="border p-3 dark:text-gray-200">{user.password}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center p-4 dark:text-gray-400">
                  등록된 유저가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default UsersClient