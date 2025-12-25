"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, X, ExternalLink } from "lucide-react";

type LearningResource = {
    id: string;
    title: string;
    platform: string;
    category: string;
    url: string;
    status: string;
};

export default function ResourcesPage() {
    const [resources, setResources] = useState<LearningResource[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingResource, setEditingResource] = useState<LearningResource | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        platform: "",
        category: "",
        url: "",
        status: "Active"
    });

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await fetch('/api/admin/resources');
            if (res.ok) {
                const data = await res.json();
                setResources(data);
            }
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingResource) {
                const res = await fetch('/api/admin/resources', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingResource.id, ...formData })
                });

                if (res.ok) {
                    await fetchResources();
                    resetForm();
                }
            } else {
                const res = await fetch('/api/admin/resources', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (res.ok) {
                    await fetchResources();
                    resetForm();
                }
            }
        } catch (error) {
            console.error('Failed to save resource:', error);
            alert('Failed to save resource');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;

        try {
            const res = await fetch(`/api/admin/resources?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                await fetchResources();
            }
        } catch (error) {
            console.error('Failed to delete resource:', error);
            alert('Failed to delete resource');
        }
    };

    const handleEdit = (resource: LearningResource) => {
        setEditingResource(resource);
        setFormData({
            title: resource.title,
            platform: resource.platform,
            category: resource.category,
            url: resource.url,
            status: resource.status
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            platform: "",
            category: "",
            url: "",
            status: "Active"
        });
        setEditingResource(null);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-200/70 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Learning Resource Aggregator</h1>
                        <p className="text-blue-200/60">Review and update external course links and materials</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Resource
                    </button>
                </div>

                <div className="grid gap-4">
                    {resources.map((resource) => (
                        <div key={resource.id} className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                                    <div className="flex gap-4 text-sm text-blue-200/50 mb-3">
                                        <span>Platform: <span className="text-white">{resource.platform}</span></span>
                                        <span>Category: <span className="text-white">{resource.category}</span></span>
                                        <a
                                            href={`https://${resource.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-primary hover:underline"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            {resource.url}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className={`px-3 py-1 rounded-full text-sm ${resource.status === 'Active'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-white/5 text-blue-200/60'
                                        }`}>
                                        {resource.status}
                                    </span>
                                    <button
                                        onClick={() => handleEdit(resource)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-blue-200/60 hover:text-white transition-colors"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(resource.id)}
                                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-2xl w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    {editingResource ? 'Edit Resource' : 'Add New Resource'}
                                </h2>
                                <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Resource Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        placeholder="e.g., Python for Beginners"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Platform *</label>
                                    <input
                                        type="text"
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        placeholder="e.g., Coursera, Udemy, YouTube"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Programming">Programming</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="AI/ML">AI/ML</option>
                                        <option value="Design">Design</option>
                                        <option value="Business">Business</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">URL *</label>
                                    <input
                                        type="text"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        placeholder="e.g., coursera.org/learn/python"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Status *</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                                    >
                                        {editingResource ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
