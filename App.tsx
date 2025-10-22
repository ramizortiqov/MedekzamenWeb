
import React, { useState, useEffect, useCallback } from 'react';
import type { User } from './types';
import { GROUPS, COURSES } from './constants';
import Layout from './components/Layout';

const RegistrationScreen: React.FC<{ onRegister: (user: User) => void }> = ({ onRegister }) => {
    const [course, setCourse] = useState<number | null>(null);
    const [group, setGroup] = useState<string | null>(null);
    const [step, setStep] = useState<'course' | 'group' | 'confirm'>('course');

    const handleRegister = () => {
        if (course && group) {
            onRegister({
                course,
                group,
                fullName: `Web User`,
                registeredAt: new Date().toISOString()
            });
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'course':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Выберите ваш курс</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {COURSES.map(c => (
                                <button key={c} onClick={() => { setCourse(c); setStep('group'); }} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{c}-курс</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'group':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Выберите вашу группу</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(GROUPS).map(([key, value]) => (
                                <button key={key} onClick={() => { setGroup(key); setStep('confirm'); }} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep('course')} className="mt-6 w-full text-center text-gray-600 dark:text-gray-400 hover:underline">Назад</button>
                    </div>
                );
            case 'confirm':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">Подтвердите выбор</h2>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner space-y-2 text-gray-700 dark:text-gray-200">
                            <p><strong>Курс:</strong> {course}-й</p>
                            <p><strong>Группа:</strong> {group && GROUPS[group]}</p>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-4 text-center">Ваш выбор окончателен и не может быть изменен в будущем.</p>
                        <button onClick={handleRegister} className="mt-6 w-full p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg">
                            ✅ Подтвердить
                        </button>
                        <button onClick={() => setStep('course')} className="mt-4 w-full text-center text-gray-600 dark:text-gray-400 hover:underline">Начать заново</button>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">Добро пожаловать в MedEkzamen!</h1>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('medekzamen_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('medekzamen_user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleRegister = useCallback((newUser: User) => {
        try {
            localStorage.setItem('medekzamen_user', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error("Failed to save user to localStorage", error);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('medekzamen_user');
        setUser(null);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Загрузка...</div>
            </div>
        );
    }
    
    if (!user) {
        return <RegistrationScreen onRegister={handleRegister} />;
    }

    return <Layout user={user} onLogout={handleLogout} />;
};

export default App;
