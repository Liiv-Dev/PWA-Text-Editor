import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const postDb = async (content) => console.error('postDb not implemented');
export const putDb = async (content) => console.error('putDb not implemented');

// Add logic for a method that gets all the content from the database
export const getAllDb = async () => console.error('getAllDb not implemented');
export const getDb = async () => console.error('getDb not implemented');

initdb();
