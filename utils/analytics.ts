// utils/analytics.ts
// Utility functions for tracking events

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters?: Record<string, unknown>) => void;
    clarity: (command: string, ...args: unknown[]) => void;
  }
}

// Google Analytics event tracking
export const trackGAEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Wedding_Invitation',
      ...parameters
    });
  }
};

// Microsoft Clarity custom event tracking
export const trackClarityEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName, data);
  }
};

// Combined tracking function
export const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  // Track with Google Analytics
  trackGAEvent(eventName, data);
  
  // Track with Microsoft Clarity
  trackClarityEvent(eventName, data);
  
  // Log to console for debugging (remove in production)
  console.log(`Event tracked: ${eventName}`, data);
};

// Specific event tracking functions
export const trackLoadMoreCollections = () => {
  trackEvent('load_more_collections', {
    event_category: 'Gallery',
    event_label: 'Load More Collections Button'
  });
};

export const trackSendingGiftClick = () => {
  trackEvent('sending_gift_click', {
    event_category: 'Gift',
    event_label: 'Sending Gift Button'
  });
};

export const trackCopyAction = (copyType: string, value: string) => {
  trackEvent('copy_action', {
    event_category: 'Gift',
    event_label: `Copy ${copyType}`,
    copy_type: copyType,
    copied_value: value.substring(0, 10) + '...', // Only log first 10 chars for privacy
  });
};

export const trackSendMessage = (messageData: { 
  hasName: boolean; 
  hasMessage: boolean; 
  attendance: string; 
}) => {
  trackEvent('send_message', {
    event_category: 'Guest_Book',
    event_label: 'Send Message',
    has_name: messageData.hasName,
    has_message: messageData.hasMessage,
    attendance_status: messageData.attendance
  });
};

export const trackOpenInvitation = () => {
  trackEvent('open_invitation', {
    event_category: 'Navigation',
    event_label: 'Open Invitation Button'
  });
};

export const trackModalOpen = (modalType: string) => {
  trackEvent('modal_open', {
    event_category: 'Navigation',
    event_label: `${modalType} Modal Opened`,
    modal_type: modalType
  });
};

export const trackCalendarAdd = (eventType: string) => {
  trackEvent('add_to_calendar', {
    event_category: 'Calendar',
    event_label: `Add ${eventType} to Calendar`,
    event_type: eventType
  });
};