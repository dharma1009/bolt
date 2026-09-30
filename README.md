#How to run 
how to run backend

1.cd otp-user-login

2.cd backend

3. create virtual environment    python -m venv venv

4. .\venv\scripts\activate activate virtual environment

5. pip install -r requirements.txt  install pre requirements

6. py manage.py makemigrations    do makemigratios

7.py manage.py migrate

8.py manage.py runserver


how to run front-end

1.cd otp-user-login

2.cd frontend

3. npm install

4. npm run dev


how to see the data in db

1. cd backend

2. from users.models import User, Order

3. User.objects.count()

4. Order.objects.count()



# OTP User Login & Checkout

A full-stack OTP/code-based user recognition and checkout application built as a hiring assignment.

The application allows users to register with their email and name, receive a 6-digit login code, and use email recognition during checkout. Registered users can authenticate using the code, while unregistered users can continue as guests.

---

## Features

### User Registration

- Register using:
  - Email
  - First name
  - Last name
- Generate a random 6-digit login code.
- Display the generated code after successful registration.
- Store registered users in MySQL.

### Email Recognition

- Validate email format in the frontend.
- Perform background recognition after the email becomes valid.
- Check whether the email belongs to a registered user.
- Display the login modal for recognized users.

### Code-Based Login

- Enter the 6-digit login code.
- Verify the code through the Django API.
- Display the logged-in user's name after successful authentication.
- Show an error for an incorrect code.
- Allow the user to continue as a guest using "Continue as guest".

### Checkout

Checkout collects:

- Email
- Phone number
- Shipping address

The checkout information is stored in MySQL.

Checkout works for both:

- Registered/logged-in users
- Guest users

No payment processing is performed.

---

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- CSS

### Backend

- Python
- Django
- Django REST Framework

### Database

- MySQL 8.0+

---

## Project Architecture

```text
React Frontend
      |
      | REST API / JSON
      v
Django REST API
      |
      v
MySQL Database