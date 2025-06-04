# Firestore Security Rules Setup

The current Firestore permission error occurs because the database is in test mode or has restrictive security rules. Here's how to fix it:

## Option 1: Update Firestore Rules (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `finance-7fd90`
3. Go to "Firestore Database" → "Rules"
4. Replace the current rules with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own data
    match /transactions/{document} {
      allow read, write: if request.auth != null && 
        (resource == null || request.auth.uid == resource.data.userId);
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    match /budgets/{document} {
      allow read, write: if request.auth != null && 
        (resource == null || request.auth.uid == resource.data.userId);
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    match /goals/{document} {
      allow read, write: if request.auth != null && 
        (resource == null || request.auth.uid == resource.data.userId);
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
\`\`\`

5. Click "Publish"

## Option 2: Test Mode (Development Only)

For development/testing, you can temporarily use open rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 1, 1);
    }
  }
}
\`\`\`

⚠️ **Warning**: Test mode rules allow anyone to read/write your database. Only use for development!

## Current Workaround

The app now includes a fallback system that:
- Tries to use Firestore first
- Falls back to mock data if permissions are denied
- Continues to work normally with sample transactions and budgets
- Shows console warnings when Firestore access fails

This means the app works even without proper Firestore setup, but you'll want to configure the rules above for production use.
