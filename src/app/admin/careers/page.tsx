"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, X } from "lucide-react";

type CareerPath = {
    id: string;
    title: string;
    category: string;
    demand: string;
    avgSalary: string;
    description?: string;
};

export default function CareerPathManagementPage() {
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPath, setEditingPath] = useState<CareerPath | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        demand: "Medium",
        avgSalary: "",
        description: ""
    });

    useEffect(() => {
        fetchCareerPaths();
    }, []);

    const fetchCareerPaths = async () => {
        try {
            const res = await fetch('/api/admin/career-paths');
            if (res.ok) {
                const data = await res.json();
                setCareerPaths(data);
            }
        } catch (error) {
            console.error('Failed to fetch career paths:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingPath) {
                // Update existing
                const res = await fetch('/api/admin/career-paths', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingPath.id, ...formData })
                });

                if (res.ok) {
                    await fetchCareerPaths();
                    resetForm();
                }
            } else {
                // Create new
                const res = await fetch('/api/admin/career-paths', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (res.ok) {
                    await fetchCareerPaths();
                    resetForm();
                }
            }
        } catch (error) {
            console.error('Failed to save career path:', error);
            alert('Failed to save career path');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this career path?')) return;

        try {
            const res = await fetch(`/api/admin/career-paths?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                await fetchCareerPaths();
            }
        } catch (error) {
            console.error('Failed to delete career path:', error);
            alert('Failed to delete career path');
        }
    };

    const handleEdit = (path: CareerPath) => {
        setEditingPath(path);
        setFormData({
            title: path.title,
            category: path.category,
            demand: path.demand,
            avgSalary: path.avgSalary,
            description: path.description || ""
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            category: "",
            demand: "Medium",
            avgSalary: "",
            description: ""
        });
        setEditingPath(null);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Career Path Management</h1>
                        <p className="text-gray-400">Add, edit, or delete career paths that users will see</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Career Path
                    </button>
                </div>

                <div className="grid gap-4">
                    {careerPaths.map((career) => (
                        <div key={career.id} className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{career.title}</h3>
                                    {career.description && (
                                        <p className="text-gray-400 text-sm mb-3">{career.description}</p>
                                    )}
                                    <div className="flex gap-4 text-sm text-gray-400">
                                        <span>Category: <span className="text-white">{career.category}</span></span>
                                        <span>Demand: <span className={career.demand === 'High' ? 'text-green-400' : 'text-yellow-400'}>{career.demand}</span></span>
                                        <span>Avg Salary: <span className="text-white">{career.avgSalary}</span></span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(career)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(career.id)}
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
                        <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    {editingPath ? 'Edit Career Path' : 'Add New Career Path'}
                                </h2>
                                <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Category *</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        placeholder="e.g., Technology, Business, Design"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Demand *</label>
                                    <select
                                        value={formData.demand}
                                        onChange={(e) => setFormData({ ...formData, demand: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Average Salary *</label>
                                    <input
                                        type="text"
                                        value={formData.avgSalary}
                                        onChange={(e) => setFormData({ ...formData, avgSalary: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        placeholder="e.g., $120k"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none resize-none"
                                        rows={3}
                                        placeholder="Brief description of this career path"
                                    />
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
                                        {editingPath ? 'Update' : 'Create'}
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
