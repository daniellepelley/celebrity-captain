import app from './app'
import databseInit from "./data/databaseInit";

databseInit.init();

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`server is listening on ${port}`))
