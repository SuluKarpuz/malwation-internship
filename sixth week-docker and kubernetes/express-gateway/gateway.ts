const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

console.log("work");
const gateway = new ApolloGateway({
  //burada url olarak diğer containerin adını vermek gerekiyor çünkü localhost dersek kendi localhostuna bakıyor ana makinanınkine değil
  serviceList: [{ name: "hello", url: "http://nestjs-api:3000/graphql" }],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen(4000).then(({ url }: { url: string }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
