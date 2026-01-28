sequenceDiagram
    participant browser
    participant server

    Note right of browser: The JS code handles the submit event, adds the note to the list locally, and rerenders the list

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server saves the new note to the data array
    server-->>browser: 201 Created (JSON: {"message":"note created"})
    deactivate server