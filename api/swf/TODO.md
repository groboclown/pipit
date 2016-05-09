# TODO Items For the SWF Codebase

## Change where events are handled

The `lambda-task.js` file has the right way that events are handled
(see `createSheduledEvents`).
This encapsulates the validation logic right there in the event itself.
This simplifies the calling code, as well.  It also centralizes all the
logic around how the objects link themselves up.

## Use consistent variable names

The `WorkflowRun` type is called `workflow` and `workflowRun`.  This should be
consistent across parameters and field names.

There are other variables, as well, that should have a consistent name.
