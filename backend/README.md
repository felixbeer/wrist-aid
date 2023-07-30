# Backend

The backend communicates with OpenAI Whisper, AudoAI and Deepl to offer the best possible speech-to-text and translation experience.

## Environment Variables

Create a `.env` file in the `backend` folder and fill in following API KEYS.

```
OPENAI_API_KEY=...  // API KEY for the OPENAI Services
AUDOAI_API_KEY=..   // API KEY for the Audo noice-canceling service
DEEPL_API_KEY=..    // API KEY for the Deepl Translation service (currently optional)
```

## WebSockets API

Server Side Messages

**Event**: NewMission
This event gets sent when the web app assigned a report to a team (over the http endpoint). Its a broadcast event. Therefore every client in the network
knows who will has to do the task and the team with the same userId knows that they have to do this task.

```javascript
{
  id: number;
  reportId: number;
  userId: number; // user assigned for this mission
  done: boolean; // is mission accomplished?
  latitude: number; // location of the user who sent the report
  longitude: number;
  text: string;
  fileLocation: string;
}
```

**Event**: NewReport
This event gets sent when a user sends a new audio report to the server (over http endpoint). After the audio got noice-canceled and converted into text
this event gets sent to all clients in the network.

```javascript
{
  reportId: number;
  fileLocation: string;
  text: string;
  userId: number;
  longitude: number; // location of the user who sent the report
  latitude: number;
}
```

Client Side Events

**Event**: MissionDone
The client can send this event if he finished his task.

```javascript
{
  missionId: number;
}
```

**Event**: LocationUpdate
The client should periodically send this event to update his current position

```javascript
{
  id: number; // die id des users der seine aktuelle postion sendet
  longitude: number;
  latitude: number;
}
```

## HTTP Api

You can find the swagger documentation of the http endpoint on `localhost:3000/api/swagger` after you started the server.

## Start the server

To start the server you basically have to move into the `backend` folder and run the `npm run start:dev` command. (Maybe you have to run `npm install` to install the required packages)
