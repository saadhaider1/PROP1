# Jitsi Meet Video Call Integration - Portfolio Managers

## Summary
Successfully integrated Jitsi Meet video calling functionality into the Portfolio Managers page, allowing real-time video communication between investors and agents.

## Features Implemented

### 1. **Jitsi Meet Integration**
- External API loaded from `https://meet.jit.si/external_api.js`
- Automatic script loading on component mount
- Proper cleanup on component unmount

### 2. **Video Call Modal**
- Full-screen video call interface
- Header bar showing:
  - Agent avatar with gradient color
  - Agent name
  - "Video Call in Progress" status
  - Red "End Call" button
- Jitsi Meet container fills the entire screen

### 3. **Video Call Features**
- **Unique Room Names**: Each call gets a unique room ID
  - Format: `PROPLEDGER_[AgentName]_[Timestamp]`
  - Example: `PROPLEDGER_Ahmed_Khan_1699376400000`
- **User Display Name**: Shows investor's name or "Investor"
- **Audio/Video**: Both enabled by default
- **Full Toolbar**: All Jitsi features available:
  - Microphone & Camera controls
  - Screen sharing
  - Chat
  - Recording
  - Settings
  - Raise hand
  - Reactions
  - And more...

### 4. **User Flow**
1. Click "Contact Agent" on any manager card
2. Contact modal appears with 3 options
3. Click "Start Video Call" (green button)
4. Full-screen Jitsi Meet interface loads
5. Video call starts automatically
6. Click "End Call" to terminate and return

### 5. **Event Handling**
- `videoConferenceJoined`: Logs when user joins
- `readyToClose`: Automatically ends call when Jitsi closes
- Proper API disposal on call end

## Technical Implementation

### State Management
```typescript
const [showVideoCall, setShowVideoCall] = useState(false);
const [jitsiApi, setJitsiApi] = useState<any>(null);
```

### Jitsi Configuration
- **Domain**: `meet.jit.si` (free Jitsi server)
- **Width/Height**: 100% (full container)
- **Audio**: Unmuted by default
- **Video**: Unmuted by default
- **Welcome Page**: Disabled for faster joining

### Room Naming Convention
- Prefix: `PROPLEDGER_`
- Agent Name: Spaces replaced with underscores
- Timestamp: Ensures uniqueness
- Example: `PROPLEDGER_Sarah_Ali_1699376400000`

## UI Components

### Video Call Header
- Dark gray background (`bg-gray-900`)
- Agent info on left
- End call button on right (red)
- Border bottom for separation

### Jitsi Container
- ID: `jitsi-container`
- Flex-1 to fill remaining space
- Full width

## Security & Privacy
- Each call has a unique room ID
- Rooms are temporary and auto-generated
- No persistent room storage
- Uses Jitsi's secure infrastructure

## Browser Compatibility
- Works on all modern browsers
- Requires camera/microphone permissions
- WebRTC support required

## Future Enhancements (Optional)
- [ ] Add call duration timer
- [ ] Save call history to database
- [ ] Add pre-call device testing
- [ ] Implement call scheduling
- [ ] Add call recording feature
- [ ] Send call invitations via email
- [ ] Add waiting room feature
- [ ] Implement call analytics

## Testing
1. Visit http://localhost:3000/managers
2. Click any "Contact Agent" button
3. Click "Start Video Call"
4. Grant camera/microphone permissions
5. Video call should start
6. Click "End Call" to terminate

## Dependencies
- Jitsi Meet External API (loaded via CDN)
- No additional npm packages required

## Notes
- Jitsi Meet is free and open-source
- No API key required for basic usage
- Can be self-hosted for enterprise use
- Supports end-to-end encryption
- GDPR compliant
