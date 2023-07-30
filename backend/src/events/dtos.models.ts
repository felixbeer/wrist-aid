export interface LocationUpdateDto {
  id: number; // des is ziemlich sicher de user id
  longitude: number;
  latitude: number;
}

export interface MissionDoneDto {
  missionId: number;
}