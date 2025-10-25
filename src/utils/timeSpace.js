export const timeSpace = (date) => {
    let dateObj;
    if (date.includes('T') && !date.includes('Z') && !date.includes('+') && !date.includes('-', 10)) {
        dateObj = new Date(date + 'Z');
    } else {
        dateObj = new Date(date);
    }
    
    const now = new Date();
    
    const diff = now - dateObj;
    
    if (diff < 0) {
        return 'Just now';
    }
    
    const diffInMinutes = diff / (1000 * 60);
    const diffInHours = diff / (1000 * 60 * 60);
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    
    if (diffInMinutes < 1) {
        return 'Just now';
    }
    if (diffInMinutes < 60) {
        return `${Math.floor(diffInMinutes)} minutes ago`;
    }
    if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    }
    if (diffInDays < 30) {
        return `${Math.floor(diffInDays)} days ago`;
    }
    
    return dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

