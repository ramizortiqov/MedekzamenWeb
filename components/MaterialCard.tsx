
import React from 'react';
import type { Material } from '../types';
import { DocumentIcon, LinkIcon, VideoIcon } from './icons/ContentIcons';

interface MaterialCardProps {
    material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
    const renderContent = () => {
        switch (material.type) {
            case 'photo':
                return (
                    <div className="mt-2">
                        {material.file_name && <p className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{material.file_name}</p>}
                        <img src={material.file_id} alt={material.file_name || 'Material Image'} className="rounded-lg object-cover w-full" />
                    </div>
                );
            case 'video':
                return (
                    <div className="mt-2 flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <VideoIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">{material.file_name || 'Видео'}</p>
                            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                                Смотреть видео <LinkIcon className="h-4 w-4 ml-1" />
                            </a>
                        </div>
                    </div>
                );
            case 'document':
                 return (
                    <div className="mt-2 flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <DocumentIcon className="h-8 w-8 text-green-500 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">{material.file_name || 'Документ'}</p>
                            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                                Скачать файл <LinkIcon className="h-4 w-4 ml-1" />
                            </a>
                        </div>
                    </div>
                );
            case 'text':
            default:
                return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-4 transition-transform hover:scale-[1.02] duration-300">
            {material.caption && <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{material.caption}</p>}
            {renderContent()}
        </div>
    );
};

export default MaterialCard;
