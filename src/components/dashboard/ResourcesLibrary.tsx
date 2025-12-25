"use client";

import { useState } from 'react';
import Link from 'next/link';
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

// Compact sidebar version of ResourcesLibrary
export default function ResourcesLibrary() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Simplified categories for sidebar
    const categories = ['All', 'Programming', 'Data Science', 'Design', 'Security'];

    const filteredResources = resources.filter(resource => {
        if (selectedCategory !== 'All' && resource.category !== selectedCategory) return false;
        return true;
    });

    // Limit to 5 items for compact view
    const displayedResources = filteredResources.slice(0, 5);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Documentation': return <FileText className="w-3.5 h-3.5" />;
            case 'Tutorial': return <Code className="w-3.5 h-3.5" />;
            case 'Video': return <Video className="w-3.5 h-3.5" />;
            case 'Article': return <BookOpen className="w-3.5 h-3.5" />;
            default: return <FileText className="w-3.5 h-3.5" />;
        }
    };

    return (
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-foreground">Resources</h3>
                <span className="text-[10px] text-muted-foreground">{filteredResources.length} items</span>
            </div>

            {/* Compact Filters */}
            <div className="flex gap-2 flex-wrap mb-4">
                {categories.slice(0, 4).map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-2 py-1 rounded-md text-[10px] transition-colors ${selectedCategory === category
                            ? 'bg-primary/20 text-primary font-medium'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Stacked List */}
            <div className="space-y-2">
                {displayedResources.map(resource => (
                    <a
                        key={resource.id}
                        href={`https://${resource.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group border border-transparent hover:border-border"
                    >
                        <div className={`p-1.5 rounded-md bg-muted text-muted-foreground group-hover:text-primary transition-colors`}>
                            {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs text-foreground truncate group-hover:text-primary transition-colors">
                                {resource.title}
                            </h4>
                            <p className="text-[10px] text-muted-foreground truncate">{resource.category} • {resource.type}</p>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                ))}
            </div>

            {/* View More Link */}
            <div className="mt-4 text-center">
                <Link href="/resources" className="text-xs text-primary hover:underline font-medium">
                    View Library
                </Link>
            </div>
        </div>
    );
}
