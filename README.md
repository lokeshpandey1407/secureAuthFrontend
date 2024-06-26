# User Authentication Application with React

This is a simple user authentication application built with React. It allows users to sign up or sign in, with error notifications handled using `react-toastify`.

## Technologies Used

- **React**: Frontend JavaScript library for building user interfaces.
- **react-toastify**: Library for showing toast notifications.
- **fetch**: HTTP client for making API requests.
- **CSS Modules**: Local scope CSS styling.

## Features

- **User Signup**: Register new users with username, email, and password.
- **User Signin**: Authenticate existing users with email and password.
- **Error Handling**: Display informative toast notifications for validation errors and API request failures.

## Installation

Follow these steps to set up and run the application locally:

1. **Clone the repository:**

   git clone https://github.com/lokeshpandey1407/secureAuthFrontend.git
   cd secureAuthFrontend

2. **Install the dependencies:**

npm install

3. **Run project:**

npm start

## Validation Rules and Security Considerations

### Form Input Validation

- **Username:**

  - Required Field
  - Example: `john_doe123`

- **Email:**

  - Required field.
  - Must be a valid email format (e.g., username@example.com).

- **Password:**

  - Required field.
  - Minimum 8 characters long.
  - Must include at least one uppercase letter, one lowercase letter, and one digit.

### Client-Side Validation

Client-side validation is implemented using custom validation functions in the form components. Validation errors are displayed using React tostify library.
