
// Get user's IP address for audit logging
export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
};

// Get device info for audit logging
export const getDeviceInfo = (): string => {
  return navigator.userAgent || 'unknown';
};

// Log authentication events
export const logAuthEvent = async (action: string, userId?: string) => {
  try {
    const ip = await getUserIP();
    const device = getDeviceInfo();
    
    console.log('Auth event:', {
      user_id: userId,
      action: action,
      ip: ip,
      device: device,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log auth event:', error);
  }
};
