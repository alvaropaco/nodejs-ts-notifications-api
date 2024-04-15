# Node.js TypeScript Notifications API [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=alvaropaco_nodejs-ts-notifications-api&metric=bugs)](https://sonarcloud.io/summary/new_code?id=alvaropaco_nodejs-ts-notifications-api) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=alvaropaco_nodejs-ts-notifications-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=alvaropaco_nodejs-ts-notifications-api) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alvaropaco_nodejs-ts-notifications-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alvaropaco_nodejs-ts-notifications-api) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=alvaropaco_nodejs-ts-notifications-api&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=alvaropaco_nodejs-ts-notifications-api)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=alvaropaco_nodejs-ts-notifications-api)](https://sonarcloud.io/summary/new_code?id=alvaropaco_nodejs-ts-notifications-api)

This project is a Notification API built with Node.js and TypeScript. It allows for the sending of notifications via different channels (e.g., SMS, WhatsApp) and provides an interface for receiving status updates via webhooks.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18.x or higher)
- npm (v6.x or higher) or yarn (v1.22.x or higher)
- Bun (v1.x or higher)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. **Clone the repository:**

```bash
  git clone https://github.com/yourusername/nodejs-ts-notifications-api.git
  cd nodejs-ts-notifications-api
```

2. **Install the dependencies:**

```bash
  npm install
```

3. **Set up environment variables:**
Configure your db connection in `./config/config.json` file.

4. **Run the migrations:**

```bash
  npx sequelize-cli db:migrate
```

## Running the Application
To run the application in development mode, use the following command:

```bash
yarn start
```
For production, first build the project and then start it:

```bash
yarn build
yarn serve
```

## Testing
To run the automated tests for this system:

```bash
yarn test
```

## Using the API
Once the application is running, you can access the API locally:

- Base URL: http://localhost:3000

### Accessing Swagger API Documentation
Swagger URL: http://localhost:3000/api-docs
Navigate to this URL in your web browser to view the Swagger UI, which provides detailed documentation of all the API endpoints, models, and allows you to execute API requests directly from the interface.

## Key Endpoints
POST /notifications - Send a notification.
GET /notifications/{id} - Retrieve a notification by ID.
POST /webhooks - Endpoint for external services to send updates.
Each endpoint allows for various operations which are detailed in the Swagger documentation, where you can also try out the API in real-time.

## Contact
Alvaro Paçó – @alvaropaco – alvaropaconeto@gmail.com
