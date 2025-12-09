"use client";

import { useState } from 'react';
import { BookOpen, Code, Video, FileText, ExternalLink } from 'lucide-react';

type Resource = {
    id: string;
    title: string;
    type: 'Documentation' | 'Tutorial' | 'Video' | 'Article';
    category: string;
    url: string;
    description: string;
};

const resources: Resource[] = [
    // Programming
    { id: '1', title: 'MDN Web Docs', type: 'Documentation', category: 'Web Development', url: 'developer.mozilla.org', description: 'Comprehensive web development documentation' },
    { id: '2', title: 'freeCodeCamp', type: 'Tutorial', category: 'Web Development', url: 'freecodecamp.org', description: 'Free coding bootcamp with certifications' },
    { id: '3', title: 'JavaScript.info', type: 'Documentation', category: 'Programming', url: 'javascript.info', description: 'Modern JavaScript tutorial' },

    // Data Science
    { id: '4', title: 'Kaggle Learn', type: 'Tutorial', category: 'Data Science', url: 'kaggle.com/learn', description: 'Hands-on data science tutorials' },
    { id: '5', title: 'Python Documentation', type: 'Documentation', category: 'Programming', url: 'docs.python.org', description: 'Official Python documentation' },
    { id: '6', title: 'Towards Data Science', type: 'Article', category: 'Data Science', url: 'towardsdatascience.com', description: 'Data science articles and tutorials' },

    // Cloud & DevOps
    { id: '7', title: 'AWS Documentation', type: 'Documentation', category: 'Cloud', url: 'docs.aws.amazon.com', description: 'Official AWS documentation' },
    { id: '8', title: 'Docker Documentation', type: 'Documentation', category: 'DevOps', url: 'docs.docker.com', description: 'Official Docker documentation' },
    { id: '9', title: 'Kubernetes Docs', type: 'Documentation', category: 'DevOps', url: 'kubernetes.io/docs', description: 'Official Kubernetes documentation' },

    // Design
    { id: '10', title: 'Figma Learn', type: 'Tutorial', category: 'Design', url: 'figma.com/resources/learn-design', description: 'Design tutorials and resources' },
    { id: '11', title: 'Laws of UX', type: 'Article', category: 'Design', url: 'lawsofux.com', description: 'UX design principles' },

    // Security
    { id: '12', title: 'OWASP', type: 'Documentation', category: 'Security', url: 'owasp.org', description: 'Web application security resources' },
    { id: '13', title: 'HackTheBox', type: 'Tutorial', category: 'Security', url: 'hackthebox.com', description: 'Cybersecurity training platform' },

    // General
    { id: '14', title: 'GitHub Learning Lab', type: 'Tutorial', category: 'Programming', url: 'lab.github.com', description: 'Learn Git and GitHub' },
    { id: '15', title: 'Stack Overflow', type: 'Article', category: 'Programming', url: 'stackoverflow.com', description: 'Programming Q&A community' },
    { id: '16', title: 'Dev.to', type: 'Article', category: 'Programming', url: 'dev.to', description: 'Developer community and articles' },
];

export default function ResourcesLibrary() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedType, setSelectedType] = useState('All');

    const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];
    const types = ['All', 'Documentation', 'Tutorial', 'Video', 'Article'];

    const filteredResources = resources.filter(resource => {
        if (selectedCategory !== 'All' && resource.category !== selectedCategory) return false;
        if (selectedType !== 'All' && resource.type !== selectedType) return false;
        return true;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Documentation': return <FileText className="w-4 h-4" />;
            case 'Tutorial': return <Code className="w-4 h-4" />;
            case 'Video': return <Video className="w-4 h-4" />;
            case 'Article': return <BookOpen className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Documentation': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
            case 'Tutorial': return 'text-green-400 bg-green-500/10 border-green-500/30';
            case 'Video': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
            case 'Article': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Learning Resources</h3>
                <span className="text-sm text-gray-400">{filteredResources.length} resources</span>
            </div>

            {/* Filters */}
            <div className="space-y-3 mb-6">
                <div>
                    <p className="text-xs text-gray-400 mb-2">Category</p>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedCategory === category
                                        ? 'bg-primary/20 text-primary border border-primary'
                                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-400 mb-2">Type</p>
                    <div className="flex gap-2 flex-wrap">
                        {types.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedType === type
                                        ? 'bg-primary/20 text-primary border border-primary'
                                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map(resource => (
                    <a
                        key={resource.id}
                        href={`https://${resource.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg border ${getTypeColor(resource.type)}`}>
                                    {getTypeIcon(resource.type)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                        {resource.title}
                                    </h4>
                                    <p className="text-xs text-gray-400">{resource.category}</p>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{resource.description}</p>
                    </a>
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                    <p className="text-gray-400">No resources found for the selected filters</p>
                </div>
            )}
        </div>
    );
}
