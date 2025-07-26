import { useEffect } from 'react';

function LiveChat({ propertyId = '6718c2f14304e3196ae69b2a' }) {
  useEffect(() => {
    // Check if Tawk.to is already loaded
    if (window.Tawk_API) {
      return;
    }

    // Create the Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/6718c2f14304e3196ae69b2a/1iaq5gqp7';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Configure Tawk.to
    window.Tawk_API.onLoad = function() {
      console.log('Tawk.to Live Chat loaded successfully');
      
      // Customize chat widget
      window.Tawk_API.setAttributes({
        'name': 'Kleverscape Visitor',
        'hash': 'hash'
      }, function(error) {
        if (error) {
          console.error('Tawk.to attributes error:', error);
        }
      });
    };

    // Handle chat status
    window.Tawk_API.onStatusChange = function(status) {
      console.log('Tawk.to status:', status);
    };

    // Handle chat start
    window.Tawk_API.onChatStarted = function() {
      console.log('Chat started with Kleverscape support');
    };

    // Handle chat end
    window.Tawk_API.onChatEnded = function() {
      console.log('Chat ended');
    };

    // Custom styling for the chat widget
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: 'br', // bottom right
          xOffset: 20,
          yOffset: 20
        },
        mobile: {
          position: 'br',
          xOffset: 10,
          yOffset: 10
        }
      }
    };

    // Add the script to head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Don't remove the script as it might be used by other components
      // The chat widget should persist across page navigation
    };
  }, [propertyId]);

  // This component doesn't render anything visible
  // The chat widget is injected by Tawk.to
  return null;
}

// Helper functions to control the chat widget
export const LiveChatAPI = {
  // Show the chat widget
  show: () => {
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API.showWidget();
    }
  },

  // Hide the chat widget
  hide: () => {
    if (window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
    }
  },

  // Toggle chat window
  toggle: () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    }
  },

  // Maximize chat window
  maximize: () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
    }
  },

  // Minimize chat window
  minimize: () => {
    if (window.Tawk_API && window.Tawk_API.minimize) {
      window.Tawk_API.minimize();
    }
  },

  // Send a message programmatically
  sendMessage: (message) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent({
        event: 'message',
        message: message
      });
    }
  },

  // Set visitor info
  setVisitorInfo: (name, email) => {
    if (window.Tawk_API && window.Tawk_API.setAttributes) {
      window.Tawk_API.setAttributes({
        'name': name,
        'email': email
      });
    }
  },

  // Check if chat is online
  isOnline: () => {
    return window.Tawk_API && window.Tawk_API.isChatOnline 
      ? window.Tawk_API.isChatOnline() 
      : false;
  }
};

export default LiveChat;
