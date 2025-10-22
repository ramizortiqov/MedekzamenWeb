
import React, { useState } from 'react';
import type { User, Material } from '../../types';
import { getMaterialsByTag } from '../../services/materialService';
import MaterialCard from '../MaterialCard';

interface MaterialsViewProps {
    user: User;
}

const materialTypes = [
    { label: "📖 Лекции", tag: "lecture" },
    { label: "🔬 Практика", tag: "practice" },
    { label: "🎥 Видео", tag: "video" },
];

const MaterialsView: React.FC<MaterialsViewProps> = ({ user }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectTag = (tag: string) => {
        setIsLoading(true);
        setSelectedTag(tag);
        setTimeout(() => { // Simulate network delay
            const fetchedMaterials = getMaterialsByTag(tag, user);
            setMaterials(fetchedMaterials);
            setIsLoading(false);
        }, 300);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Выберите тип материалов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {materialTypes.map(type => (
                    <button
                        key={type.tag}
                        onClick={() => handleSelectTag(type.tag)}
                        className={`p-5 text-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${selectedTag === type.tag ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}
                    >
                        <span className="text-lg font-semibold">{type.label}</span>
                    </button>
                ))}
            </div>

            {selectedTag && (
                <div>
                    {isLoading ? (
                        <p className="text-center text-gray-600 dark:text-gray-300">Загрузка материалов...</p>
                    ) : materials.length > 0 ? (
                        materials.map(mat => <MaterialCard key={mat.id} material={mat} />)
                    ) : (
                         <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300">📚</p>
                            <p className="text-gray-600 dark:text-gray-300">Материалы этого типа еще не добавлены.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MaterialsView;
