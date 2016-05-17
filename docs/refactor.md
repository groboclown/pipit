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
    * When triggered, makes a service invocation (service name, action,
      parameters).
    * Stable outside of a single Node server.
* Event Bus
    * Polling and publishing events.  Like what the Inbox is.

# Near-Term Refactoring

In the near term, some more practical things can be done:

* The invocation handler should allow for a final parameter, which is a
  deferred promise, that is invoked when the connection completes.  If
  the final sending of the data works just fine, then the deferred promise
  is resolved.  If the sending of data fails (say, the socket pipe was closed
  before the data was sent), then the deferred promise is rejected.
    * This will allow long poll actions to correctly clean themselves up.  If
      the endpoint on the socket was disconnected before the data was sent,
      then the long-polled object can be re-inserted into the top of the queue.
    * Actually, this needs to be rethought.
