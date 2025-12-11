# Google OAuth Setup Guide

## Current Status
Google OAuth button is currently **disabled** with a helpful error message directing users to use email login instead.

## Why OAuth is Disabled
Google OAuth requires:
1. Google Cloud Project setup
2. OAuth 2.0 Client ID and Secret
3. Authorized redirect URIs
4. Proper configuration in the backend

Without these credentials, the OAuth flow cannot work.

## To Enable Google OAuth

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API or Google Identity Services

### Step 2: Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Add authorized redirect URIs:
   ```
   http://localhost/PROPLEDGER/auth/oauth_callback.php
   http://localhost:3001/auth/callback
   ```
5. Save and copy:
   - Client ID
   - Client Secret

### Step 3: Configure Backend
Create or update `config/oauth_config.php`:

```php
<?php
// Google OAuth Configuration
define('GOOGLE_CLIENT_ID', 'your-client-id-here.apps.googleusercontent.com');
define('GOOGLE_CLIENT_SECRET', 'your-client-secret-here');
define('GOOGLE_REDIRECT_URI', 'http://localhost/PROPLEDGER/auth/oauth_callback.php');

// OAuth state management
function generateOAuthState($provider) {
    $state = bin2hex(random_bytes(16));
    $_SESSION['oauth_state'] = $state;
    $_SESSION['oauth_provider'] = $provider;
    return $state;
}

function getOAuthAuthUrl($provider, $state) {
    if ($provider === 'google') {
        $params = [
            'client_id' => GOOGLE_CLIENT_ID,
            'redirect_uri' => GOOGLE_REDIRECT_URI,
            'response_type' => 'code',
            'scope' => 'email profile',
            'state' => $state,
            'access_type' => 'offline',
            'prompt' => 'consent'
        ];
        return 'https://accounts.google.com/o/oauth2/v2/auth?' . http_build_query($params);
    }
    throw new Exception('Unsupported provider');
}
?>
```

### Step 4: Create OAuth Callback Handler
Create `auth/oauth_callback.php`:

```php
<?php
session_start();
require_once '../config/database.php';
require_once '../config/oauth_config.php';

// Verify state to prevent CSRF
if (!isset($_GET['state']) || $_GET['state'] !== $_SESSION['oauth_state']) {
    die('Invalid state parameter');
}

if (isset($_GET['code'])) {
    $code = $_GET['code'];
    
    // Exchange code for access token
    $token_url = 'https://oauth2.googleapis.com/token';
    $params = [
        'code' => $code,
        'client_id' => GOOGLE_CLIENT_ID,
        'client_secret' => GOOGLE_CLIENT_SECRET,
        'redirect_uri' => GOOGLE_REDIRECT_URI,
        'grant_type' => 'authorization_code'
    ];
    
    $ch = curl_init($token_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    $response = curl_exec($ch);
    curl_close($ch);
    
    $token_data = json_decode($response, true);
    
    if (isset($token_data['access_token'])) {
        // Get user info from Google
        $user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo';
        $ch = curl_init($user_info_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token_data['access_token']
        ]);
        $user_response = curl_exec($ch);
        curl_close($ch);
        
        $user_data = json_decode($user_response, true);
        
        // Check if user exists in database
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$user_data['email']]);
        $user = $stmt->fetch();
        
        if (!$user) {
            // Create new user
            $stmt = $pdo->prepare("
                INSERT INTO users (full_name, email, user_type, is_active, created_at) 
                VALUES (?, ?, 'investor', 1, NOW())
            ");
            $stmt->execute([$user_data['name'], $user_data['email']]);
            $user_id = $pdo->lastInsertId();
        } else {
            $user_id = $user['id'];
        }
        
        // Create session
        $session_token = bin2hex(random_bytes(32));
        $stmt = $pdo->prepare("
            INSERT INTO sessions (user_id, session_token, created_at, expires_at) 
            VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY))
        ");
        $stmt->execute([$user_id, $session_token]);
        
        // Set cookie
        setcookie('session_token', $session_token, time() + (30 * 24 * 60 * 60), '/');
        
        // Redirect to Next.js dashboard
        header('Location: http://localhost:3001/dashboard');
        exit;
    }
}

die('OAuth authentication failed');
?>
```

### Step 5: Update Login Page
Once OAuth is configured, update the login page button:

```typescript
<button
  type="button"
  onClick={async () => {
    try {
      const response = await fetch('http://localhost/PROPLEDGER/auth/oauth_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'google' })
      });
      const data = await response.json();
      if (data.success && data.auth_url) {
        window.location.href = data.auth_url;
      } else {
        setError(data.message || 'OAuth initialization failed');
      }
    } catch (err) {
      setError('Failed to initialize Google login');
    }
  }}
  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
>
  <span className="bg-white text-blue-600 px-2 py-1 rounded font-bold text-sm">G</span>
  Continue with Google
</button>
```

## Current Workaround
For now, users are directed to use email login with a clear message:
- "Google OAuth is not configured yet. Please use email login or contact support to set up OAuth."
- Small helper text: "OAuth setup required - Use email login below"

## Testing OAuth (Once Configured)
1. Click "Continue with Google"
2. Redirected to Google login
3. Grant permissions
4. Redirected back to callback URL
5. User created/logged in
6. Redirected to dashboard

## Security Considerations
- Always verify state parameter to prevent CSRF
- Use HTTPS in production
- Store client secret securely (environment variables)
- Implement proper error handling
- Add rate limiting to prevent abuse

## Alternative: NextAuth.js
For a more robust solution, consider using NextAuth.js:
```bash
npm install next-auth
```

This provides built-in OAuth support for Google, Facebook, GitHub, etc.

## Status
- ✅ Google button disabled with helpful message
- ✅ Email login works perfectly
- ⏳ OAuth configuration pending
- ⏳ Requires Google Cloud credentials
