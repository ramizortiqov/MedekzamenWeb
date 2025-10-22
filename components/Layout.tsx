
import React, { useState } from 'react';
import type { User } from '../types';
import ExamView from './views/ExamView';
import MaterialsView from './views/MaterialsView';
import SummaryView from './views/SummaryView';
import ProfileView from './views/ProfileView';
import { ExamIcon, MaterialsIcon, SummaryIcon, ProfileIcon } from './icons/NavIcons';

type NavItem = 'exam' | 'materials' | 'summary' | 'profile';

interface LayoutProps {
    user: User;
    onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
    const [activeNav, setActiveNav] = useState<NavItem>('exam');

    const navItems = [
        { id: 'exam', label: 'Экзамен', icon: ExamIcon },
        { id: 'materials', label: 'Материалы', icon: MaterialsIcon },
        ...(user.course <= 3 ? [{ id: 'summary', label: 'Итог', icon: SummaryIcon }] : []),
        { id: 'profile', label: 'Кабинет', icon: ProfileIcon }
    ];

    const renderContent = () => {
        switch (activeNav) {
            case 'exam':
                return <ExamView user={user} />;
            case 'materials':
                return <MaterialsView user={user} />;
            case 'summary':
                return <SummaryView user={user} />;
            case 'profile':
                return <ProfileView user={user} onLogout={onLogout} />;
            default:
                return <ExamView user={user} />;
        }
    };
    
    const getHeaderTitle = () => {
      const item = navItems.find(i => i.id === activeNav);
      return item ? item.label : 'MedEkzamen';
    };

    return (
        <div className="flex flex-col h-screen font-sans">
             <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">{getHeaderTitle()}</h1>
                </div>
            </header>
            
            <main className="flex-grow overflow-y-auto pb-24 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto p-4">
                    {renderContent()}
                </div>
            </main>
            
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="max-w-4xl mx-auto flex justify-around">
                    {navItems.map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveNav(item.id as NavItem)}
                            className={`flex flex-col items-center justify-center w-full pt-3 pb-2 transition-colors duration-200 ${activeNav === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'}`}
                        >
                            <item.icon className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                             {activeNav === item.id && (
                                <div className="absolute bottom-0 h-1 w-12 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>
                             )}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
