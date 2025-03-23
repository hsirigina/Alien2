# Alien2 - Immigration Assistant App

A comprehensive React Native application designed to help users navigate their immigration journey with AI-powered assistance.

## Features

- 📋 **Personalized Visa Roadmap**: ML-powered custom checklists based on your specific situation
- 📄 **Document Scanner & Validator**: Scan and validate immigration documents
- 🌐 **Language Translation & Simplification**: NLP-powered legal language simplification
- ⏱️ **Processing Time Predictor**: ML-based USCIS timeline estimates
- 🔮 **Case Status Prediction**: AI-powered application outcome predictions
- 👥 **Community Connection**: Match with successful immigration path users
- 💬 **Virtual Immigration Assistant**: AI chatbot for case-specific guidance

## Tech Stack

- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- TensorFlow.js (for ML features)
- Firebase (Authentication & Database)
- React Native Vision Camera (for document scanning)
- i18next (for translations)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the Metro bundler:
```bash
npm start
```

3. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── navigation/     # Navigation configuration
├── store/         # Redux store setup
├── services/      # API and external services
├── utils/         # Helper functions
├── hooks/         # Custom React hooks
├── assets/        # Images, fonts, etc.
└── types/         # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request