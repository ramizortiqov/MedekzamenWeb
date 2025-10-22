
import React from 'react';
import type { User } from '../../types';
import { GROUPS } from '../../constants';
import { LinkIcon } from '../icons/ContentIcons';

interface ProfileViewProps {
    user: User;
    onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">👤 Личный кабинет</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p><strong>Курс:</strong> {user.course}-й</p>
                    <p><strong>Группа:</strong> {GROUPS[user.group] || user.group}</p>
                    <p><strong>Зарегистрирован:</strong> {new Date(user.registeredAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">🔗 Полезные ссылки</h3>
                <a href="https://study.tj/" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-between w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Открыть study.tj</span>
                    <LinkIcon className="h-5 w-5 text-gray-500" />
                </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">✉️ Обратная связь</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Есть предложения или нашли ошибку? Свяжитесь с нами.</p>
                <a href="https://t.me/parviz_medik" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-center w-full p-4 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                    Написать администратору
                </a>
            </div>

            <div className="pt-4">
                <button
                    onClick={onLogout}
                    className="w-full p-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors shadow-lg"
                >
                    Сбросить регистрацию и выйти
                </button>
            </div>
        </div>
    );
};

export default ProfileView;
