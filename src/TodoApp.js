import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from "react";
import { Checkbox, IconButton, Chip, LinearProgress, Tooltip, } from "@mui/material";
import { Delete, Add, CheckCircle, RadioButtonUnchecked, FilterList, DragIndicator, } from "@mui/icons-material";
// ─── Constants ────────────────────────────────────────────────────────────────
const PRIORITY_CONFIG = {
    low: {
        label: "Low",
        color: "text-emerald-400",
        dot: "bg-emerald-400",
    },
    medium: {
        label: "Med",
        color: "text-amber-400",
        dot: "bg-amber-400",
    },
    high: {
        label: "High",
        color: "text-rose-400",
        dot: "bg-rose-400",
    },
};
const FILTER_OPTIONS = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Done" },
];
// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateId = () => Math.random().toString(36).slice(2, 9);
const INITIAL_TODOS = [
    {
        id: generateId(),
        text: "Review pull request from the team",
        completed: false,
        priority: "high",
        createdAt: new Date(),
    },
    {
        id: generateId(),
        text: "Update component library to latest MUI version",
        completed: false,
        priority: "medium",
        createdAt: new Date(),
    },
    {
        id: generateId(),
        text: "Write unit tests for auth module",
        completed: true,
        priority: "high",
        createdAt: new Date(),
    },
    {
        id: generateId(),
        text: "Refactor legacy CSS to Tailwind",
        completed: false,
        priority: "low",
        createdAt: new Date(),
    },
];
function TodoItem({ todo, onToggle, onDelete }) {
    const pc = PRIORITY_CONFIG[todo.priority];
    return (_jsxs("div", { className: `
        group relative flex items-center gap-3 rounded-2xl px-4 py-3.5
        border transition-all duration-300 cursor-default
        ${todo.completed
            ? "bg-white/[0.03] border-white/5 opacity-50"
            : "bg-white/[0.06] border-white/10 hover:bg-white/[0.10] hover:border-white/20"}
      `, children: [_jsx(DragIndicator, { className: "text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab shrink-0", fontSize: "small" }), _jsx(Checkbox, { checked: todo.completed, onChange: () => onToggle(todo.id), icon: _jsx(RadioButtonUnchecked, { className: "text-white/30 hover:text-white/60 transition-colors", fontSize: "small" }), checkedIcon: _jsx(CheckCircle, { className: "text-emerald-400", fontSize: "small" }), sx: { padding: 0, flexShrink: 0 } }), _jsx("span", { className: `w-1.5 h-1.5 rounded-full shrink-0 ${pc.dot} ${todo.completed ? "opacity-40" : ""}` }), _jsx("span", { className: `flex-1 min-w-0 text-sm font-medium leading-relaxed tracking-wide transition-all duration-300 truncate ${todo.completed ? "line-through text-white/30" : "text-white/80"}`, children: todo.text }), _jsx("span", { className: `shrink-0 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${pc.color}`, children: pc.label }), _jsx(Tooltip, { title: "Delete", placement: "left", children: _jsx(IconButton, { onClick: () => onDelete(todo.id), size: "small", className: "shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 !text-white/30 hover:!text-rose-400", sx: { padding: "2px" }, children: _jsx(Delete, { fontSize: "small" }) }) })] }));
}
// ─── Main Component ───────────────────────────────────────────────────────────
export default function TodoApp() {
    const [todos, setTodos] = useState(INITIAL_TODOS);
    const [input, setInput] = useState("");
    const [priority, setPriority] = useState("medium");
    const [filter, setFilter] = useState("all");
    // ── Derived state ──────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        const sorted = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
        return sorted.filter((t) => {
            if (filter === "active")
                return !t.completed;
            if (filter === "completed")
                return t.completed;
            return true;
        });
    }, [todos, filter]);
    const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);
    const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;
    // ── Handlers ───────────────────────────────────────────────────────────────
    const addTodo = useCallback(() => {
        const trimmed = input.trim();
        if (!trimmed)
            return;
        setTodos((prev) => [
            {
                id: generateId(),
                text: trimmed,
                completed: false,
                priority,
                createdAt: new Date(),
            },
            ...prev,
        ]);
        setInput("");
    }, [input, priority]);
    const toggleTodo = useCallback((id) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }, []);
    const deleteTodo = useCallback((id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const clearCompleted = useCallback(() => {
        setTodos((prev) => prev.filter((t) => !t.completed));
    }, []);
    const handleKeyDown = (e) => {
        if (e.key === "Enter")
            addTodo();
    };
    // ── Render ─────────────────────────────────────────────────────────────────
    return (_jsxs("div", { className: "w-screen min-h-screen flex items-center justify-center p-6", style: {
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, #1a1025 0%, #0d0d12 60%, #080810 100%)",
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }, children: [_jsx("div", { className: "pointer-events-none fixed inset-0", style: {
                    background: "radial-gradient(circle 600px at 30% 20%, rgba(139,92,246,0.07) 0%, transparent 70%), radial-gradient(circle 400px at 80% 80%, rgba(52,211,153,0.05) 0%, transparent 70%)",
                } }), _jsxs("div", { className: "relative w-full max-w-lg", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-end justify-between mb-1", children: [_jsx("h1", { className: "text-4xl font-black tracking-tight text-white", style: { letterSpacing: "-0.03em" }, children: "My Tasks" }), _jsxs("span", { className: "text-sm text-white/30 font-medium mb-1", children: [completedCount, "/", todos.length, " done"] })] }), _jsx("div", { className: "mt-3", children: _jsx(LinearProgress, { variant: "determinate", value: progress, sx: {
                                        height: 3,
                                        borderRadius: 2,
                                        backgroundColor: "rgba(255,255,255,0.07)",
                                        "& .MuiLinearProgress-bar": {
                                            borderRadius: 2,
                                            background: "linear-gradient(90deg, #8b5cf6 0%, #34d399 100%)",
                                        },
                                    } }) })] }), _jsxs("div", { className: "mb-6 rounded-2xl bg-white/6 border border-white/10 p-1 flex gap-1", children: [_jsx("div", { className: "flex items-center px-2 gap-1.5", children: ["low", "medium", "high"].map((p) => (_jsx("button", { onClick: () => setPriority(p), className: `w-2.5 h-2.5 rounded-full transition-all duration-200 ring-2 ring-offset-1 ring-offset-transparent ${PRIORITY_CONFIG[p].dot} ${priority === p
                                        ? "ring-white/50 scale-125"
                                        : "ring-transparent opacity-40 hover:opacity-70"}`, title: PRIORITY_CONFIG[p].label }, p))) }), _jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: "Add a new task...", className: "flex-1 bg-transparent text-sm text-white/80 placeholder-white/20 outline-none py-3 px-1 tracking-wide", maxLength: 120 }), _jsx("button", { onClick: addTodo, disabled: !input.trim(), className: `
              flex items-center justify-center w-10 h-10 rounded-xl m-0.5
              transition-all duration-200 font-semibold
              ${input.trim()
                                    ? "bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-500/30 hover:scale-105 active:scale-95"
                                    : "bg-white/5 text-white/20 cursor-not-allowed"}
            `, children: _jsx(Add, { fontSize: "small" }) })] }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex gap-1 bg-white/4 rounded-xl p-1 border border-white/8", children: [_jsx(FilterList, { className: "text-white/20 ml-1 self-center", fontSize: "small" }), FILTER_OPTIONS.map((f) => (_jsx("button", { onClick: () => setFilter(f.value), className: `
                  px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200
                  ${filter === f.value
                                            ? "bg-white/12 text-white shadow-sm"
                                            : "text-white/35 hover:text-white/60"}
                `, children: f.label }, f.value)))] }), completedCount > 0 && (_jsx("button", { onClick: clearCompleted, className: "text-xs text-white/25 hover:text-rose-400 transition-colors tracking-wide font-medium", children: "Clear done" }))] }), _jsx("div", { className: "space-y-2", children: filtered.length === 0 ? (_jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "text-4xl mb-3 opacity-30", children: filter === "completed" ? "🎉" : "✦" }), _jsx("p", { className: "text-white/20 text-sm tracking-wide", children: filter === "completed"
                                        ? "Nothing completed yet"
                                        : filter === "active"
                                            ? "No active tasks"
                                            : "No tasks yet — add one above" })] })) : (filtered.map((todo) => (_jsx(TodoItem, { todo: todo, onToggle: toggleTodo, onDelete: deleteTodo }, todo.id)))) }), todos.length > 0 && (_jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsx("div", { className: "flex gap-2", children: ["low", "medium", "high"].map((p) => {
                                    const count = todos.filter((t) => t.priority === p && !t.completed).length;
                                    return count > 0 ? (_jsx(Chip, { label: `${count} ${PRIORITY_CONFIG[p].label}`, size: "small", sx: {
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "rgba(255,255,255,0.35)",
                                            fontSize: "0.65rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.06em",
                                            height: "22px",
                                            textTransform: "uppercase",
                                        } }, p)) : null;
                                }) }), _jsxs("span", { className: "text-xs text-white/15 font-medium tracking-widest uppercase", children: [todos.length - completedCount, " remaining"] })] }))] })] }));
}
