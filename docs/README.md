# Smart Academy Documentation

Welcome to Smart Academy, an **AI-powered global education platform** offering courses, events, jobs, blog, community, and intelligent search capabilities.

## 📚 Documentation

- **[Interactive API Docs](index.html)** - Visual API endpoint reference
- **[Complete API Reference](API.md)** - Detailed endpoint documentation with examples

---

## 🚀 Getting Started

### Prerequisites
- Valid API key (contact support@smartacademy.com)
- Basic knowledge of REST APIs
- HTTP client tool (cURL, Postman, etc.)

### Quick Setup

1. **Get your API key** from your account dashboard
2. **Set the base URL:**
   ```
   https://api.smart-academy.com/api
   ```
3. **Add authentication header:**
   ```
   Authorization: Bearer YOUR_API_KEY
   ```

### Your First API Call

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

---

## 🎓 Platform Features

### Courses
- Browse 4500+ courses across all levels
- Get personalized recommendations
- Track progress and earn certificates
- Filter by category and difficulty level

### Events
- Attend webinars and workshops
- Network with instructors and peers
- Access event recordings
- Register for upcoming events

### Jobs Board
- Discover 45,000+ job opportunities
- Apply to positions matching your skills
- Get job recommendations based on your learning
- Connect with top employers

### Blog
- Read expert articles and tutorials
- Learn best practices from industry leaders
- Share your knowledge with the community
- Follow your favorite authors

### Community
- Connect with 125,000+ learners worldwide
- Ask questions and get answers
- Share your learning journey
- Build professional networks

### AI-Powered Search
- Intelligent cross-platform search
- Search courses, jobs, events, and blog posts
- Personalized content recommendations
- Smart matching based on your profile

---

## 📊 Platform Statistics

- **125,000+** Active Students
- **4,500+** Courses Available
- **1,200+** Expert Instructors
- **350+** Partner Institutions
- **120** Countries Represented
- **89,000+** Certificates Awarded
- **45,000+** Job Placements
- **96.5%** Student Satisfaction Rate

---

## 🏗️ Architecture Overview

### Technology Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL Database
- Pino Logger

**Features:**
- RESTful API
- JSON responses
- CORS enabled
- Request/Response logging
- Error handling

### API Structure

```
GET    /healthz                    # Health check
GET    /stats                      # Platform statistics

# Users Management
GET    /users                      # List users
POST   /users                      # Create user
GET    /users/:id                  # Get user profile
GET    /users/dashboard/:id        # Get dashboard

# Courses
GET    /courses                    # List courses
POST   /courses                    # Create course
GET    /courses/:id                # Get course

# Enrollments
GET    /enrollments                # Get enrollments
POST   /enrollments                # Enroll in course
PUT    /enrollments/:id            # Update progress

# Events
GET    /events                     # List events
POST   /events                     # Create event
GET    /events/:id                 # Get event

# Jobs
GET    /jobs                       # Search jobs
POST   /jobs                       # Post job
GET    /jobs/:id                   # Get job

# Blog
GET    /blog                       # Get posts
POST   /blog                       # Create post
GET    /blog/:id                   # Get post

# Community
GET    /community                  # Get posts
POST   /community                  # Create post
POST   /community/:id/like         # Like post

# AI Features
GET    /ai/search                  # AI search
GET    /ai/recommendations/:userId # Get recommendations
```

---

## 💡 Common Use Cases

### 1. User Registration & Profile

```javascript
// Create a new user account
const user = await fetch('https://api.smart-academy.com/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer API_KEY'
  },
  body: JSON.stringify({
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'student',
    skills: ['JavaScript', 'React'],
    country: 'USA'
  })
});
```

### 2. Explore Courses & Enroll

```javascript
// Search for programming courses
const courses = await fetch('https://api.smart-academy.com/api/courses?category=programming', {
  headers: { 'Authorization': 'Bearer API_KEY' }
});

// Enroll in a course
const enrollment = await fetch('https://api.smart-academy.com/api/enrollments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer API_KEY'
  },
  body: JSON.stringify({
    userId: 1,
    courseId: 10
  })
});
```

### 3. Track Learning Progress

```javascript
// Get user dashboard
const dashboard = await fetch('https://api.smart-academy.com/api/users/dashboard/1', {
  headers: { 'Authorization': 'Bearer API_KEY' }
});

const stats = await dashboard.json();
console.log(`Courses: ${stats.enrolledCourses}`);
console.log(`Hours Learned: ${stats.totalHoursLearned}`);
console.log(`Certificates: ${stats.certificates}`);
```

### 4. Find Jobs & Career Opportunities

```javascript
// Search for developer positions
const jobs = await fetch('https://api.smart-academy.com/api/jobs?search=developer&type=full-time', {
  headers: { 'Authorization': 'Bearer API_KEY' }
});

// Get personalized recommendations
const recommendations = await fetch('https://api.smart-academy.com/api/ai/recommendations/1', {
  headers: { 'Authorization': 'Bearer API_KEY' }
});
```

### 5. Read & Share Content

```javascript
// Get blog posts
const blog = await fetch('https://api.smart-academy.com/api/blog?category=education&limit=10', {
  headers: { 'Authorization': 'Bearer API_KEY' }
});

// Create a community post
const post = await fetch('https://api.smart-academy.com/api/community', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer API_KEY'
  },
  body: JSON.stringify({
    content: 'Just completed the React course!',
    authorId: 1,
    authorName: 'Jane Doe',
    topic: 'Learning'
  })
});
```

---

## 🔐 Security Best Practices

### API Key Management
- ✅ Store API keys in environment variables
- ✅ Rotate keys regularly
- ✅ Use separate keys for development and production
- ❌ Never commit keys to version control
- ❌ Never share keys publicly

### Request Security
- ✅ Always use HTTPS
- ✅ Validate input data
- ✅ Implement rate limiting
- ✅ Use proper error handling
- ❌ Never log sensitive data

### Example: Secure Setup
```javascript
// .env file (never commit this!)
REACT_APP_API_KEY=your_api_key_here
REACT_APP_API_BASE_URL=https://api.smart-academy.com/api

// Config file
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
  }
};
```

---

## 🧪 Development Guide

### Setup Local Development

```bash
# Clone repository
git clone https://github.com/mohangit01/Smart-Academy.git
cd Smart-Academy

# Install dependencies
pnpm install

# Build project
pnpm run build

# Start API server
PORT=3000 pnpm run dev
```

### Environment Variables

```bash
# Server
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/smartacademy

# API
API_KEY=your_development_api_key
CORS_ORIGIN=http://localhost:3000
```

### Testing Endpoints

Use Postman or similar tool:

1. **Import Base URL:** `http://localhost:3000/api`
2. **Add Header:** `Authorization: Bearer YOUR_API_KEY`
3. **Test endpoints** in the [Interactive Docs](index.html)

---

## ⚠️ Troubleshooting

### Common Issues

#### 401 Unauthorized
**Problem:** API key is missing or invalid
**Solution:**
- Check API key in Authorization header
- Verify key is not expired
- Regenerate key from dashboard

#### 400 Bad Request
**Problem:** Missing required fields or invalid data
**Solution:**
- Check endpoint documentation
- Validate all required fields
- Ensure correct data types

#### 429 Too Many Requests
**Problem:** Rate limit exceeded
**Solution:**
- Implement request throttling
- Wait before retrying
- Contact support for higher limits

#### 500 Internal Server Error
**Problem:** Server error
**Solution:**
- Check API status page
- Retry with exponential backoff
- Contact support with error details

---

## 📖 Learning Resources

### Courses on Platform
- API Development with Node.js
- Building REST APIs
- Web Development Fundamentals
- Full-Stack Development

### External Resources
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [OpenAPI Specification](https://swagger.io/specification/)

---

## 🤝 Contributing

Found an issue or have suggestions? Help us improve!

1. **Report Issues:** [GitHub Issues](https://github.com/mohangit01/Smart-Academy/issues)
2. **Submit Pull Requests:** [GitHub PRs](https://github.com/mohangit01/Smart-Academy/pulls)
3. **Suggest Features:** [Discussions](https://github.com/mohangit01/Smart-Academy/discussions)

---

## 📞 Support

Need help? We're here for you!

- **📧 Email:** support@smartacademy.com
- **💬 Chat:** Live chat on platform
- **📱 Phone:** +1-XXX-XXX-XXXX
- **🐛 GitHub:** [Issues & Discussions](https://github.com/mohangit01/Smart-Academy)
- **💬 Community:** [Discord Community](https://discord.gg/smartacademy)

### Support Hours
- Monday - Friday: 9 AM - 6 PM UTC
- Saturday - Sunday: 10 AM - 4 PM UTC
- Emergency: 24/7 support available

---

## 📋 Roadmap

### Q2 2026
- [ ] Mobile app release
- [ ] Advanced filtering for jobs
- [ ] Improved recommendation engine

### Q3 2026
- [ ] Live coding challenges
- [ ] Video streaming optimization
- [ ] Payment integration

### Q4 2026
- [ ] AI-powered tutoring
- [ ] Certification partnerships
- [ ] Global expansion

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

Special thanks to:
- All educators and instructors
- Community members and learners
- Open-source contributors
- Our amazing support team

---

**Last Updated:** May 18, 2026

For the latest updates, visit our [GitHub Repository](https://github.com/mohangit01/Smart-Academy)

