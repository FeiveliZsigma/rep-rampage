# REP RAMPAGE

A camera-assisted push-up fitness RPG built with React Native and Expo.

## Build status
- [x] Game direction and core design established
- [x] GitHub repository created
- [x] First mobile home-screen prototype added
- [ ] Create the local Expo SDK 58 project
- [ ] Connect the local project to this repository
- [ ] Add navigation and saved player progress
- [ ] Build and test reliable push-up rep detection

## Tech direction
- App: React Native + TypeScript + Expo
- Camera: on-device body-landmark processing; a development build will be needed for the camera integration
- Data: local-first player progress, then account sync and leaderboards
- Source control: this GitHub repository

## Getting started
Create the Expo project locally with the official template, then copy the starter screen from starter/RepRampageHome.tsx into the project.
Official guide: https://docs.expo.dev/get-started/create-a-project/

## Safety and privacy
Workouts will have sensible limits. Recovery days preserve consistency, and boss progress can span multiple sessions. Camera processing should stay on-device by default; workout video should not be uploaded.