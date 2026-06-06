# College Discovery Platform Backend

Backend MVP for the internship's College Discovery Platform track, implemented with the existing MERN-style server setup in this repository.

## Implemented Features

- College listing API with search, filtering, sorting, and pagination
- College detail API
- Compare colleges API for 2 to 3 colleges
- Predictor API based on exam and rank
- Authentication with signup and login
- Saved colleges for authenticated users
- MongoDB-first repository design with in-memory fallback when `MONGO_URI` is missing

## Run Locally

```bash
cd server
npm run dev
```

Optional `.env` values:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/college-discovery
JWT_SECRET=replace-this-in-production
CLIENT_URL=http://localhost:3000
TOKEN_TTL_SECONDS=604800
```

## Main Endpoints

```text
GET    /api/health
GET    /api/colleges
GET    /api/colleges/:slug
POST   /api/colleges/compare
POST   /api/predictor
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/users/me
GET    /api/users/saved-colleges
POST   /api/users/saved-colleges/:slug
DELETE /api/users/saved-colleges/:slug
```
