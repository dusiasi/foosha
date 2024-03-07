import mongoose from 'mongoose';
import config from '../config';

// connecting to database
async function main() {
  try {
    await mongoose.connect(`${config.dbUrl}/${config.dbName}`);
    console.log('Database successfully connected to server 🚀');
  } catch (error) {
    console.log('🔥 Error in the database connection.');
  }
}

main();

export default mongoose;
