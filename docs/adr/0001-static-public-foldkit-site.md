# Static public Foldkit site

This repo deploys as static files instead of a Hono/Vercel function because the book-site domain has no database, auth boundary, or private API. Foldkit still owns the client model, messages, update loop, and navigation; Hono remains only as the local development static server because it keeps local serving simple.
