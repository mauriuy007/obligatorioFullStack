import { GoogleBooksServiceError } from "../errors/google.books.service.error.js";
import { InvalidBookError } from "../errors/invalid.book.error.js";

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const obtenerLibroPorNombre = async (nombreLibro) => {
    if (!nombreLibro) {
        throw new InvalidBookError();
    }

    const params = new URLSearchParams({
        q: `intitle:${nombreLibro}`,
        maxResults: "1",
        printType: "books",
        langRestrict: "es"
        
    });

    if (apiKey) {
        params.set("key", apiKey);
    }

    const respuesta = await fetch(`${GOOGLE_BOOKS_BASE_URL}?${params.toString()}`);

    if (!respuesta.ok) {
        if (respuesta.status === 429) {
            throw new GoogleBooksServiceError();
        }

        throw new GoogleBooksServiceError(`Error Google Api: ${respuesta.status}`);
    }

    const data = await respuesta.json();

    if (!data.items || data.items.length === 0) {
        return null;
    }

    const volume = data.items[0];

    return {
        id: volume.id,
        title: volume.volumeInfo?.title ?? null,
        authors: volume.volumeInfo?.authors ?? [],
        publishedDate: volume.volumeInfo?.publishedDate ?? null,
        description: volume.volumeInfo?.description?.slice(30,1000) ?? null,
        pageCount: volume.volumeInfo?.pageCount ?? null,
        categories: volume.volumeInfo?.categories ?? [],
        imageLinks: volume.volumeInfo?.imageLinks ?? {},
        infoLink: volume.volumeInfo?.infoLink ?? null,
    };
};

export const obtenerOpcionesLibros = async (titulo) => {
    if (!titulo) {
        return [];
    }

    const params = new URLSearchParams({
        q: `intitle:${titulo}`,
        maxResults: "5",
        printType: "books",
        langRestrict: "es"
    });

    if (apiKey) {
        params.set("key", apiKey);
    }

    const respuesta = await fetch(
        `${GOOGLE_BOOKS_BASE_URL}?${params.toString()}`
    );

    if (!respuesta.ok) {
        throw new GoogleBooksServiceError();
    }

    const data = await respuesta.json();

    if (!data.items) {
        return [];
    }

    return data.items.map(item => ({
        titulo: item.volumeInfo?.title ?? "",
        autor: item.volumeInfo?.authors?.join(", ") ?? "Autor desconocido",
        genero: item.volumeInfo?.categories?.[0] ?? "Sin género",
        descripcion: item.volumeInfo?.description?.slice(30,1000) ?? ""
    }));
};