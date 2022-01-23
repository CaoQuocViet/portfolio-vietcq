"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/projects/card";
import data from "../../../data.json";

export function ProjectsGrid() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch(`https://api.github.com/users/${data.githubUsername}/repos?sort=updated&per_page=50`);
                const allRepos = await response.json();
                
                // Filter and sort repos
                const filteredRepos = allRepos
                    .filter(repo => !repo.fork && repo.stargazers_count >= 0)
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                    .slice(0, 12);
                
                setRepos(filteredRepos);
                setLoading(false);

                // Stagger animation
                filteredRepos.forEach((_, index) => {
                    setTimeout(() => {
                        setVisibleItems(prev => [...prev, index]);
                    }, index * 100);
                });
            } catch (error) {
                console.error('Error fetching repos:', error);
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                    <span className="text-[rgb(var(--color-text-secondary))]">Loading projects...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-[rgb(var(--color-text-primary))] mb-6">
                        My
                        <span className="block bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h1>
                    <p className="text-xl text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
                        A collection of projects I've built, experiments I've tried, and ideas I've brought to life.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {repos.map((repo, index) => (
                        <div
                            key={repo.id}
                            className={`transition-all duration-700 ${
                                visibleItems.includes(index)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <Link href={repo.html_url} target="_blank">
                                <Card project={repo} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="text-center mt-20">
                    <div className="inline-flex items-center gap-4 p-6 bg-[rgb(var(--color-surface))]/80 backdrop-blur-xl border border-[rgb(var(--color-border))]/20 rounded-2xl shadow-xl">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-[rgb(var(--color-text-primary))]">View More on GitHub</p>
                            <p className="text-sm text-[rgb(var(--color-text-secondary))]">Explore my complete portfolio</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
