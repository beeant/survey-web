# survey-web (frontend)

## Demo

[https://beeant.github.io/survey-web](https://beeant.github.io/survey-web)

## Screenshot

#### Desktop

![Survey desktop screenshot](https://user-images.githubusercontent.com/162004/100721288-7c01be00-3402-11eb-9454-3bb75c5eaf6e.png)

#### Mobile

<img alt="Survey mobile screenshot" src="https://user-images.githubusercontent.com/162004/100721425-a6ec1200-3402-11eb-8742-4e4195d63244.png" width="320px" />

## Setup

#### Dependencies
- Node.js `v12.18.0`
- yarn `1.22.4`

#### Start development server
1. Install packages
```
yarn
````
2. Edit `.env` file according to local environment and preferences
3. Start development server
```
yarn start
```

#### Build for Production
1. Install packages
```
yarn
```
2. Edit `.env` file according to production environment and preferences
3. Build for Production
```
yarn start
```

#### Run server with Docker
1. Build Docker image
```
docker build -t survey-web:latest .
```
2. Run Docker image
```
docker run -p 3000:80 survey-web:latest
```
3. Open [http://localhost:3000](http://localhost:3000)
