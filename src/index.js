import app from './app.js'
import { connectDB } from './db.js'

const port = 3001;

connectDB();

app.listen(port);
console.log('Server on port', port)