# DoodleMagic - Task List

> Last Updated: January 11, 2026

## Overview

This document tracks all planned work for transforming DoodleMagic from an AI Studio prototype into a production-ready web and mobile app.

---

## 🔴 Phase 1: Critical Fixes (Must Have)

### 1.1 Remove AI Studio Dependency
- [x] Remove `window.aistudio` calls from `App.tsx`
- [ ] Create environment-based API key configuration
- [ ] Add fallback for standalone deployment
- **Files:** `App.tsx`

### 1.2 API Key Security
- [ ] Move API calls to backend/serverless functions
- [ ] Remove API key from frontend code
- [ ] Remove key from URL query string in `geminiService.ts`
- **Files:** `services/geminiService.ts`

### 1.3 Error Handling
- [ ] Add try/catch around JSON.parse in `geminiService.ts`
- [ ] Add timeout to video polling loop (max 5 minutes)
- [ ] Add retry logic for transient failures
- [ ] Create user-friendly error messages
- **Files:** `services/geminiService.ts`, `App.tsx`

### 1.4 Input Validation
- [ ] Add file size limit (e.g., 10MB max)
- [ ] Add image dimension validation
- [ ] Compress images before API upload
- [ ] Validate file type (images only)
- **Files:** `components/StepUpload.tsx`, `services/geminiService.ts`

---

## 🟠 Phase 2: Stability & Polish

### 2.1 Branding Consistency
- [ ] Decide on final name: "DoodleMagic" vs "DoodleDream"
- [ ] Update `manifest.json` name
- [ ] Update `index.html` title
- [ ] Update `components/Header.tsx` logo text
- [ ] Update `components/StepResult.tsx` footer text
- **Files:** `manifest.json`, `index.html`, `components/Header.tsx`, `components/StepResult.tsx`

### 2.2 Asset Management
- [ ] Download and self-host sound effects (currently on mixkit CDN)
- [ ] Create `/assets/sounds/` folder
- [ ] Update URLs in `components/Storybook.tsx`
- **Files:** `components/Storybook.tsx`

### 2.3 State Persistence
- [ ] Add localStorage save for work-in-progress
- [ ] Prompt to restore on page reload
- [ ] Add "Save Draft" button
- **Files:** `App.tsx`

### 2.4 Loading & UX
- [ ] Add cancel button during animation generation
- [ ] Add image preview/confirmation before processing
- [ ] Add skeleton loaders for story images
- [ ] Improve error messages with actionable guidance
- **Files:** `components/StepProcessing.tsx`, `components/StepUpload.tsx`, `App.tsx`

---

## 🟡 Phase 3: Accessibility & Quality

### 3.1 Keyboard Navigation
- [ ] Add arrow key controls to Storybook
- [ ] Add Escape key to close modals
- [ ] Ensure all buttons are focusable
- [ ] Add visible focus indicators
- **Files:** `components/Storybook.tsx`, `components/StepResult.tsx`

### 3.2 Screen Reader Support
- [ ] Add ARIA labels to icon-only buttons
- [ ] Add meaningful alt text for generated images
- [ ] Add aria-live regions for loading states
- [ ] Test with screen reader
- **Files:** All component files

### 3.3 Code Quality
- [ ] Add React Error Boundaries
- [ ] Add TypeScript strict mode
- [ ] Add ESLint configuration
- [ ] Add Prettier configuration
- [ ] Write unit tests for `geminiService.ts`
- **Files:** `tsconfig.json`, new config files

---

## 🔵 Phase 4: Backend Infrastructure

### 4.1 Create API Backend
- [ ] Set up serverless functions (Vercel/Netlify/AWS Lambda)
- [ ] Create `/api/analyze` endpoint
- [ ] Create `/api/generate-image` endpoint  
- [ ] Create `/api/generate-video` endpoint
- [ ] Move all Gemini API calls to backend
- **New files:** `api/` folder or separate backend repo

### 4.2 Environment Configuration
- [ ] Create `.env.example` file
- [ ] Document required environment variables
- [ ] Set up different configs for dev/staging/prod
- **Files:** `.env.example`, `README.md`

---

## 🟣 Phase 5: Mobile Apps (Capacitor)

### 5.1 Capacitor Setup
- [ ] Install Capacitor core and CLI
- [ ] Initialize Capacitor in project
- [ ] Add iOS platform
- [ ] Add Android platform
- [ ] Configure `capacitor.config.ts`
- **Commands:**
  ```bash
  npm install @capacitor/core @capacitor/cli
  npx cap init
  npm install @capacitor/ios @capacitor/android
  npx cap add ios
  npx cap add android
  ```

### 5.2 Native Features
- [ ] Add Camera plugin for native camera access
- [ ] Add Filesystem plugin for saving videos
- [ ] Add Share plugin for native sharing
- [ ] Add Haptics for feedback
- **Dependencies:** `@capacitor/camera`, `@capacitor/filesystem`, `@capacitor/share`, `@capacitor/haptics`

### 5.3 App Store Preparation
- [ ] Create app icons (all sizes)
- [ ] Create splash screens
- [ ] Write App Store description
- [ ] Write Play Store description
- [ ] Create screenshots
- [ ] Set up Apple Developer account
- [ ] Set up Google Play Developer account

---

## ⚪ Phase 6: Production Readiness

### 6.1 Legal & Compliance
- [ ] Create Terms of Service page
- [ ] Create Privacy Policy page
- [ ] Add COPPA compliance (children's app)
- [ ] Add content moderation for uploads
- [ ] Add age verification or parental gate

### 6.2 Analytics & Monitoring
- [ ] Add analytics (PostHog, Mixpanel, or similar)
- [ ] Add error tracking (Sentry)
- [ ] Add performance monitoring
- [ ] Create dashboard for key metrics

### 6.3 User Features
- [ ] User accounts (optional)
- [ ] Save creations to gallery
- [ ] Share links to creations
- [ ] Rate limiting per user

### 6.4 Performance
- [ ] Optimize bundle size
- [ ] Add lazy loading for components
- [ ] Optimize images
- [ ] Add service worker caching for assets
- [ ] Test on slow connections

---

## 📋 Quick Reference

### Commands
```bash
# Development
npm install
npm run dev

# Build
npm run build
npm run preview

# Capacitor (after setup)
npx cap sync
npx cap open ios
npx cap open android
```

### Key Files
| File | Purpose |
|------|---------|
| `App.tsx` | Main app orchestrator |
| `services/geminiService.ts` | All AI API calls |
| `components/Storybook.tsx` | Interactive book viewer |
| `vite.config.ts` | Build configuration |

### Links
- **Repo:** https://github.com/boilermanc/doodlemagic
- **AI Studio:** https://ai.studio/apps/drive/1nIeNK7toRmO35Ui5dQs-igVVYTUFikkV

---

## Progress Tracking

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Critical | 🔴 In Progress | 5% |
| Phase 2: Stability | ⬜ Not Started | 0% |
| Phase 3: Accessibility | ⬜ Not Started | 0% |
| Phase 4: Backend | ⬜ Not Started | 0% |
| Phase 5: Mobile | ⬜ Not Started | 0% |
| Phase 6: Production | ⬜ Not Started | 0% |
