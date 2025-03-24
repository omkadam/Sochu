// app/api/books/route.ts
import  db  from "@/db/drizzle";
import { books, pages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allBooks = await db.select().from(books);

    const booksWithPages = await Promise.all(
      allBooks.map(async (book) => {
        const bookPages = await db
          .select({
            imageUrl: pages.imageUrl,
            audioUrl: pages.audioUrl,
          })
          .from(pages)
          .where(eq(pages.bookId, book.id));

        return {
          _id: book.id.toString(), // Match MongoDB _id
          title: book.title,
          author: book.author,
          coverImage: book.coverImage,
          pages: bookPages,
          createdAt: book.createdAt,
          updatedAt: book.updatedAt,
        };
      })
    );

    return Response.json(booksWithPages);
  } catch (error) {
    console.error(error);
    return new Response("Error fetching books", { status: 500 });
  }
}
