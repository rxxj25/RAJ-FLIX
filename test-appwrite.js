import { Client, Databases, Query, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69b659c7003c65c60cf9');

const database = new Databases(client);
const DATABASE_ID = '69b65a970031bd7b0400';
const TABLE_ID = 'metrics';

async function runTest() {
    try {
        console.log("Testing updateSearchCount equivalent...");
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.equal('SearchTerm', 'Inception')
        ]);
        console.log("Found:", result.documents.length);
        if (result.documents.length === 0) {
            console.log("Creating new document...");
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                SearchTerm: 'Inception',
                count: 1,
                movie_id: 27205,
                poster_url: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
            });
            console.log("Document created successfully!");
        } else {
            console.log("Document exists!");
        }

        console.log("Testing getTrendingMovies equivalent...");
        const trending = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ]);
        console.log("Trending query success. Count:", trending.documents.length);
    } catch (e) {
        console.error("Error:", e);
    }
}

runTest();
