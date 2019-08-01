# bakery-react-ts
Bakery application with NodeJS, Koa, React, Router, TypeScript and Jest

## To run:

Start the `nodejs` server:
```$bash
NODE_CONFIG=config/dev.json node index.js
```

Run the React app:
```
npm run start
```

## To test:
I have set up a global install of `jest` to work around the React's built-in jest.

```text
npm install -g jest
npm run jest
```

The API server is available on [http://localhost:3001](http://localhost:3001).

The React front-end is available on [http://localhost:3000](http://localhost:3000).