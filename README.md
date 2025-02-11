# HomePod - Smart Home Automation

HomePod is an innovative smart home automation solution designed to bring modern convenience and connectivity to your living space. Leveraging cutting-edge technologies such as React, Spring Boot, MQTT, and BLE Mesh, HomePod creates a seamless ecosystem that interconnects various smart devices within your home.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Demo](#demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The HomePod application allows users to:

- Manage IoT devices in their homes.
- Monitor sensor data from devices.
- Add, edit, and delete devices.
- View detailed information about each device.

## Features

- **Device Management**: Add, edit, and delete IoT devices.
- **Real-time Monitoring**: Monitor sensor data in real-time.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User Authentication**: Secure login and registration.
- **Notifications**: Receive notifications for important events.

## System Architecture

![Image](https://github.com/user-attachments/assetsf286c8f3-fa95-4833-b49a-b3a1b91c69f6)

## Demo

![Image](https://github.com/user-attachments/assets/2f97ef09-f974-48af-ad12-8fd48f0984d6)

![Image](https://github.com/user-attachments/assets/cdee8a72-0db9-4100-8747-3b1d9e189402)

![Image](https://github.com/user-attachments/assets/d815081a-68a4-4161-8804-d2bc0aa5b2cd)

![Image](https://github.com/user-attachments/assets/10a3b56c-854a-407c-860a-6c8274bd97a4)

## Installation

To install and run this project on your local machine, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/HiepTonight/homepod-client.git
    cd iot-dashboard
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/1) file from the `.env.example` template and configure the necessary environment variables.

4. Run the application in development mode:

    ```sh
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173`.

## Configuration

### [.env](http://_vscodecontentref_/2) File

Create a [.env](http://_vscodecontentref_/3) file in the root directory of the project and add the following environment variables:


## Docker Configuration

To run the application in Docker, you can use the provided [Dockerfile](http://_vscodecontentref_/4). Run the following commands to build and run the container:

```sh
docker build -t homepod-client .
docker run -p 80:80 homepod-client
```

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
