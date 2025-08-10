# React Native Carousel Movie App

A React Native movie app featuring a smooth carousel for browsing movies, built with Expo Router and powered by the OMDB API.

## What's Used

- React Native 0.79.5
- Expo SDK 53
- TypeScript
- React Query for data management
- Expo Router for navigation
- Jest for testing

## Setup

1. Get an API key from [OMDB API](https://www.omdbapi.com/apikey.aspx)
2. Create a `.env` file in the root directory with:
   ```
   EXPO_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Project Structure

The app follows a feature-based architecture with:

- `src/features/` - Feature modules (movies, shared-data)
- `src/ui/` - Reusable UI components including carousels
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and API client
- `src/app/` - Expo Router app structure
