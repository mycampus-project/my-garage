# Garage Backend

## Authorization

Authorization is performed Nokia's authentication used as the guarantee.

### authMiddleware

This project has an authentication middleware that provides user object under `request.user`.
Whenever this service receives a request, `authMiddleware` checks the token and finds user of that token from the DB.
It assigns the user to `request.user`, thus making the user available to all of the routes.

### Routes requiring authorization

If you're building API routes that require authorization, `requireAuth` middleware can be used to protect those routes.

It can be done in multiple ways:

- Protecting a specific endpoint:

  ```js
  router.get("/users", requireAuth(), (req, res) => {});
  ```

  This protects makes sure that only logged in users can perform this request, otherwise it throws `UnauthorizedError`.

- Protecting a router:

  ```js
  router.use(requireAuth());

  router.get("/:userId", (req, res) => {});
  router.get("/:deviceId", (req, res) => {});
  ```

  This way all endpoints under this router will require authorization.

- Protecting an app route:

  ```js
  // index.js

  app.use("/users", requireAuth(), usersRouter);
  ```

  It's sort of similar to protecting the router, just in a different place.

#### Requiring a role

`requireAuth` accepts user role as a parameter, so if there's a need to limit access to a specific endpoint/router only to users with `admin` role, it can be achieved like this:

```js
app.use("/only-for-admins", requireAuth("admin"), router);
```

All options above also work with `admin` parameter.
