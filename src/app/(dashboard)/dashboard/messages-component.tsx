import { useState } from 'react';
import { Search, MoreVertical, CheckCircle } from 'lucide-react';

export const MessagesComponent = () => {
    // Sample data for messages
    const [messages, setMessages] = useState([
        {
            id: 1,
            name: 'Sarah Johnson',
            image: '/api/placeholder/40/40',
            lastMessage: 'Hey, are we still meeting for coffee tomorrow?',
            timestamp: '2:45 PM',
            date: 'Today',
            unread: true
        },
        {
            id: 2,
            name: 'David Miller',
            image: '/api/placeholder/40/40',
            lastMessage: 'I sent you the project files. Let me know what you think!',
            timestamp: '11:32 AM',
            date: 'Today',
            unread: true
        },
        {
            id: 3,
            name: 'Jessica Lee',
            image: '/api/placeholder/40/40',
            lastMessage: 'Thanks for your help yesterday.',
            timestamp: '8:15 AM',
            date: 'Today',
            unread: false
        },
        {
            id: 4,
            name: 'Michael Chen',
            image: '/api/placeholder/40/40',
            lastMessage: 'The meeting has been rescheduled to next Monday.',
            timestamp: '6:50 PM',
            date: 'Yesterday',
            unread: false
        },
        {
            id: 5,
            name: 'Emily Wilson',
            image: '/api/placeholder/40/40',
            lastMessage: 'Did you see the new announcement?',
            timestamp: '3:22 PM',
            date: 'Yesterday',
            unread: false
        }
    ]);

    const [selectedId, setSelectedId] = useState(1);

    return (
        <div className="flex flex-col h-screen bg-[#201e2e] text-gray-100">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h1 className="text-xl font-semibold">Messages</h1>
                <div className="flex items-center space-x-2">

                </div>
            </div>

            <div className="p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full py-2 pl-10 pr-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start p-4 cursor-pointer hover:bg-gray-800 ${message.id === selectedId ? 'bg-gray-800' : ''}`}
                        onClick={() => setSelectedId(message.id)}
                    >
                        <div className="relative">
                            <img
                                src={message.image}
                                alt={message.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            {message.unread && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
                            )}
                        </div>

                        <div className="flex-1 ml-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium">{message.name}</h3>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-400">{message.date}</span>
                                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-1">
                                <p className={`text-sm ${message.unread ? 'text-white' : 'text-gray-400'} truncate max-w-xs`}>
                                    {message.lastMessage}
                                </p>
                                {message.unread && (
                                    <div className="w-2 h-2 bg-purple-500 rounded-full ml-2"></div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesComponent;