"use client";
import { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Image, MoreVertical, ArrowLeft, Phone, Video, CheckCircle, Mic } from 'lucide-react';
import Link from 'next/link';

export const ChatPage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'other',
            text: 'Hey, how are you doing today?',
            timestamp: '10:32 AM',
            read: true
        },
        {
            id: 2,
            sender: 'me',
            text: 'I\'m good! Just working on that project we discussed.',
            timestamp: '10:35 AM',
            read: true
        },
        {
            id: 3,
            sender: 'other',
            text: 'That sounds great! How is it coming along?',
            timestamp: '10:36 AM',
            read: true
        },
        {
            id: 4,
            sender: 'me',
            text: 'Making good progress. I should have something to show you by tomorrow.',
            timestamp: '10:40 AM',
            read: true
        },
        {
            id: 5,
            sender: 'other',
            text: 'Perfect! Looking forward to seeing it.',
            timestamp: '10:41 AM',
            read: true
        },
        {
            id: 6,
            sender: 'other',
            text: 'Also, here\'s that reference image you asked for:',
            timestamp: '10:42 AM',
            read: true
        },
        {
            id: 7,
            sender: 'other',
            image: '/api/placeholder/300/200',
            timestamp: '10:42 AM',
            read: true
        }
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = () => {
        if (newMessage.trim() === '' && !imagePreview) return;

        const newMessageObj: { id: number; sender: string; timestamp: string; read: boolean; text?: string; image?: string | null } = {
            id: messages.length + 1,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };

        if (newMessage.trim() !== '') {
            newMessageObj.text = newMessage;
        }

        if (imagePreview) {
            newMessageObj.image = imagePreview;
        }

        setMessages([...messages, newMessageObj] as any);
        setNewMessage('');
        setImagePreview(null);
        setShowImagePreview(false);

        setTimeout(scrollToBottom, 100);
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = (e: any) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImagePreview(e.target.result);
                setShowImagePreview(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAttachClick = () => {
        if (fileInputRef != null) {

            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }
    };

    const cancelImageUpload = () => {
        setImagePreview(null);
        setShowImagePreview(false);
    };

    const otherUser = {
        name: 'Sarah Johnson',
        image: '/api/placeholder/40/40',
        status: 'Online'
    };

    return (
        <div className="flex flex-col h-screen bg-[#201e2e] text-gray-100">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-700">
                <button className="p-2 mr-2 rounded-full hover:bg-gray-700">
                    <ArrowLeft size={20} />
                </button>

                <img
                    src={otherUser.image}
                    alt={otherUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div className="ml-3 flex-1">
                    <h2 className="font-semibold">{otherUser.name}</h2>
                    <p className="text-xs text-green-400">{otherUser.status}</p>
                </div>

                <div className="flex space-x-3">
                    <button className="p-2 rounded-full hover:bg-gray-700">
                        <Phone size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700">
                        <Video size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-700">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message) => (
                    <Link href="/chat">
                        <div

                            key={message.id}
                            className={`max-w-xs lg:max-w-md xl:max-w-lg mb-4 ${message.sender === 'me' ? 'ml-auto' : 'mr-auto'
                                }`}
                        >
                            <div
                                className={`rounded-lg p-3 ${message.sender === 'me'
                                    ? 'bg-purple-600 rounded-tr-none'
                                    : 'bg-gray-700 rounded-tl-none'
                                    }`}
                            >
                                {message.text && <p className="text-sm">{message.text}</p>}
                                {message.image && (
                                    <div className="mt-2">
                                        <img
                                            src={message.image}
                                            alt="Shared image"
                                            className="rounded-lg max-w-full"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={`flex text-xs text-gray-400 mt-1 ${message.sender === 'me' ? 'justify-end' : 'justify-start'
                                }`}>
                                <span>{message.timestamp}</span>
                                {message.sender === 'me' && (
                                    <span className="ml-2">
                                        {message.read ?
                                            <CheckCircle size={12} className="text-blue-400" /> :
                                            <CheckCircle size={12} />
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Image preview */}
            {showImagePreview && (
                <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <div className="relative inline-block">
                        <img
                            src={imagePreview || ''}
                            alt="Upload preview"
                            className="h-20 rounded-lg"
                        />
                        <button
                            onClick={cancelImageUpload}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                            <span className="text-xs">✕</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Input area */}
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*"
                    />

                    <button
                        onClick={handleAttachClick}
                        className="p-2 rounded-full hover:bg-gray-700 mr-2"
                    >
                        <Paperclip size={20} />
                    </button>

                    <button className="p-2 rounded-full hover:bg-gray-700 mr-2">
                        <Image size={20} />
                    </button>

                    <div className="flex-1 bg-gray-700 rounded-full">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            className="w-full bg-transparent border-none focus:ring-0 resize-none py-2 px-4 max-h-20 rounded-full"
                            rows={1}
                        />
                    </div>

                    <button className="p-2 rounded-full hover:bg-gray-700 mx-2">
                        <Smile size={20} />
                    </button>

                    <button
                        onClick={handleSend}
                        className="p-2 bg-purple-600 rounded-full hover:bg-purple-700"
                        disabled={newMessage.trim() === '' && !imagePreview}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;