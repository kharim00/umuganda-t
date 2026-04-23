# Role-Based Auth Testing Guide

## Prerequisites
```
npm run db:seed
npm run dev
```
Base URL: `http://localhost:5000/api`

## 1. Register (role selection)
```
POST /auth/register
Content-Type: application/json
Body: 
{
  "name": "Test Leader",
  "phone": "0789999999", 
  "password": "test123",
  "role": "leader"
}
```
Expected: 201, token with role: "leader"

**Test invalid role**:
Body: `"role": "superadmin"` → 400 "Invalid role"

## 2. Login (token with role)
```
POST /auth/login
Body:
{
  "phone": "0781234567",
  "password": "admin123"
}
```
Expected: token with role: "admin"

Citizen: phone "0789123456" / "pass123"

Leader: "0781234568" / "leader123"

## 3. Protected Routes Tests

**Admin-only** (`/admin/stats`, `/admin/report`, `/users`):
```
GET /admin/stats
Authorization: Bearer <CITIZEN_TOKEN>
```
Expected: 403 "Access denied"

**Leader/Admin** (create task/event):
```
POST /tasks
Authorization: Bearer <CITIZEN_TOKEN>
Body: {"title": "test", "eventId": "uuid"}
```
Expected: 403

Success with leader token.

**Citizen** (my tasks, mark attendance):
```
GET /tasks/my
Authorization: Bearer <ADMIN_TOKEN>
```
Expected: OK (but role allows)

```
POST /attendance/mark
Authorization: Bearer <LEADER_TOKEN>
Body: {"eventId": "uuid"}
```
Expected: OK (citizen/leader? adjust if strict)

**Other**:
```
GET /fines/my Bearer <any_token>
GET /rewards/leaderboard Bearer <any_token>
PUT /fines/pay/:id Bearer <citizen_token>
```

Verify 401 no token, 403 wrong role.
