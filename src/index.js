const express = require('express');
const { ServerConfig, MessageQueueConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server at PORT : ${ServerConfig.PORT}`);
  await MessageQueueConfig.connectQueue();
});
