
# FruitLens
“FruitLens” is an innovative mobile application designed to enhance the educational experience by providing users with a comprehensive platform for identifying and learning about fruits. Users can take pictures of fruits, and the system uses advanced image recognition technology to identify them. This application also provides detailed information about each fruit, thereby increasing users' understanding of fruits more deeply. By combining education and technology, this application makes it easier to recognize fruits and fosters curiosity and knowledge in users of all ages.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:
```bash
npm install express
npm install multer
npm install @google-cloud/storage
npm install @tensorflow/tfjs-node
npm install firebase-admin
npm install uuid
npm install bcrypt
npm install jsonwebtoken
```

Install and configure the Google Cloud SDK:
- Download and install the Google Cloud SDK from [here](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe).
- Initialize the SDK and authenticate with your Google account:
```bash
gcloud init
```
- Set your Google Cloud project:
```bash
gcloud config set project your-project-id
```

### Installing and Running

1. Clone this repository.
```bash
git clone https://github.com/C241-PS232/fruitlens-api.git
```
2. Navigate to the project directory.
```bash
cd fruitlens-api
```
3. Install the required dependencies.
```bash
npm install
```
4. Set up your Firebase project.
5. Create a `.env` file in the root directory and add your environment variables:
```
JWT_SECRET=your_jwt_secret
```
6. Start the application.
```bash
npm start
```
7. Access the application at `http://localhost:8080`.

## Team Information
- **Team Members:**
  - **ML**: Indira Elza Yunita - Machine Learning Development - [caloemhood](https://github.com/caloemhood)
  - **ML**: Jauza Zahraza - Machine Learning Development - [jzahraza](https://github.com/jzahraza)
  - **ML**: Irnada Al Anati - Machine Learning Development - [irnadaaa](https://github.com/irnadaaa)
  - **CC**: Abiyyu Dhiyaul Haq - Cloud Computing - [Enotherms](https://github.com/Enotherms)
  - **CC**: Kelvin Pahotton Simamora - Cloud Computing - [kelvin77777](https://github.com/kelvin77777)
  - **MD**: Muhammad Arafie Setiawan - Mobile Development - [Arafie2603](https://github.com/Arafie2603)
  - **MD**: Dimas Nyondro Radityo - Mobile Development - [Nyondro](https://github.com/Nyondro)

## Tools, IDE, Library, and Resources

### Tools
- **Git:** Distributed version control system.
- **Postman:** Tool for testing and interacting with APIs.

### IDE
- **Visual Studio Code:** Source code editor supporting JavaScript and Python.
- **Android Studio:** Official IDE for Android application development.

### Library
- **TensorFlow:** Library for numerical computation and machine learning.
- **Matplotlib:** Library for creating visualizations in Python.
- **Scikit-Learn:** Machine learning library for Python.
- **Node.js:** Back-end JavaScript runtime environment.
- **Express:** Web application framework for Node.js.
- **JWT & OAuth:** Technologies for securing communications.
- **CameraX:** Library for easing camera app development.
- **DataStore:** Data storage solution.
- **Room:** Persistence library for SQLite.
- **SQLite:** Relational database management system.
- **Retrofit:** Type-safe REST client for Android and Java.

### Resources
- **Google Cloud Platform:** Suite of cloud computing services.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
