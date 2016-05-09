# If I Was To Rewrite Pipit

If I was to rewrite pipit, I would make it capable for being scalable, if
someone really wanted to run it that way.

I would have a set of core services that could be developed to be reliably
scalable, that all the other APIs would build off of.

* Services themselves.
    * The core services would be a js file with the top-level invocation
      logic.  These could, in the future, be abstracted out to call out
      to some other system.
* Data store.
    * Essentially, make the data store behind S3 the source for all data.
      Everything would use this to store the state data.
* Callbacks (or promises).
    * Callbacks and other bits of code that run outside of the actual web
      requests would have their own registry.  This allows them to be
      shared between any service.
* Timers.
    * A way to register a callback/promise to fire when a timer triggers.
    * Stable outside of a single Node server.
* Event Bus
    * Polling and publishing events.  Like what the Inbox is.
