# MindfulApp - User Stories

This document outlines the nine core user stories for the MindfulApp mobile application, corresponding to the features and screens implemented in the project.

---

### 1. User Registration (Sign-Up Screen)
* **As a** new user looking to start my mindfulness journey,
* **I want to** register for an account by providing a username, email, and password,
* **So that** I can secure my personal information and have a unique user profile.
* **Acceptance Criteria**:
  * The sign-up screen must contain three input fields: Username, Email, and Password.
  * There must be a "Sign Up" button and a clickable link to navigate to the Login screen.
  * Validation errors must show if fields are empty, or if the password is less than 6 characters.

### 2. User Authentication (Login Screen)
* **As an** existing user of MindfulApp,
* **I want to** log in using my email and password,
* **So that** I can securely access my personal dashboard and favorite meditations.
* **Acceptance Criteria**:
  * The login screen must contain two input fields: Email and Password.
  * There must be a "Login" button and a clickable link to navigate to the Registration screen.
  * If the credentials match the registered user in local storage, login succeeds; otherwise, an error alert is displayed.

### 3. Browse Meditations (Home Screen)
* **As a** logged-in user,
* **I want to** see a list of available meditation sessions with titles, duration, and categories,
* **So that** I can easily choose a session that fits my current needs and schedule.
* **Acceptance Criteria**:
  * The Home screen must display a header with the application logo ("🧘 MindfulApp").
  * Each item in the list must display an illustrative emoji, the title, the category, and the duration.
  * Clicking an item must navigate the user to its Detail screen.

### 4. Meditation Instructions (Detail Screen)
* **As a** user who selected a meditation,
* **I want to** view the description and step-by-step instructions on a Detail screen,
* **So that** I can understand the purpose of the session and know how to practice it correctly.
* **Acceptance Criteria**:
  * The screen must display the meditation's emoji, title, category, and duration in a hero section.
  * It must have two tab sections: "About" (displaying description and benefits) and "Instructions" (displaying step-by-step guidance).
  * A back button must be available in the header to return to the previous screen.

### 5. Bookmark Favorite Meditations (Local Persistence)
* **As a** busy user,
* **I want to** mark my favorite meditation sessions with a heart icon on the Detail screen,
* **So that** I can quickly access them later without searching through the entire list.
* **Acceptance Criteria**:
  * The Detail screen header must contain a heart toggle button (`❤️` or `🤍`).
  * Toggling the heart must add/remove the item to/from local storage via `AsyncStorage`.
  * The state of the heart must reflect whether the item is currently favorited.

### 6. Access Saved Meditations (Favorites Screen)
* **As a** returning user,
* **I want to** open a dedicated Favorites Screen to see all my bookmarked meditation sessions in one place,
* **So that** I can quickly start my favorite practices.
* **Acceptance Criteria**:
  * A dedicated screen must load and display favorited items from `AsyncStorage`.
  * Removing a favorite must be possible directly from this list using a delete (`❌`) button.
  * If the list is empty, a user-friendly illustration/text must instruct the user on how to add favorites.

### 7. View Regional Data (External API Integration Screen)
* **As a** curious user interested in global mindfulness and culture,
* **I want to** view a list of Asian countries fetched dynamically from an external REST API,
* **So that** I can explore country capitals, populations, and flags in the app.
* **Acceptance Criteria**:
  * The API screen must fetch data from `https://restcountries.com/v3.1/region/asia`.
  * While fetching, a loading spinner must be shown.
  * Successfully fetched countries must show their name, capital, population, and flag emoji.
  * If a network error occurs, an error message and a "Retry" button must be displayed.

### 8. Manage Profile Settings (Settings & Profile Screens)
* **As a** registered user,
* **I want to** navigate a Settings Menu and update my username and email in the Profile Settings screen,
* **So that** my profile information remains accurate and up-to-date.
* **Acceptance Criteria**:
  * The Settings Menu must list options for "Profile Settings", "Notifications", and others, plus a "Logout" button.
  * The Profile Settings screen must load current user data from `AsyncStorage` and allow editing.
  * Saving the profile updates the user data in `AsyncStorage` and shows a success alert.

### 9. Configure and Test Daily Reminders (Notifications Screen)
* **As a** user trying to build a consistent meditation habit,
* **I want to** toggle daily morning/evening reminders and trigger a test notification,
* **So that** I receive push notifications directly on my device to remind me to practice.
* **Acceptance Criteria**:
  * The Notifications screen must allow enabling/disabling notifications globally and for specific triggers (Morning, Evening, Streak).
  * The settings must persist locally via `AsyncStorage`.
  * Tapping the "Send Test Notification" button must trigger a local push notification on the device within 2 seconds.
