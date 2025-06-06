# 🔒 Security Setup for RoomedIn

## 🚨 **IMPORTANT: Environment Variables**

This project uses environment variables to keep Firebase credentials secure.

### **Setup Instructions:**

1. **Copy the template:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your Firebase credentials** in the `.env` file
3. **Never commit the `.env` file** - it's already in `.gitignore`

### **Environment Variables Required:**

- `VITE_FIREBASE_API_KEY` - Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Your Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID` - Your Firebase measurement ID

### **🔐 Security Best Practices:**

1. **Never commit secrets** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** if they're ever exposed
4. **Set up Firebase security rules** to restrict access
5. **Monitor Firebase usage** for suspicious activity

### **🚨 If API Key is Exposed:**

1. **Immediately rotate** the Firebase API key in Firebase Console
2. **Update** your `.env` file with the new key
3. **Check Firebase logs** for unauthorized access
4. **Review security rules** in Firebase Console

## 📝 **Firebase Security Rules**

Make sure your Firestore security rules are properly configured:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /universities/{document} {
      allow read: if true; // Public read access for university search
      allow write: if false; // No public writes - admin only
    }
  }
}
```
