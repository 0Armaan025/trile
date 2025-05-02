"use client";
import React, { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Plus, Edit, X, Mail, Tag, Calendar, ChevronDown, Users, AlertCircle } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Sample data - in a real app, you'd fetch this
const sampleTasks = [
    { id: 1, title: "Design wireframes", description: "Create initial UI mockups", status: "todo", assignee: "Alex Kim", dueDate: "2025-05-10" },
    { id: 2, title: "Set up database schema", description: "Design tables and relationships", status: "todo", assignee: "Jamie Lopez", dueDate: "2025-05-12" },
    { id: 3, title: "Create API endpoints", description: "Implement RESTful services", status: "in-progress", assignee: "Taylor Swift", dueDate: "2025-05-15" },
    { id: 4, title: "Implement auth flow", description: "Add login and registration", status: "in-progress", assignee: "Sam Chen", dueDate: "2025-05-18" },
    { id: 5, title: "Write unit tests", description: "Ensure code coverage", status: "done", assignee: "Jordan Smith", dueDate: "2025-05-08" },
];

const ItemTypes = {
    TASK: 'task',
    COLUMN: 'column'
};

interface ProjectPageProps {
    priority?: string;
    startDate?: string;
    endDate?: string;
    tags?: string[];
    members?: string[];
}

// Task Card Component with Drag and Drop
const TaskCard = ({ task, onMoveTask, onEditTask }: any) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag as any}
            className={`bg-[#2d2b4a] p-3 rounded-lg cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => onEditTask(task)}
        >
            <h4 className="text-white font-medium">{task.title}</h4>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{task.description}</p>
            <div className="flex justify-between items-center mt-3">
                <p className="text-gray-400 text-sm">Assigned to: {task.assignee}</p>
                <p className="text-gray-400 text-xs">{task.dueDate}</p>
            </div>
        </div>
    );
};

// Task Column Component with Drop Target
const TaskColumn = ({ title, tasks, status, color, onMoveTask, onEditTask }: any) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: any) => onMoveTask(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop as any}
            className={`bg-[#0f0f18a2] rounded-xl p-4 ${isOver ? 'bg-opacity-80 border border-dashed border-indigo-500' : ''}`}
        >
            <h3 className="text-white font-medium mb-4 flex items-center">
                <div className={`w-2 h-2 rounded-full ${color} mr-2`}></div>
                {title} ({tasks.length})
            </h3>

            <div className="space-y-3">
                {tasks.map((task: any) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onMoveTask={onMoveTask}
                        onEditTask={onEditTask}
                    />
                ))}

                {tasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1927] rounded-lg w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-[#2d2b4a]">
                    <h3 className="text-white font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Dropdown Component
const Dropdown = ({ label, options, value, onChange, className = "" }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#2d2b4a] text-white px-3 py-2 rounded-md flex items-center justify-between w-full"
            >
                <span>{value || label}</span>
                <ChevronDown size={16} className={isOpen ? "transform rotate-180" : ""} />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#2d2b4a] border border-[#3d3b5a] rounded-md shadow-lg">
                    {options.map((option: any, index: any) => (
                        <div
                            key={index}
                            className="px-3 py-2 hover:bg-[#3d3b5a] cursor-pointer text-white"
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ProjectPage = ({
    priority = "Low",
    startDate = "N/A",
    endDate = "N/A",
    tags = ["Development", "Frontend"],
    members = ["Alex Kim", "Jamie Lopez", "Taylor Swift", "Sam Chen", "Jordan Smith"]
}: ProjectPageProps) => {
    const pathname = usePathname().split("/")[2];
    const [tasks, setTasks] = useState(sampleTasks);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [projectName, setProjectName] = useState(pathname);
    const [currentPriority, setCurrentPriority] = useState(priority);
    const [currentTags, setCurrentTags] = useState(tags);
    const [currentMembers, setCurrentMembers] = useState(members);
    const [newTag, setNewTag] = useState("");
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [statusOrder, setStatusOrder] = useState(["todo", "in-progress", "done"]);

    // Filter tasks based on search query
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group tasks by status
    const todoTasks = filteredTasks.filter(task => task.status === "todo");
    const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress");
    const doneTasks = filteredTasks.filter(task => task.status === "done");

    const resetTaskForm = () => {
        setCurrentTask({
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            title: "",
            description: "",
            status: "todo",
            assignee: "",
            dueDate: ""
        });
    };

    const handleAddTask = () => {
        resetTaskForm();
        setShowTaskModal(true);
    };

    const handleEditTask = (task: any) => {
        setCurrentTask({ ...task });
        setShowTaskModal(true);
    };

    const handleSaveTask = () => {
        if (!currentTask.title) return;

        if (tasks.some(task => task.id === currentTask.id)) {
            // Update existing task
            setTasks(
                tasks.map(task =>
                    task.id === currentTask.id ? currentTask : task
                )
            );
        } else {
            // Add new task
            setTasks([...tasks, currentTask]);
        }

        setShowTaskModal(false);
    };

    const handleMoveTask = (taskId: any, newStatus: any) => {
        setTasks(
            tasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    const handleDeleteTask = () => {
        if (!currentTask) return;

        setTasks(tasks.filter(task => task.id !== currentTask.id));
        setShowTaskModal(false);
    };

    const handleAddTag = () => {
        if (newTag && !currentTags.includes(newTag)) {
            setCurrentTags([...currentTags, newTag]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: any) => {
        setCurrentTags(currentTags.filter(tag => tag !== tagToRemove));
    };

    const handleInviteMember = () => {
        // In a real app, you would send an email invitation
        // This is just frontend simulation
        if (newMemberEmail && !currentMembers.includes(newMemberEmail)) {
            setCurrentMembers([...currentMembers, newMemberEmail]);
            setNewMemberEmail("");
            setShowEmailModal(false);
        }
    };

    const getPriorityColor = (priority: any) => {
        if (priority === undefined) {
            return "";
        }
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-red-600';
            case 'medium':
                return 'bg-yellow-500';
            case 'low':
                return 'bg-green-500';
            default:
                return 'bg-blue-500';
        }
    };

    const moveColumn = (dragIndex: any, hoverIndex: any) => {
        const newOrder = [...statusOrder];
        const [movedItem] = newOrder.splice(dragIndex, 1);
        newOrder.splice(hoverIndex, 0, movedItem);
        setStatusOrder(newOrder);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col w-full max-w-screen-2xl mx-auto">
                {/* Top Banner with Project Name */}
                <div className="top-banner flex flex-col justify-between w-full h-40 p-6 bg-gradient-to-br from-[#0e0d33] from-25% to-95% to-[#08071d] rounded-t-3xl">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <p className="text-gray-400 text-sm">projects/</p>
                            {isEditing ? (
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        className="ml-1 bg-[#1a1927] text-white px-2 py-1 rounded"
                                    />
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="ml-2 bg-[#2d2b4a] text-white px-2 py-1 rounded text-sm"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm ml-1">{projectName}</p>
                            )}
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-[#2d2b4a] text-white px-3 py-1 rounded-md flex items-center"
                        >
                            <Edit size={16} className="mr-1" /> Edit
                        </button>
                    </div>

                    <h1 className="text-white text-3xl font-bold mt-4">{projectName}</h1>
                </div>

                {/* Project Details & Kanban Board Container */}
                <div className="w-full bg-[#1a1927] p-6 backdrop-blur-md rounded-b-3xl">
                    {/* Project Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#0f0f18a2] p-4 rounded-xl">
                            <label className="text-gray-300 text-sm mb-2 flex items-center justify-between">
                                <span>Priority</span>
                                <button
                                    onClick={() => { }}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <Edit size={14} />
                                </button>
                            </label>
                            <Dropdown
                                label="Select Priority"
                                options={["Low", "Medium", "High"]}
                                value={currentPriority}
                                onChange={setCurrentPriority}
                            />
                            <div className={`${getPriorityColor(currentPriority)} px-3 py-1 mt-2 rounded-md text-white text-center`}>
                                {currentPriority}
                            </div>
                        </div>

                        <div className="bg-[#0f0f18a2] p-4 rounded-xl">
                            <label className="text-gray-300 text-sm">Timeline</label>
                            <div className="text-white mt-1 flex items-center justify-between">
                                <p>{startDate} → {endDate}</p>
                                <button className="text-gray-400 hover:text-white">
                                    <Calendar size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0f0f18a2] p-4 rounded-xl">
                            <label className="text-gray-300 text-sm flex items-center justify-between">
                                <span>Tags</span>
                                <button
                                    onClick={() => setShowTagModal(true)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <Tag size={14} />
                                </button>
                            </label>
                            <div className="flex flex-wrap mt-1">
                                {currentTags.map((tag, index) => (
                                    <div key={index} className="bg-[#2d2b4a] text-white px-2 py-1 m-1 text-xs rounded-md flex items-center">
                                        {tag}
                                        <button
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-1 text-gray-400 hover:text-white"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0f0f18a2] p-4 rounded-xl">
                            <label className="text-gray-300 text-sm flex items-center justify-between">
                                <span>Team Members</span>
                                <button
                                    onClick={() => setShowEmailModal(true)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <Users size={14} />
                                </button>
                            </label>
                            <div className="mt-1">
                                {currentMembers.map((member, index) => (
                                    <div key={index} className="text-white flex items-center py-1">
                                        <div className="w-6 h-6 rounded-full bg-[#2d2b4a] mr-2 flex items-center justify-center text-xs">
                                            {member.charAt(0).toUpperCase()}
                                        </div>
                                        {member}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Task Management Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white text-xl font-semibold">Tasks ({tasks.length})</h2>

                        <div className="flex gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-[#0f0f18a2] text-white pl-10 pr-4 py-2 rounded-lg w-64"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={handleAddTask}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                <Plus size={16} className="mr-2" /> Add Task
                            </button>
                        </div>
                    </div>

                    {/* Kanban Board */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TaskColumn
                            title="To Do"
                            tasks={todoTasks}
                            status="todo"
                            color="bg-blue-400"
                            onMoveTask={handleMoveTask}
                            onEditTask={handleEditTask}
                        />

                        <TaskColumn
                            title="In Progress"
                            tasks={inProgressTasks}
                            status="in-progress"
                            color="bg-yellow-400"
                            onMoveTask={handleMoveTask}
                            onEditTask={handleEditTask}
                        />

                        <TaskColumn
                            title="Done"
                            tasks={doneTasks}
                            status="done"
                            color="bg-green-400"
                            onMoveTask={handleMoveTask}
                            onEditTask={handleEditTask}
                        />
                    </div>
                </div>

                {/* Add/Edit Task Modal */}
                <Modal
                    isOpen={showTaskModal}
                    onClose={() => setShowTaskModal(false)}
                    title={currentTask && currentTask.id ? "Edit Task" : "Create New Task"}
                >
                    {currentTask && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={currentTask.title}
                                    onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                                    className="w-full bg-[#2d2b4a] text-white px-3 py-2 rounded-md"
                                    placeholder="Task title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={currentTask.description}
                                    onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                                    className="w-full bg-[#2d2b4a] text-white px-3 py-2 rounded-md h-24"
                                    placeholder="Task description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Status</label>
                                <Dropdown
                                    label="Select Status"
                                    options={["todo", "in-progress", "done"]}
                                    value={currentTask.status}
                                    onChange={(status: any) => setCurrentTask({ ...currentTask, status })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Assignee</label>
                                <Dropdown
                                    label="Select Assignee"
                                    options={currentMembers}
                                    value={currentTask.assignee}
                                    onChange={(assignee: any) => setCurrentTask({ ...currentTask, assignee })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={currentTask.dueDate}
                                    onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                                    className="w-full bg-[#2d2b4a] text-white px-3 py-2 rounded-md"
                                />
                            </div>

                            <div className="flex justify-between pt-2">
                                {currentTask.id && (
                                    <button
                                        onClick={handleDeleteTask}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                )}
                                <div className="flex space-x-2 ml-auto">
                                    <button
                                        onClick={() => setShowTaskModal(false)}
                                        className="bg-[#3d3b5a] hover:bg-[#4d4b6a] text-white px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveTask}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Add Tag Modal */}
                <Modal
                    isOpen={showTagModal}
                    onClose={() => setShowTagModal(false)}
                    title="Manage Tags"
                >
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="flex-1 bg-[#2d2b4a] text-white px-3 py-2 rounded-l-md"
                                placeholder="Add new tag"
                            />
                            <button
                                onClick={handleAddTag}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-r-md"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-white text-sm mb-2">Current Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {currentTags.map((tag, index) => (
                                    <div key={index} className="bg-[#2d2b4a] text-white px-3 py-1 rounded-md flex items-center">
                                        {tag}
                                        <button
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-2 text-gray-400 hover:text-white"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}

                                {currentTags.length === 0 && (
                                    <p className="text-gray-500 text-sm">No tags added yet</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                onClick={() => setShowTagModal(false)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Invite Member Modal */}
                <Modal
                    isOpen={showEmailModal}
                    onClose={() => setShowEmailModal(false)}
                    title="Invite Team Member"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                            <div className="flex items-center">
                                <div className="flex-1 relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="email"
                                        value={newMemberEmail}
                                        onChange={(e) => setNewMemberEmail(e.target.value)}
                                        className="w-full bg-[#2d2b4a] text-white pl-10 pr-4 py-2 rounded-l-md"
                                        placeholder="Enter email address"
                                    />
                                </div>
                                <button
                                    onClick={handleInviteMember}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md"
                                >
                                    Invite
                                </button>
                            </div>
                        </div>

                        <div className="bg-indigo-900 bg-opacity-30 p-3 rounded-md flex items-start">
                            <AlertCircle size={20} className="text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-300">
                                In a real application, this would send an email invitation to join the project.
                                For this demo, the member will be added directly to the team list.
                            </p>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-white text-sm mb-2">Current Team Members</h4>
                            <div className="max-h-40 overflow-y-auto space-y-1">
                                {currentMembers.map((member, index) => (
                                    <div key={index} className="text-white flex items-center py-1">
                                        <div className="w-6 h-6 rounded-full bg-[#2d2b4a] mr-2 flex items-center justify-center text-xs">
                                            {member.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="flex-1">{member}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setShowEmailModal(false)}
                                className="bg-[#3d3b5a] hover:bg-[#4d4b6a] text-white px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </DndProvider>
    );
};

export default ProjectPage;