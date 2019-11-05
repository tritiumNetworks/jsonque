# jsonque
JsonQue : Processing json like a queue, it's unique

## Status Codes

### 0xx: idle
Ready to do something or there is no more jobs in queue

### 1xx: normal processing
JsonQue is processing normal jobs(like Read, Write | Store in jobs queue)

### 2xx: special processing
JsonQue is processing special jobs(like Initialization | Not store in jobs queue)

### 3xx: ...

### 4xx: processing error
Can not continue jobs or input is not a JSON format
