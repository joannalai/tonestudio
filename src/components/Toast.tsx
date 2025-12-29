import { useEffect } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-8 right-8 bg-gray-900 text-white px-6 py-3.5 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] z-50 animate-fade-in-up font-light backdrop-blur-sm">
            {message}
        </div>
    );
}
