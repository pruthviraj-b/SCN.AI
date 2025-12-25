
"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Star, ExternalLink, PlayCircle, Award, Box, FileText } from "lucide-react";
import { motion } from "framer-motion";

type ResourceCardProps = {
    resource: {
        id: string;
        title: string;
        type: string;
        description: string;
        skill_tags: string[];
        difficulty_level: string;
        estimated_time: string;
        provider: string;
        url: string;
        rating: number;
    };
};

const TypeIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'Video': return <PlayCircle className="w-4 h-4 text-red-400" />;
        case 'Certification': return <Award className="w-4 h-4 text-yellow-400" />;
        case 'Project': return <Box className="w-4 h-4 text-purple-400" />;
        case 'Article': return <FileText className="w-4 h-4 text-blue-400" />;
        default: return <BookOpen className="w-4 h-4 text-green-400" />;
    }
};

export default function ResourceCard({ resource }: ResourceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col justify-between bg-card hover:bg-card/80 border border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-300"
        >
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${resource.type === 'Video' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                resource.type === 'Certification' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                    resource.type === 'Project' ? 'bg-purple-500/10 border-purple-500/20 text-purple-500' :
                                        'bg-blue-500/10 border-blue-500/20 text-blue-500'
                            }`}>
                            {resource.type}
                        </span>
                        <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-muted text-muted-foreground border border-border">
                            {resource.difficulty_level}
                        </span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {resource.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {resource.description}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.estimated_time}
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {resource.rating}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-background border border-border">
                        <span className="font-semibold text-foreground">{resource.provider}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                    {resource.skill_tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary">
                            {tag}
                        </span>
                    ))}
                    {resource.skill_tags.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 text-muted-foreground">+{resource.skill_tags.length - 3}</span>
                    )}
                </div>
            </div>

            {/* Action */}
            <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group/btn"
            >
                <span className="text-sm font-semibold text-foreground group-hover/btn:text-primary">Start Learning</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary" />
            </a>
        </motion.div>
    );
}
