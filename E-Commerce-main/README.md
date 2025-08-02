# 🍔 FoodZone - Swiggy/Zomato Clone

A full-stack food delivery web application built with **React.js**, **Node.js**, and **MongoDB**. Features secure **user authentication**, restaurant browsing, cart management, order placement, and rich UI animations inspired by apps like **Swiggy** and **Zomato**.

---

## 🚀 Features

### 🔐 Authentication
- User Signup & Login
- JWT-based secure sessions
- Form validation & password hashing

### 🏪 E-Commerce Platform
- Restaurant listings with search and filters
- Menu browsing by category
- Add to cart, remove items, and adjust quantity
- Real-time cart updates and price calculation
- Smooth animations and transitions (Framer Motion)

### 💳 Checkout & Orders
- Address selection and order summary
- (Optional) Payment integration (Stripe/Razorpay)
- Order confirmation with visual effects
- Order history tracking

### 🧑‍💼 User Dashboard
- Profile management
- Order history
- Saved addresses

### 🛠️ Admin Panel (Optional)
- Add/edit restaurants and dishes
- Manage orders and users
- Analytics dashboard

---

## 🧰 Tech Stack

| Frontend       | Backend         | Database    | Styling           | Other             |
|----------------|------------------|-------------|-------------------|-------------------|
| React.js       | Node.js + Express | MongoDB     | Tailwind CSS / Sass | JWT, bcrypt       |
| Redux Toolkit  | REST API         | Mongoose    | Framer Motion      | React Router      |

---

## 📁 Folder Structure

/client # React frontend
/src
/components
/pages
/redux
/utils

/server # Node.js backend
/controllers
/models
/routes
/middleware
/config

yaml
Copy code
Setup Backend
bash
Copy code
cd server
npm install
npm run dev
Create .env file:

ini
Copy code
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
3. Setup Frontend
bash
Copy code
cd ../client
npm install
npm start
📸 Screenshots
Add screenshots or screen recordings here to showcase the UI

🌐 Deployment
You can deploy this app using:

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: MongoDB Atlas

🧠 Future Enhancements
OTP login / Google auth

Payment gateway integration

PWA support for mobile

Real-time order tracking

🤝 Contributing
Feel free to fork the repo and open a PR! Contributions and feedback are welcome.
