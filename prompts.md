# LLM Development Prompts

This file documents the prompts used with an LLM during the development of the OTP User Login & Checkout hiring assignment.

---

## 1. Project Planning

### Prompt
Build the hiring assignment from scratch with the following requirements:

1. OTP/code-based user login.
2. Registration should collect email, first name, and last name.
3. Generate a random 6-digit numeric login code after registration.
4. Display the generated code after registration.
5. Checkout should collect email, phone, and shipping address.
6. Validate email in real time.
7. Once the email is complete and well-formed, perform background user recognition.
8. If the email belongs to a registered user, display a modal asking for the numeric login code.
9. Provide a Skip Login option.
10. Correct code should log the user in and close the modal.
11. Incorrect code should show an error in the modal.
12. Display the logged-in user's name.
13. Checkout submission should only store checkout information in the database; no payment processing is required.
14. Deploy the application publicly.
15. Provide the complete source code in GitHub.
16. Include the database schema as a `.sql` file.
17. Include `prompts.md` containing the LLM prompts used during development.
18. Keep frontend, API/backend, and database layers separate.

---

## 2. Technology Stack

### Prompt
Use React with JavaScript for the frontend, Django REST Framework for the backend API, and MySQL for the database. Build the project from scratch rather than modifying an existing application.

---

## 3. Project Structure

### Prompt
Create a clean full-stack project structure with separate frontend and backend directories. Use React + Vite for the frontend and Django REST Framework for the backend.

---

## 4. Django Setup

### Prompt
Set up a Django project and a Django application for the OTP user login and checkout assignment.

---

## 5. MySQL Configuration

### Prompt
Configure Django to connect to a MySQL database using environment variables stored in a `.env` file. Do not hard-code database credentials in the source code.

---

## 6. Database Models

### Prompt
Create Django models for registered users and checkout information.

The user model should contain:

- ID
- Email
- First name
- Last name
- 6-digit login code
- Created timestamp
- Updated timestamp

The checkout model should contain:

- ID
- Optional registered user relationship
- Email
- Phone
- Shipping address
- Created timestamp

The registered user relationship must be nullable because users can skip login and complete checkout as guests.

---

## 7. Registration API

### Prompt
Create a Django REST API endpoint for user registration.

The endpoint should:

- Accept email, first name, and last name.
- Validate the input.
- Normalize the email.
- Check for duplicate email addresses.
- Generate a random 6-digit numeric code.
- Store the user in MySQL.
- Return the generated code in the response because the assignment requires displaying it after registration.

---

## 8. Email Recognition API

### Prompt
Create a Django REST API endpoint that accepts an email address and determines whether the email belongs to a registered user.

For a registered user, return:

- recognized = true
- user ID
- first name
- last name

For an unregistered user, return:

- recognized = false

Do not return the login code from the recognition endpoint.

---

## 9. Login Code Verification API

### Prompt
Create a Django REST API endpoint for verifying the 6-digit login code.

The endpoint should accept:

- Email
- 6-digit code

If the code is correct, return successful verification and the user's details.

If the code is incorrect, return an appropriate error response.

---

## 10. Checkout API

### Prompt
Create a Django REST API endpoint for checkout.

The endpoint should accept:

- Email
- Phone
- Shipping address

If the email belongs to a registered user, associate the checkout with that user.

If the email is not registered, save the checkout with a null user relationship so that guest checkout is supported.

No payment functionality is required.

---

## 11. Frontend Setup

### Prompt
Create the frontend using React, JavaScript, and Vite. Do not use TypeScript.

---

## 12. API Client

### Prompt
Create a JavaScript API helper that communicates with the Django REST API.

Create functions for:

- User registration
- Email recognition
- Login code verification
- Checkout submission

Use JSON requests and handle API errors appropriately.

---

## 13. Registration UI

### Prompt
Build a professional React registration page containing:

- First name
- Last name
- Email
- Create account button

Display validation errors and loading states.

After successful registration, display the generated 6-digit login code.

---

## 14. Checkout UI

### Prompt
Build a professional checkout page containing:

- Email
- Phone number
- Shipping address
- Complete checkout button

The page should support both registered users and guest users.

---

## 15. Real-Time Email Validation

### Prompt
Add real-time email validation to the checkout form. Show an error when the email is not well formed.

---

## 16. Background User Recognition

### Prompt
When the checkout email becomes valid, perform user recognition in the background using the Django recognition API.

Do not wait until checkout submission to perform recognition.

---

## 17. Recognition Debouncing

### Prompt
Add a debounce to the background email recognition so that the recognition API is not called on every keystroke. Wait briefly after the user stops typing before calling the recognition endpoint.

---

## 18. OTP Login Modal

### Prompt
When a registered email is recognized, display a professional login modal containing:

- User recognition message
- 6-digit code input
- Verify & Login button
- Continue as Guest / Skip Login option

---

## 19. Code Validation UI

### Prompt
The OTP input should accept only numeric characters and contain exactly 6 digits. Display an appropriate error if the code is incorrect.

---

## 20. Logged-In User Display

### Prompt
After successful code verification, close the OTP modal and display the logged-in user's first name on the checkout page.

---

## 21. Guest Checkout

### Prompt
Allow users to skip login after their email is recognized. They should still be able to complete checkout and have their checkout data stored in MySQL.

---

## 22. Frontend-to-Backend Debugging

### Prompt
Debug the React frontend when the registration request returns "Failed to fetch". Verify the Django server, API URL, and CORS configuration.

---

## 23. CORS Configuration

### Prompt
Configure Django CORS so that the React development server can communicate with the Django API during local development.

---

## 24. Frontend UI Improvement

### Prompt
Improve the initial React interface into a professional, clean, responsive UI suitable for a hiring assignment.

The UI should include:

- Professional header
- Clear typography
- Form spacing
- Input focus states
- Loading states
- Error states
- Success states
- OTP modal
- Responsive mobile layout
- Professional buttons and cards

---

## 25. API Structure Cleanup

### Prompt
Separate authentication endpoints from checkout endpoints.

Use:

/api/auth/register/

/api/auth/recognize/

/api/auth/verify-code/

/api/checkout/

---

## 26. Database Schema

### Prompt
Create a MySQL schema.sql file containing the database and application tables required by the Django application.

The checkout user's foreign key must allow NULL values to support guest checkout.

---

## 27. Git Configuration

### Prompt
Create a `.gitignore` that prevents the following from being committed:

- .env
- Virtual environments
- node_modules
- Python cache files
- Build files
- IDE files
- Logs
- Secrets

---

## 28. Environment Example

### Prompt
Create an `.env.example` file containing the required database environment variable names without exposing the actual database password.

---

## 29. README Documentation

### Prompt
Create a professional README documenting:

- Project overview
- Features
- Technology stack
- Architecture
- Project structure
- Backend setup
- Frontend setup
- Environment variables
- API endpoints
- Database setup
- Testing
- Deployment
- Security considerations

---

## 30. Testing

### Prompt
Test the backend registration API using PowerShell and verify that the user is persisted in MySQL.

---

## 31. Recognition Testing

### Prompt
Test the recognition API with both a registered email and an unknown email. Verify that registered users return recognized=true and unknown users return recognized=false.

---

## 32. Login Code Testing

### Prompt
Test the login code verification API with both the correct and incorrect 6-digit codes.

---

## 33. Checkout Testing

### Prompt
Test checkout with a registered user and verify that the checkout record is associated with the registered user in MySQL.

---

## 34. Guest Checkout Testing

### Prompt
Test checkout with an unregistered email and verify that the checkout record is saved with a NULL user relationship.

---

## 35. Frontend Integration Testing

### Prompt
Test the complete React frontend flow:

Registration → Login code display → Checkout → Email recognition → OTP modal → Code verification → Logged-in user display → Checkout submission.

---

## 36. Repository Preparation

### Prompt
Prepare the complete project for GitHub submission. Verify that source code, schema.sql, README.md, prompts.md, and configuration examples are included while secrets, .env files, virtual environments, and node_modules are excluded.

---

## 37. Deployment Preparation

### Prompt
Prepare the React frontend and Django REST API for public deployment. Identify the required production environment variables and ensure that the frontend can communicate with the deployed backend API.

---

# Development Notes

The project was developed incrementally.

The backend APIs were implemented and tested first using PowerShell and MySQL. The React frontend was then connected to the backend and tested through the browser.

The final application supports:

- User registration
- 6-digit login code generation
- Email recognition
- Background recognition
- Debounced recognition requests
- Code verification
- Login modal
- Skip Login / guest checkout
- Logged-in user display
- Checkout persistence
- MySQL database storage