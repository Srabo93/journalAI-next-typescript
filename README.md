# journalAI-next-typescript

.env

```
DATABASE_URL="postgresql://postgres:keyboardcat@localhost:5432/journal?schema=public"
```

.env.local

```javascript
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

OPENAI_API_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/journal
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user

```

db folder in the root dir, for docker

```
mkdir db
echo "keyboardcat" >> db/password.txt
```
