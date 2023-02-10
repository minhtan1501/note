import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import {} from "dotenv/config";
import mongoose from "mongoose";
import typeDefs from "./Schema/index.js";
import resolvers from "./resolvers/index.js";
import "./firebaseConfig.js";
import { getAuth } from 'firebase-admin/auth';

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const authorizationJWT = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];

    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        res.locals.uid = decodedToken.uid
        next();
      })
      .catch((err) => {
        return res.status(403).json({ message: "Forbidden", error: err });
      });
  } else {
    next()
    return res.status(403).json({ message: "Unauthorized" });
  }
};

app.use(cors(), authorizationJWT, express.json(), expressMiddleware(server,{
  context: async ({req,res}) =>{
    return {uid: res.locals.uid}
  }
}));
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUniFiedTopology: true,
  })
  .then(async () => {
    await new Promise((resolve, reject) =>
      httpServer.listen({ port: PORT }, resolve)
    );
    console.log("Server started at port 4000");
  });
