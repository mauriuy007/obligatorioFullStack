const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const getBookByName = async (bookName) => {
    if (!bookName) {
        throw new Error("Book name is required");
    }

    const searchParams = new URLSearchParams({
        q: `intitle:${bookName}`,
        key: apiKey,
        maxResults: "1",
        printType: "books",
    });

    const response = await fetch(`${GOOGLE_BOOKS_BASE_URL}?${searchParams.toString()}`);

    if (!response.ok) {
        throw new Error(`Google Books API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        return null;
    }

    const volume = data.items[0];

    return {
        id: volume.id,
        title: volume.volumeInfo?.title ?? null,
        authors: volume.volumeInfo?.authors ?? [],
        publishedDate: volume.volumeInfo?.publishedDate ?? null,
        description: volume.volumeInfo?.description ?? null,
        pageCount: volume.volumeInfo?.pageCount ?? null,
        categories: volume.volumeInfo?.categories ?? [],
        imageLinks: volume.volumeInfo?.imageLinks ?? {},
        infoLink: volume.volumeInfo?.infoLink ?? null,
    };
};