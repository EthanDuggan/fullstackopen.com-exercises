sequenceDiagram
    participant browser
    participant server

    rect rgba(0,255,0,0.5)

    Note right of browser: The user enters text into the form and then clicks submit
    
    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note with application/x-www-form-urlencoded payload
    Note left of server: payload of the requested is processed and saved in memory as a new note
    server-->>-browser: 302 - redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    
    end

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>-browser: HTML Document

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>-browser: the css file
    
    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>-browser: the JavaScript file
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>-browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

    Note right of browser: The browser executes the callback function that renders the notes