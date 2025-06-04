# Firebase Setup Instructions

Follow these steps to set up Firebase authentication for your FinanceFlow app:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `financeflow-[your-name]`
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. (Optional) Enable "Google" provider for social login

## 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" app icon (</>) 
4. Register app with nickname: "FinanceFlow Web"
5. Copy the configuration object

## 4. Set Up Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

## 5. Configure Environment Variables

Create a `.env.local` file in your project root with your Firebase config:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

## 6. Update Firestore Security Rules

Go to Firestore Database > Rules and update with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /transactions/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /budgets/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /goals/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
\`\`\`

## 7. Test Authentication

1. Start your development server: `npm run dev`
2. Go to `/auth/signup` and create a test account
3. Check Firebase Authentication console to see the new user
4. Try logging in and out

## 8. Deploy to Production

When deploying to Vercel:

1. Add environment variables in Vercel dashboard
2. Update Firestore rules to production mode
3. Configure authorized domains in Firebase Authentication

## Troubleshooting

- **"Firebase config missing"**: Check that all environment variables are set
- **"Permission denied"**: Verify Firestore security rules
- **"Invalid API key"**: Double-check your Firebase config values
- **Email not verified**: Users can still access the app but should verify their email

## Optional: Enable Google Authentication

1. Go to Firebase Authentication > Sign-in method
2. Enable Google provider
3. Add your domain to authorized domains
4. Update the Google sign-in buttons in the auth forms
