"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, X } from "lucide-react";

type Skill = {
    id: string;
    name: string;
    category: string;
    level: string;
};

export default function SkillDatabasePage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        level: "Beginner to Advanced"
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch('/api/admin/skills');
            if (res.ok) {
                const data = await res.json();
                setSkills(data);
            }
        } catch (error) {
            console.error('Failed to fetch skills:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingSkill) {
                const res = await fetch('/api/admin/skills', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingSkill.id, ...formData })
                });

                if (res.ok) {
                    await fetchSkills();
                    resetForm();
                }
            } else {
                const res = await fetch('/api/admin/skills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (res.ok) {
                    await fetchSkills();
                    resetForm();
                }
            }
        } catch (error) {
            console.error('Failed to save skill:', error);
            alert('Failed to save skill');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            const res = await fetch(`/api/admin/skills?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                await fetchSkills();
            }
        } catch (error) {
            console.error('Failed to delete skill:', error);
            alert('Failed to delete skill');
        }
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            category: skill.category,
            level: skill.level
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            category: "",
            level: "Beginner to Advanced"
        });
        setEditingSkill(null);
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
                        <h1 className="text-4xl font-bold mb-2">Skill Database Management</h1>
                        <p className="text-gray-400">Maintain skills, categories, and proficiency mappings</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Skill
                    </button>
                </div>

                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Skill Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Level</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {skills.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium">{skill.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                                                {skill.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{skill.level}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(skill)}
                                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(skill.id)}
                                                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-2xl w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                                </h2>
                                <button onClick={resetForm} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Skill Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                        placeholder="e.g., Python, React, Data Analysis"
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
                                        <option value="Framework">Framework</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Database">Database</option>
                                        <option value="Analytics">Analytics</option>
                                        <option value="AI/ML">AI/ML</option>
                                        <option value="Design">Design</option>
                                        <option value="Business">Business</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Proficiency Level *</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Intermediate to Advanced">Intermediate to Advanced</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Beginner to Advanced">Beginner to Advanced</option>
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
                                        {editingSkill ? 'Update' : 'Create'}
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
