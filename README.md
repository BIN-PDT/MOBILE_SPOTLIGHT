**1. PROJECT**

```
git clone https://github.com/BIN-PDT/MOBILE_SPOTLIGHT.git && rm -rf MOBILE_SPOTLIGHT/.git
```

_For privacy reasons, follow the format of `.env.example` and replace the sensitive information in `.env` with your own._

- _Register Clerk to obtain `PUBLISHABLE_KEY`_.

- _Configure Clerk's `WEBHOOKS` & `JWT_TEMPLATES` to work with Convex_.

**2. DEPENDENCY**

```
npm install
```

**3. RUN CONVEX**

```
npm run convex:dev
```

**4. RUN APPLICATION**

```
npm run start
```
