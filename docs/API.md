# Smart Academy API Reference

Complete reference guide for all Smart Academy API endpoints.

**Base URL:** `https://api.smart-academy.com/api`

**Response Format:** JSON

---

## Table of Contents

1. [Health & Statistics](#health--statistics)
2. [Users Management](#users-management)
3. [Courses](#courses)
4. [Enrollments](#enrollments)
5. [Events](#events)
6. [Jobs Board](#jobs-board)
7. [Blog](#blog)
8. [Community](#community)
9. [AI Features](#ai-features)
10. [Categories](#categories)
11. [Error Handling](#error-handling)
12. [Rate Limiting](#rate-limiting)

---

## Health & Statistics

### Check API Health

**Endpoint:** `GET /healthz`

**Description:** Verify that the API is running and operational.

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/healthz \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "status": "ok"
}
```

**Status Codes:**
- `200 OK` - API is healthy
- `503 Service Unavailable` - API is down

---

### Get Platform Statistics

**Endpoint:** `GET /stats`

**Description:** Retrieve overall platform statistics and metrics.

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/stats \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "totalStudents": 125000,
  "totalCourses": 4500,
  "totalInstructors": 1200,
  "totalInstitutions": 350,
  "totalCountries": 120,
  "totalCertificates": 89000,
  "totalJobPlacements": 45000,
  "satisfactionRate": 96.5
}
```

---

## Users Management

### List All Users

**Endpoint:** `GET /users`

**Description:** Get a list of all platform users, optionally filtered by role.

**Query Parameters:**
- `role` (string, optional) - Filter by user role: `student`, `teacher`, `admin`

**Example Request:**
```bash
curl -X GET "https://api.smart-academy.com/api/users?role=student" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "student",
    "avatar": "https://...",
    "bio": "Learning full-stack development",
    "skills": ["JavaScript", "React"],
    "institution": "MIT",
    "country": "USA"
  }
]
```

---

### Create New User

**Endpoint:** `POST /users`

**Description:** Create a new user account.

**Required Fields:**
- `name` (string) - User's full name
- `email` (string) - Valid email address

**Optional Fields:**
- `role` (string) - Default: `student`
- `avatar` (string) - Profile picture URL
- `bio` (string) - User biography
- `skills` (array) - Array of skill strings
- `institution` (string) - School/University name
- `country` (string) - Country of residence

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/users \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "student",
    "skills": ["JavaScript", "React"],
    "country": "USA"
  }'
```

**Response:**
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "student",
  "avatar": null,
  "bio": null,
  "skills": ["JavaScript", "React"],
  "institution": null,
  "country": "USA"
}
```

**Status Codes:**
- `201 Created` - User created successfully
- `400 Bad Request` - Missing required fields

---

### Get User Profile

**Endpoint:** `GET /users/:id`

**Description:** Get detailed information about a specific user.

**Path Parameters:**
- `id` (integer) - User ID

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/users/1 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "student",
  "avatar": "https://...",
  "bio": "Learning full-stack development",
  "skills": ["JavaScript", "React"],
  "institution": "MIT",
  "country": "USA"
}
```

---

### Get User Dashboard

**Endpoint:** `GET /users/dashboard/:id`

**Description:** Get personalized dashboard data for a user including learning statistics and recommendations.

**Path Parameters:**
- `id` (integer) - User ID

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/users/dashboard/1 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "userId": 1,
  "enrolledCourses": 5,
  "completedCourses": 2,
  "totalHoursLearned": 45.5,
  "certificates": 2,
  "currentStreak": 7,
  "skillBadges": 4,
  "recentEnrollments": [
    {
      "courseId": 10,
      "userId": 1,
      "enrolledAt": "2026-05-15T10:30:00Z",
      "progress": 75
    }
  ],
  "recommendedCourses": [
    {
      "id": 20,
      "title": "Advanced React Patterns",
      "level": "intermediate"
    }
  ]
}
```

---

## Courses

### List Courses

**Endpoint:** `GET /courses`

**Description:** Get a list of all courses with optional filtering.

**Query Parameters:**
- `category` (string, optional) - Filter by category
- `level` (string, optional) - Filter by level: `beginner`, `intermediate`, `advanced`
- `search` (string, optional) - Search by title or description

**Example Request:**
```bash
curl -X GET "https://api.smart-academy.com/api/courses?category=programming&level=beginner" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "JavaScript Fundamentals",
    "description": "Learn JavaScript basics",
    "category": "programming",
    "level": "beginner",
    "instructor": "John Smith",
    "price": 49.99,
    "rating": 4.8,
    "students": 5000,
    "isFeatured": true
  }
]
```

---

### Create Course

**Endpoint:** `POST /courses`

**Description:** Create a new course (instructor/admin only).

**Required Fields:**
- `title` (string) - Course title
- `description` (string) - Course description
- `instructor` (string) - Instructor name

**Optional Fields:**
- `category` (string)
- `level` (string)
- `price` (number)
- `thumbnail` (string) - Course image URL

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/courses \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JavaScript Fundamentals",
    "description": "Learn JavaScript basics",
    "instructor": "John Smith",
    "category": "programming",
    "level": "beginner",
    "price": 49.99
  }'
```

---

### Get Course Details

**Endpoint:** `GET /courses/:id`

**Description:** Get detailed information about a specific course.

**Path Parameters:**
- `id` (integer) - Course ID

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/courses/1 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Enrollments

### Get User Enrollments

**Endpoint:** `GET /enrollments`

**Description:** Get all courses a user is enrolled in.

**Query Parameters:**
- `userId` (integer, required) - User ID

**Example Request:**
```bash
curl -X GET "https://api.smart-academy.com/api/enrollments?userId=1" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "courseId": 10,
    "enrolledAt": "2026-05-15T10:30:00Z",
    "progress": 75,
    "completedAt": null
  }
]
```

---

### Enroll in Course

**Endpoint:** `POST /enrollments`

**Description:** Enroll a user in a course.

**Required Fields:**
- `userId` (integer) - User ID
- `courseId` (integer) - Course ID

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/enrollments \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "courseId": 10
  }'
```

**Response:**
```json
{
  "id": 1,
  "userId": 1,
  "courseId": 10,
  "enrolledAt": "2026-05-18T08:30:00Z",
  "progress": 0,
  "completedAt": null
}
```

---

### Update Enrollment Progress

**Endpoint:** `PUT /enrollments/:id`

**Description:** Update course progress for an enrollment.

**Path Parameters:**
- `id` (integer) - Enrollment ID

**Optional Fields:**
- `progress` (number) - Progress percentage (0-100)
- `completedAt` (string) - ISO 8601 timestamp when course was completed

**Example Request:**
```bash
curl -X PUT https://api.smart-academy.com/api/enrollments/1 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "progress": 100,
    "completedAt": "2026-05-18T14:30:00Z"
  }'
```

---

## Events

### List Events

**Endpoint:** `GET /events`

**Description:** Get a list of events.

**Query Parameters:**
- `upcoming` (boolean, optional) - Only show upcoming events (default: all)

**Example Request:**
```bash
curl -X GET "https://api.smart-academy.com/api/events?upcoming=true" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "React Workshop",
    "description": "Learn advanced React patterns",
    "type": "webinar",
    "hostName": "Sarah Johnson",
    "scheduledAt": "2026-05-25T15:00:00Z",
    "durationMinutes": 60,
    "maxAttendees": 500,
    "isFree": true,
    "price": 0,
    "meetingUrl": "https://zoom.us/j/..."
  }
]
```

---

### Create Event

**Endpoint:** `POST /events`

**Description:** Create a new event.

**Required Fields:**
- `title` (string) - Event title
- `hostName` (string) - Host name
- `scheduledAt` (string) - ISO 8601 datetime

**Optional Fields:**
- `description` (string)
- `type` (string) - Default: `webinar`
- `durationMinutes` (integer) - Default: 60
- `maxAttendees` (integer)
- `isFree` (boolean) - Default: true
- `price` (number)
- `meetingUrl` (string) - Zoom/Meet link
- `tags` (array)

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Workshop",
    "hostName": "Sarah Johnson",
    "scheduledAt": "2026-05-25T15:00:00Z",
    "durationMinutes": 60,
    "isFree": true
  }'
```

---

## Jobs Board

### Search Jobs

**Endpoint:** `GET /jobs`

**Description:** Search for job listings.

**Query Parameters:**
- `search` (string, optional) - Search by title or company
- `type` (string, optional) - Filter by type: `full-time`, `part-time`, `contract`

**Example Request:**
```bash
curl -X GET "https://api.smart-academy.com/api/jobs?search=developer&type=full-time" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Senior React Developer",
    "company": "Tech Corp",
    "location": "New York, NY",
    "type": "full-time",
    "description": "We are looking for...",
    "category": "Technology",
    "salaryMin": 120000,
    "salaryMax": 160000,
    "currency": "USD",
    "isRemote": true,
    "skills": ["React", "TypeScript", "Node.js"]
  }
]
```

---

### Post New Job

**Endpoint:** `POST /jobs`

**Description:** Post a new job listing.

**Required Fields:**
- `title` (string)
- `company` (string)
- `description` (string)

**Optional Fields:**
- `location` (string) - Default: "Remote"
- `type` (string) - Default: "full-time"
- `category` (string) - Default: "Technology"
- `salaryMin` (number)
- `salaryMax` (number)
- `currency` (string) - Default: "USD"
- `isRemote` (boolean) - Default: false
- `skills` (array)
- `requirements` (array)
- `experienceYears` (number) - Default: 0
- `expiresAt` (string) - ISO 8601 datetime

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/jobs \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior React Developer",
    "company": "Tech Corp",
    "description": "We are looking for...",
    "type": "full-time",
    "salaryMin": 120000,
    "salaryMax": 160000,
    "isRemote": true
  }'
```

---

## Blog

### Get Blog Posts

**Endpoint:** `GET /blog`

**Description:** Get blog posts with optional filtering.

**Query Parameters:**
- `category` (string, optional) - Filter by category
- `limit` (integer, optional) - Maximum posts to return

**Example Request:**
```bash
curl -X GET "https://api.smart-academy.com/api/blog?category=education&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Getting Started with React",
    "slug": "getting-started-with-react-1234567890",
    "content": "React is a JavaScript library for building...",
    "authorId": 5,
    "authorName": "John Smith",
    "category": "education",
    "excerpt": "A beginner's guide to React",
    "thumbnail": "https://...",
    "authorAvatar": "https://...",
    "tags": ["react", "javascript"],
    "readMinutes": 5,
    "viewCount": 1250
  }
]
```

---

### Create Blog Post

**Endpoint:** `POST /blog`

**Description:** Create a new blog post.

**Required Fields:**
- `title` (string)
- `content` (string)
- `authorId` (integer)
- `authorName` (string)

**Optional Fields:**
- `category` (string) - Default: "General"
- `excerpt` (string)
- `thumbnail` (string) - Image URL
- `authorAvatar` (string) - Author profile image
- `tags` (array)
- `readMinutes` (integer) - Default: 5

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/blog \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with React",
    "content": "React is a JavaScript library...",
    "authorId": 5,
    "authorName": "John Smith",
    "category": "education",
    "tags": ["react", "javascript"]
  }'
```

---

## Community

### Get Community Posts

**Endpoint:** `GET /community`

**Description:** Get recent community posts (ordered by newest first).

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/community \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 1,
    "content": "Just completed the React course!",
    "authorId": 1,
    "authorName": "Jane Doe",
    "authorAvatar": "https://...",
    "authorRole": "student",
    "topic": "Learning",
    "createdAt": "2026-05-18T08:30:00Z",
    "likeCount": 5
  }
]
```

---

### Create Community Post

**Endpoint:** `POST /community`

**Description:** Create a new community post/discussion.

**Required Fields:**
- `content` (string) - Post content
- `authorId` (integer)
- `authorName` (string)

**Optional Fields:**
- `topic` (string)
- `authorRole` (string) - Default: "student"
- `authorAvatar` (string)

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/community \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Just completed the React course!",
    "authorId": 1,
    "authorName": "Jane Doe",
    "topic": "Learning"
  }'
```

---

### Like Community Post

**Endpoint:** `POST /community/:id/like`

**Description:** Add a like to a community post.

**Path Parameters:**
- `id` (integer) - Post ID

**Example Request:**
```bash
curl -X POST https://api.smart-academy.com/api/community/1/like \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "id": 1,
  "content": "Just completed the React course!",
  "likeCount": 6
}
```

---

## AI Features

### AI Search

**Endpoint:** `GET /ai/search`

**Description:** Perform intelligent cross-platform search across courses, jobs, events, and blog posts.

**Query Parameters:**
- `q` (string, required) - Search query
- `type` (string, optional) - Filter by type: `courses`, `jobs`, `events`, `all` (default: `all`)

**Example Request:**
```bash
curl -X GET "https://api.smart-academy.com/api/ai/search?q=react&type=courses" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "query": "react",
  "type": "courses",
  "courses": [
    {
      "id": 1,
      "title": "React Fundamentals",
      "description": "Learn React basics"
    }
  ],
  "jobs": [],
  "events": [],
  "blogs": [],
  "totalResults": 1
}
```

---

### Get Personalized Recommendations

**Endpoint:** `GET /ai/recommendations/:userId`

**Description:** Get AI-powered personalized course recommendations based on user profile and learning history.

**Path Parameters:**
- `userId` (integer) - User ID

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/ai/recommendations/1 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
[
  {
    "id": 20,
    "title": "Advanced React Patterns",
    "description": "Master advanced React patterns",
    "level": "advanced",
    "category": "programming"
  }
]
```

---

## Categories

### List Categories

**Endpoint:** `GET /categories`

**Description:** Get all available categories for courses, jobs, and events.

**Example Request:**
```bash
curl -X GET https://api.smart-academy.com/api/categories \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "courseCategories": [
    "Programming",
    "Data Science",
    "Web Development",
    "Mobile Development"
  ],
  "jobCategories": [
    "Technology",
    "Education",
    "Healthcare"
  ],
  "eventTypes": [
    "webinar",
    "workshop",
    "conference"
  ]
}
```

---

## Error Handling

### HTTP Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request or missing required fields
- `401 Unauthorized` - Missing or invalid API key
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### Error Response Format

```json
{
  "error": "Invalid user email",
  "code": "VALIDATION_ERROR",
  "statusCode": 400
}
```

---

## Rate Limiting

- **Requests per minute:** 60 (free tier), 1000 (pro tier)
- **Rate limit headers:**
  - `X-RateLimit-Limit` - Request limit
  - `X-RateLimit-Remaining` - Remaining requests
  - `X-RateLimit-Reset` - Reset timestamp

**Example Response Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1526403600
```

---

## Next Steps

- View [Interactive API Docs](index.html)
- Read [Main Documentation](README.md)
- Contact [Support](mailto:support@smartacademy.com)

