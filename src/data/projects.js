import { QrCode, Globe, FileText, Dice5, Route, BrainCircuit, PlusCircle } from 'lucide-react'

export const projects = [
  {
    icon: QrCode,
    title: 'QR Code Generator',
    desc: 'A Python-based application that converts text, URLs, emails, or passwords into scannable QR codes. Features a clean interface with multiple output formats.',
    tech: ['Python', 'QR Libraries', 'CLI'],
    gh: 'https://github.com/Akshat-ak-hub',
  },
  {
    icon: Globe,
    title: 'Priya Public School Website',
    desc: 'A modern, responsive school website built with React and styled using Tailwind CSS. Features smooth animations with Framer Motion and is deployed on Vercel.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    gh: 'https://github.com/Akshat-ak-hub',
    live: 'https://priya-public-school.vercel.app/',
  },
  {
    icon: FileText,
    title: 'Online PDF Tool',
    desc: 'A comprehensive PDF processing utility built with HTML and JavaScript. Allows users to perform various operations on PDF files with a clean, intuitive interface.',
    tech: ['HTML', 'JavaScript', 'PDF Processing', 'Vercel'],
    gh: 'https://github.com/Akshat-ak-hub',
    live: 'https://pro-pdf.vercel.app/',
  },
  {
    icon: Dice5,
    title: 'Digital Dice Circuit',
    desc: 'An electronic dice simulator built using IC 555 timer and IC 4017 decade counter. Demonstrates understanding of digital electronics and IoT prototyping.',
    tech: ['Electronics', 'IoT', 'IC 555', 'IC 4017'],
    gh: 'https://github.com/Akshat-ak-hub',
  },
  {
    icon: Route,
    title: 'Dijkstra Algorithm Visualizer',
    desc: 'Interactive graph visualizer that demonstrates Dijkstra\'s shortest path algorithm step-by-step. Includes weighted nodes, visited path highlighting, and run controls.',
    tech: ['JavaScript', 'Graph Algorithms', 'Data Structures', 'Visualization'],
    gh: 'https://github.com/Akshat-ak-hub',
    live: 'https://dijkstra-algorithm-nine.vercel.app/',
  },
  {
    icon: BrainCircuit,
    title: 'AlgoViz Alpha',
    desc: 'Comprehensive algorithm visualizer that demonstrates sorting, searching, tree traversals, graph algorithms, and pathfinding techniques through interactive animations, execution controls, and complexity insights.',
    tech: ['React.js', 'TypeScript', 'DSA', 'Graph Algorithms', 'Visualization'],
    gh: 'https://github.com/Akshat-ak-hub',
    live: 'https://algoviz-alpha.vercel.app/',
  },
]

export const ctaProject = {
  icon: PlusCircle,
  title: 'More Coming Soon',
  desc: 'Currently building more projects. Check my GitHub for the latest work.',
  gh: 'https://github.com/Akshat-ak-hub',
}