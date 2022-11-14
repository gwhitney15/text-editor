import { openDB } from 'idb';
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(database) {
      if (database.objectStoreNames.contains('jate')) {
        console.log('already exists');
        return;
      }
      database.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('created database');
    },
  });

export const putDb = async (data) => {
  console.log('PUT to the database');
  const getDb = await openDB('jate', 1);
  const tx = getDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const look = store.put({ id: 1, value: data });
  const result = await look;
  console.log('data was saved', result);
};


export const getDb = async () => {
  console.log('GET from the database');
  const getDb = await openDB('jate', 1);
  const tx = getDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const look = store.getAll();
  const result = await look;
  console.log('result.value', result);
  return result
};


initdb();