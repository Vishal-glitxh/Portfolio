"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

interface BlogPost {
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title: "Understanding Stochastic Gradient Descent (SGD) in Neural Nets",
    category: "Machine Learning",
    date: "July 15, 2026",
    readTime: "6 min read",
    summary: "A practical guide explaining mathematical weights adaptation, stochastic gradients steps, and optimization techniques inside deep neural network structures.",
    tags: ["ML", "Optimizers", "Python"],
  },
  {
    title: "Securing Node.js APIs: Threat Analysis & Protection",
    category: "Cybersecurity",
    date: "June 28, 2026",
    readTime: "8 min read",
    summary: "Auditing common express API vulnerabilities, setting rate-limiters, sanitizing database queries, and applying token authentication principles.",
    tags: ["Node.js", "Security", "Backend"],
  },
  {
    title: "Building Real-time Semantic Comparators with BERT Embeddings",
    category: "Artificial Intelligence",
    date: "May 14, 2026",
    readTime: "10 min read",
    summary: "How semantic similarity checkers compare sentences in multidimensional vector space, using transformer models and cosine distance algorithms.",
    tags: ["AI", "NLP", "BERT"],
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background glow orb */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase font-heading"
          >
            My Journal
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Technical Publications
          </motion.h3>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post, idx) => (
            <Card
              key={idx}
              glowColor={idx % 3 === 0 ? "blue" : idx % 3 === 1 ? "purple" : "cyan"}
              delay={idx * 0.08}
              className="flex flex-col h-full hover:scale-[1.02] duration-300"
            >
              {/* Card visual detail header */}
              <div className="w-full h-32 rounded-xl bg-slate-950/60 border border-slate-900/60 mb-5 relative overflow-hidden flex items-center justify-center font-mono text-[9px] text-slate-600 p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                {/* Visual tech lines simulation */}
                <div className="w-full space-y-1.5 opacity-60">
                  <div className="flex gap-2"><span className="text-cyan-500">import</span><span>torch</span></div>
                  <div className="flex gap-2"><span className="text-purple-400">class</span><span>NeuralOptimizer(nn.Module):</span></div>
                  <div className="flex gap-2"><span>  </span><span className="text-blue-400">def</span><span>__init__(self):</span></div>
                  <div className="flex gap-2"><span>    </span><span>super().__init__()</span></div>
                </div>
              </div>

              {/* Category, Date & Read Time */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-3">
                <span className="text-cyan-400">{post.category}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 flex-1">
                <h4 className="text-base md:text-lg font-extrabold text-white font-heading leading-tight group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm font-body leading-relaxed">
                  {post.summary}
                </p>
              </div>

              {/* Tags and Action */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-900 mt-6">
                <div className="flex gap-1.5">
                  {post.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => alert("Simulated: Navigating to read full blog article detail...")}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
                >
                  Read Article
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
