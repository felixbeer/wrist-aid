<img src="./docs/header.jpeg" alt="logo" />

# Wrist-Aid

## WebSockets API

Server Side Messages

**Event**: NewMission
```javascript
{ 
  id: number;
  reportId: number;
  userId: number;   // user assigned for this mission
  done: boolean;    // is mission accomplished?
  latitude: number;   // location of the user who sent the report
  longitude: number;
  text: string;
  fileLocation: string;
}
```
**Event**: NewReport
```javascript
{
  reportId: number;
  fileLocation: string;
  text: string;
  userId: number;
  longitude: number;    // location of the user who sent the report
  latitude: number;
}
```

Client Side Events

**Event**: MissionDone

```javascript
{
  missionId: number;
}
```

**Event**: LocationUpdate

```javascript
{
  id: number; // die id des users der seine aktuelle postion sendet
  longitude: number;
  latitude: number;
}
```