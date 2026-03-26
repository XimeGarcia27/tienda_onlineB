import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const phoneNumber = '5888888888'; // Replace with actual number
    const message = 'Hola! Me gustaría obtener más información sobre sus productos.';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
            aria-label="Contact on WhatsApp"
        >
            <MessageCircle size={28} fill="currentColor" />
        </a>
    );
};

export default WhatsAppButton;
